import { FeaturedProductsView } from "@/components/home/featured-products-view";
import { getFeaturedProducts } from "@/lib/api/products";
import { getPublicStore } from "@/lib/api/store";

export async function FeaturedProducts() {
  const [products, store] = await Promise.all([getFeaturedProducts(), getPublicStore()]);

  return (
    <FeaturedProductsView
      products={products}
      whatsappNumber={store?.whatsappNumber ?? null}
      messageTemplate={store?.messageTemplate ?? null}
    />
  );
}
