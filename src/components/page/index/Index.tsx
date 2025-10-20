import Hero from "./Hero.tsx";
import ProductShowcase from "./ProductShowcase.tsx";
import CategoryGrid from "./CategoryGrid.tsx";
import PartnerBrands from "./PartnerBrands.tsx";
import Laboratory from "./Laboratory.tsx";
import Certificates from "./Certificates.tsx";
import type { Language } from "@/i18n/config.ts";

interface Props {
  lang: Language;
}

const Index = ({ lang }: Props) => {
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
