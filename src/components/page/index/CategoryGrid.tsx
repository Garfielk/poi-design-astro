import type { Language } from "@/i18n/config.ts";
import { getTranslations } from "@/i18n/utils.ts";
import ProductCategories from "@/components/ProductCategories.tsx";

interface CategoryGridProps {
  lang: Language;
}

const CategoryGrid = ({ lang }: CategoryGridProps) => {
  const t = getTranslations(lang);

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.home.categoryGrid.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>


        {/* Category Grid */}
        <ProductCategories lang={lang} />
      </div>
    </section>
  );
};

export default CategoryGrid;
