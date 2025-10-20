import heroProtector from "@/assets/hero-protector.jpg";
import type { Language } from "@/i18n/config.ts";
import { getTranslations } from "@/i18n/utils.ts";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

interface ProductShowcaseProps {
  lang: Language;
}

const ProductShowcase = ({ lang }: ProductShowcaseProps) => {
  const t = getTranslations(lang);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.home.productShowcase.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        {/* Product Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative group animate-scale-in">
            <div className="absolute inset-0 bg-gradient-radial from-accent/40 via-primary/20 to-transparent blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <img
              src={heroProtector.src}
              alt={t.home.productShowcase.productName}
              className="relative w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 text-foreground animate-fade-in-up">
            <h3 className="text-3xl font-bold text-primary">{t.home.productShowcase.productName}</h3>
            <h4 className="text-xl font-semibold text-foreground">{t.home.productShowcase.productSubtitle}</h4>

            <p className="text-lg leading-relaxed">
              {t.home.productShowcase.description}
            </p>

            <Button
              variant="outline"
              size="lg"
              className="group border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              asChild
            >
              <a href="/laboratory">
                {t.home.productShowcase.learnMore}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
