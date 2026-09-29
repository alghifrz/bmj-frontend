import { Container } from "@/components/layout/container";

function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse bg-surface motion-reduce:animate-none ${className}`} />;
}

export function FieldSkeleton({ label }: { label: string }) {
  return (
    <div className="min-w-0" aria-busy="true">
      <p className="mb-1.5 text-sm text-foreground">{label}</p>
      <Pulse className="h-11 border border-border bg-background" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <Pulse className="aspect-4/3" />
      <div className="space-y-3 border border-t-0 border-border p-4">
        <Pulse className="h-6 w-2/3" />
        <Pulse className="h-3 w-16" />
        <Pulse className="h-5 w-1/2" />
        <Pulse className="h-9 w-full" />
      </div>
    </div>
  );
}

export function CatalogResultsSkeleton() {
  return (
    <div className="mt-8" aria-busy="true">
      <p className="sr-only">Memuat produk</p>
      <Pulse className="h-5 w-40" />
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ControlsSkeleton() {
  return (
    <div className="mt-8 border border-border bg-surface p-4 sm:p-5" aria-busy="true">
      <p className="sr-only">Memuat pencarian katalog</p>
      <Pulse className="h-12 w-full border border-border bg-background" />
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <FieldSkeleton label="Kategori" />
        <FieldSkeleton label="Merek" />
        <FieldSkeleton label="Urutkan" />
      </div>
    </div>
  );
}

export function CatalogPageSkeleton() {
  return (
    <Container className="pb-16">
      <ControlsSkeleton />
      <CatalogResultsSkeleton />
    </Container>
  );
}
