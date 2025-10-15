import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "./Hero";
import ProductShowcase from "./ProductShowcase";
import CategoryGrid from "./CategoryGrid";
import PartnerBrands from "./PartnerBrands";
import Laboratory from "./Laboratory";
import Certificates from "./Certificates";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <CategoryGrid />
        <PartnerBrands />
        <Laboratory />
        <Certificates />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
