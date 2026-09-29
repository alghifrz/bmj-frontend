import { CategoryShowcaseView } from "@/components/home/category-showcase-view";
import { getPublicCategories } from "@/lib/api/categories";

export async function CategoryShowcase() {
  const categories = await getPublicCategories();
  return <CategoryShowcaseView categories={categories} />;
}
