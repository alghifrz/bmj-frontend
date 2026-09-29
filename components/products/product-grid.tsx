import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

export function ProductGrid({
  products,
  whatsappNumber = null,
  messageTemplate = null,
}: {
  products: Product[];
  whatsappNumber?: string | null;
  messageTemplate?: string | null;
}) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
      {products.map((product, index) => (
        <li key={product.id} className="min-w-0">
          <ProductCard
            product={product}
            priority={index < 2}
            whatsappNumber={whatsappNumber}
            messageTemplate={messageTemplate}
          />
        </li>
      ))}
    </ul>
  );
}
