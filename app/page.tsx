import { About } from "@/components/home/about";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { HomeCta } from "@/components/home/home-cta";
import { Locations } from "@/components/home/locations";
import { Reviews } from "@/components/home/reviews";
import { Services } from "@/components/home/services";
import { WhyChoose } from "@/components/home/why-choose";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhyChoose />
      <CategoryShowcase />
      <FeaturedProducts />
      <Services />
      <Reviews />
      <HomeCta />
      <Locations />
    </>
  );
}
