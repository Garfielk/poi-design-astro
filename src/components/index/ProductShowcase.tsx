import heroProtector from "@/assets/hero-protector.jpg";
import type { Language } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";

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

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 border border-primary/50 rounded-lg hover:bg-primary/30 transition-all duration-300 cursor-pointer group">
                <span className="text-accent font-medium">{t.home.productShowcase.learnMore}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
