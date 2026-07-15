import Categories from "@/components/home/Categories";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <>
    <Hero />
    <Categories />
    <FeaturedCourses />
    <WhyChooseUs />
    <Statistics />
    <Testimonials />
    </>
  );
}
