import laboratoryImg from "@/assets/laboratory.jpg";
import { Button } from "@/components/ui/button.tsx";
import { ArrowRight } from "lucide-react";
import type { Language } from "@/i18n/config.ts";
import {getLocalizedPath, getTranslations} from "@/i18n/utils.ts";

interface LaboratoryProps {
  lang: Language;
}

const Laboratory = ({ lang }: LaboratoryProps) => {
  const t = getTranslations(lang);

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-primary/5 blur-3xl" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
              <img
                src={laboratoryImg.src}
                alt={t.home.laboratory.imageAlt}
                className="relative w-full h-auto rounded-2xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.home.laboratory.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent" />
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed">
              {t.home.laboratory.description}
            </p>

            <Button
              variant="outline"
              size="lg"
              className="group border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              asChild
            >
              <a href={getLocalizedPath("/laboratory", lang)}>
                {t.home.laboratory.explore}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Laboratory;
