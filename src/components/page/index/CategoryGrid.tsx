import motorcycleImg from "@/assets/motorcycle.jpg";
import mountainBikeImg from "@/assets/mountain-bike.jpg";
import skiingImg from "@/assets/skiing.jpg";
import sportsImg from "@/assets/sports.jpg";
import type { Language } from "@/i18n/config.ts";
import { getTranslations } from "@/i18n/utils.ts";

interface CategoryGridProps {
  lang: Language;
}

const CategoryGrid = ({ lang }: CategoryGridProps) => {
  const t = getTranslations(lang);

  const categories = [
    {
      title: t.home.categoryGrid.categories.motorcycle,
      image: motorcycleImg.src,
      label: t.home.categoryGrid.label,
    },
    {
      title: t.home.categoryGrid.categories.mountainBike,
      image: mountainBikeImg.src,
      label: t.home.categoryGrid.label,
    },
    {
      title: t.home.categoryGrid.categories.skiing,
      image: skiingImg.src,
      label: t.home.categoryGrid.label,
    },
    {
      title: t.home.categoryGrid.categories.sports,
      image: sportsImg.src,
      label: t.home.categoryGrid.label,
    },
  ];

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.home.categoryGrid.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-primary/80 group-hover:via-primary/40 transition-all duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                <div className="text-accent font-semibold">{category.label}</div>

                {/* Arrow Indicator */}
                <div className="mt-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm">{t.home.categoryGrid.explore}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
