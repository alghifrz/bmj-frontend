import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { cn } from "@/lib/cn";
import { getPublicReviews, type PublicReview } from "@/lib/api/reviews";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className={className}>
      <path d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.5 4.9 17.3 6 11.6 1.7 7.6l5.8-.7L10 1.6Z" />
    </svg>
  );
}

function Stars({ rating, featured }: { rating: number; featured: boolean }) {
  return (
    <p className="flex gap-1" aria-label={`Penilaian ${rating} dari 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={cn(
            "size-4",
            i < rating
              ? featured
                ? "text-white"
                : "text-secondary"
              : featured
                ? "text-white/25"
                : "text-border",
          )}
        />
      ))}
    </p>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function ReviewCard({ review, featured }: { review: PublicReview; featured: boolean }) {
  return (
    <li
      className={cn(
        "relative mb-5 break-inside-avoid overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8",
        featured
          ? "bg-ink text-white hover:shadow-[0_36px_70px_-36px_rgba(20,28,36,0.7)]"
          : "bg-surface ring-1 ring-border hover:shadow-[0_30px_60px_-36px_rgba(20,28,36,0.4)]",
      )}
    >
      {/* Tanda kutip dekoratif */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-6 top-2 select-none font-heading text-8xl leading-none",
          featured ? "text-white/10" : "text-secondary/15",
        )}
      >
        “
      </span>

      {review.rating ? <Stars rating={review.rating} featured={featured} /> : null}

      <blockquote
        className={cn(
          "relative mt-5",
          featured ? "text-lg leading-8 text-white/90 sm:text-xl sm:leading-9" : "text-base leading-7 text-ink",
        )}
      >
        {review.text}
      </blockquote>

      <footer className={cn("mt-7 flex items-center gap-3.5 border-t pt-6 text-sm", featured ? "border-white/15" : "border-border")}>
        <span
          className={cn(
            "relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-medium",
            featured ? "bg-white/10 text-white" : "bg-background text-ink ring-1 ring-border",
          )}
        >
          {review.imageUrl ? (
            <Image src={review.imageUrl} alt="" fill sizes="44px" className="object-cover" />
          ) : (
            initials(review.customerName)
          )}
        </span>
        <div className="min-w-0">
          <p className={cn("font-medium", featured ? "text-white" : "text-ink")}>{review.customerName}</p>
          {review.role ? <p className={featured ? "text-white/60" : "text-muted"}>{review.role}</p> : null}
          {review.date ? (
            <p className={cn("mt-0.5 text-xs", featured ? "text-white/50" : "text-muted")}>{review.date}</p>
          ) : null}
        </div>
      </footer>
    </li>
  );
}

export async function Reviews() {
  const reviews = await getPublicReviews();

  const rated = (reviews ?? []).filter((r) => r.rating);
  const average = rated.length ? rated.reduce((sum, r) => sum + (r.rating ?? 0), 0) / rated.length : null;

  return (
    <Section id="ulasan" className="scroll-mt-20 border-t border-border">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title="Apa Kata Pelanggan Kami?" />
            {average !== null ? (
              <div className="flex items-center gap-4 self-start rounded-full bg-surface py-2.5 pl-6 pr-7 ring-1 ring-border sm:self-auto">
                <p className="font-heading text-3xl leading-none text-ink">{average.toFixed(1)}</p>
                <div>
                  <p className="flex gap-0.5 text-secondary" aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} className={cn("size-3.5", i + 0.5 > average && "text-border")} />
                    ))}
                  </p>
                  <p className="mt-1 text-xs text-muted">Dari {rated.length} ulasan</p>
                </div>
              </div>
            ) : null}
          </div>

          {reviews === null ? (
            <p className="mt-6 max-w-lg text-base leading-7 text-muted">Ulasan belum dapat dimuat.</p>
          ) : reviews.length === 0 ? (
            <p className="mt-6 max-w-lg text-base leading-7 text-muted">
              Ulasan yang sudah dipublikasikan akan ditampilkan di sini. BMJ hanya menampilkan testimoni yang disetujui.
            </p>
          ) : (
            <ul className="mt-12 columns-1 gap-5 sm:columns-2 lg:mt-16 lg:columns-3">
              {reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} featured={index === 0 && reviews.length > 1} />
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}