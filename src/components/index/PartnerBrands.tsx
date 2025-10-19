import kenvyLogo from "@/assets/brands/kenvy-logo.png";
import falcospeedLogo from "@/assets/brands/falcospeed-logo.png";
import komineLogo from "@/assets/brands/komine-logo.png";
import onealLogo from "@/assets/brands/oneal-logo.png";
import alpinestarsLogo from "@/assets/brands/alpinestars-logo.png";
import daineseLogo from "@/assets/brands/dainese-logo.png";
import revitLogo from "@/assets/brands/revit-logo.png";
import heldLogo from "@/assets/brands/held-logo.png";
import rukkaLogo from "@/assets/brands/rukka-logo.png";
import spidiLogo from "@/assets/brands/spidi-logo.png";
import {memo} from 'react'
import type { Language } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";

const brands = [
  { name: "KENVY", logo: kenvyLogo.src },
  { name: "FALCOSPEED", logo: falcospeedLogo.src },
  { name: "KOMINE", logo: komineLogo.src },
  { name: "O'NEAL", logo: onealLogo.src },
  { name: "ALPINESTARS", logo: alpinestarsLogo.src },
  { name: "DAINESE", logo: daineseLogo.src },
  { name: "REV'IT", logo: revitLogo.src },
  { name: "HELD", logo: heldLogo.src },
  { name: "RUKKA", logo: rukkaLogo.src },
  { name: "SPIDI", logo: spidiLogo.src },
];

const BrandCard = memo(({ brand }: { brand: { name: string; logo: string } }) => (
  <div className="flex-shrink-0 w-48 h-28 flex items-center justify-center bg-background/50 border border-border rounded-lg p-4 grayscale hover:grayscale-0 hover:border-primary/50 transition-all duration-300">
    <img
      src={brand.logo}
      alt={`${brand.name} logo`}
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
