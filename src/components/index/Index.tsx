import Hero from "./Hero";
import ProductShowcase from "./ProductShowcase";
import CategoryGrid from "./CategoryGrid";
import PartnerBrands from "./PartnerBrands";
import Laboratory from "./Laboratory";
import Certificates from "./Certificates";
import type { Language } from "@/i18n/config";

interface IndexProps {
  lang: Language;
}

const Index = ({ lang }: IndexProps) => {
  return (
    <>
      <Hero lang={lang} />
      <ProductShowcase lang={lang} />
      <CategoryGrid lang={lang} />
      <PartnerBrands lang={lang} />
      <Laboratory lang={lang} />
      <Certificates lang={lang} />
    </>
  );
};

export default Index;
