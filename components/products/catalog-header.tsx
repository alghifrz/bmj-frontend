import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { getPublicCategories, type PublicCategory } from "@/lib/api/categories";
import { cn } from "@/lib/cn";

export async function CatalogHeader() {
  const categories = await getPublicCategories();
  const [lead, ...rest] = categories;

  return (
    <header className="overflow-hidden border-b border-border">
      <Container className="items-center py-12 sm:py-16 lg:gap-14 lg:py-20 flex flex-col justify-center">
        <div className="lg:col-span-5">
          <div className="h-px w-8 bg-primary mx-auto" />
          <p className="mt-5 text-sm text-muted text-center">Katalog Produk</p>
          <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.04] sm:text-5xl lg:text-[3.25rem] text-center">
            <span className="block">Temukan Produk</span>
            <span className="block text-secondary italic">Alat Kesehatan</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-muted text-center">
            Telusuri peralatan dan produk kesehatan yang tersedia di Buana Medika Jaya.
          </p>
        </div>

        {/* {lead ? (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
            <CategoryTile category={lead} priority className={rest.length > 1 ? "col-span-2 sm:col-span-1 sm:row-span-2" : "col-span-2"} />
            {rest.map((category) => (
              <CategoryTile key={category.slug} category={category} />
            ))}
          </ul>
        ) : null} */}
      </Container>
    </header>
  );
}

function CategoryTile({
  category,
  className,
  priority = false,
}: {
  category: PublicCategory;
  className?: string;
  priority?: boolean;
}) {
  return (
    <li className={cn("min-h-36", className)}>
      <Link href={category.href} className="group relative block h-full min-h-36 overflow-hidden bg-surface">
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 24vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        ) : (
          <span className="absolute inset-0 bg-secondary-soft" />
        )}
        <span className="absolute inset-x-0 bottom-0 bg-secondary-dark/85 px-3 py-2.5 text-sm leading-snug text-white">
          {category.name}
        </span>
      </Link>
    </li>
  );
}
