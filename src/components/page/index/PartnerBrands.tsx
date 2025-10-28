import logo1 from "@/assets/brands/1.jpg";
import logo2 from "@/assets/brands/2.png";
import logo3 from "@/assets/brands/3.png";
import logo4 from "@/assets/brands/4.jpg";
import logo5 from "@/assets/brands/5.jpg";
import logo6 from "@/assets/brands/6.jpg";
import logo7 from "@/assets/brands/7.png";
import logo8 from "@/assets/brands/8.png";
import logo9 from "@/assets/brands/9.png";
import logo10 from "@/assets/brands/10.jpg";
import logo11 from "@/assets/brands/11.webp";
import logo12 from "@/assets/brands/12.jpg";
import logo13 from "@/assets/brands/13.jpg";

import {memo} from 'react'
import type { Language } from "@/i18n/config.ts";
import { getTranslations } from "@/i18n/utils.ts";

const brands = [
  { name: "KENVY", logo: logo1.src },
  { name: "FALCOSPEED", logo: logo2.src },
  { name: "KOMINE", logo: logo3.src },
  { name: "O'NEAL", logo: logo4.src },
  { name: "ALPINESTARS", logo: logo5.src },
  { name: "DAINESE", logo: logo6.src },
  { name: "REV'IT", logo: logo7.src },
  { name: "HELD", logo: logo8.src },
  { name: "RUKKA", logo: logo9.src },
  { name: "SPIDI", logo: logo10.src },
  { name: "SPIDI", logo: logo11.src },
  { name: "SPIDI", logo: logo12.src },
  { name: "SPIDI", logo: logo13.src },
];

const BrandCard = memo(({ brand }: { brand: { name: string; logo: string } }) => (
  <div className="flex-shrink-0 w-48 h-28 flex items-center justify-center bg-background/50 border border-border rounded-lg p-4 grayscale hover:grayscale-0 hover:border-primary/50 transition-all duration-300">
    <img
      src={brand.logo}
      alt={`partner logo`}
      loading="lazy"
      className="max-w-full max-h-full object-contain"
    />
  </div>
));

BrandCard.displayName = "BrandCard";

interface PartnerBrandsProps {
  lang: Language;
}

const PartnerBrands = ({ lang }: PartnerBrandsProps) => {
  const t = getTranslations(lang);

  return (
    <section className="py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.home.partnerBrands.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.home.partnerBrands.subtitle}
          </p>
        </div>

        {/* Continuous Scroll */}
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused] will-change-transform">
            {[...brands, ...brands].map((brand, index) => (
              <BrandCard key={index} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;
