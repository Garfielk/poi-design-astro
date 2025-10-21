import { Bike, Mountain, Snowflake, Dumbbell } from "lucide-react";
import heroProtector from "@/assets/hero-protector.jpg";
import motorcycle from "@/assets/motorcycle.jpg";
import mountainBike from "@/assets/mountain-bike.jpg";
import skiing from "@/assets/skiing.jpg";
import sports from "@/assets/sports.jpg";
import type {Language} from "@/i18n/config.ts";
import {getLocalizedPath, useTranslations} from "@/i18n/utils.ts";

const categories = [
  { title: "Motorcycle", path: "motorcycle", icon: Bike },
  { title: "Mountain Bike", path: "mountain-bike", icon: Mountain },
  { title: "Skiing", path: "skiing", icon: Snowflake },
  { title: "Sports", path: "sports", icon: Dumbbell },
];

const productsByCategory: Record<string, Array<{ id: string; image: string; name: string; description: string }>> = {

  motorcycle: [
    { id: "motorcycle-back-protector-pro", image: heroProtector, name: "Motorcycle Back Protector Pro", description: "Advanced sheer thinning technology with CE Level 2 certification for maximum impact protection" },
    { id: "motorcycle-chest-guard-elite", image: motorcycle, name: "Motorcycle Chest Guard Elite", description: "Lightweight design with superior ventilation and shock absorption capabilities" },
    { id: "motorcycle-shoulder-protector", image: heroProtector, name: "Motorcycle Shoulder Protector", description: "Ergonomic fit with flexible armor plates for unrestricted movement" },
    { id: "motorcycle-knee-guards", image: motorcycle, name: "Motorcycle Knee Guards", description: "Heavy-duty protection with adjustable straps for perfect fit" },
    { id: "motorcycle-elbow-protectors", image: heroProtector, name: "Motorcycle Elbow Protectors", description: "Breathable mesh construction with reinforced impact zones" },
    { id: "motorcycle-hip-protector", image: motorcycle, name: "Motorcycle Hip Protector", description: "Slim profile design that fits comfortably under riding gear" },
  ],
  "mountain-bike": [
    { id: "mtb-full-back-protector", image: mountainBike, name: "MTB Full Back Protector", description: "Flexible spine protection with moisture-wicking fabric for all-day comfort" },
    { id: "mtb-chest-protector", image: mountainBike, name: "MTB Chest Protector", description: "Lightweight armor with strategic ventilation for downhill rides" },
    { id: "mtb-knee-shin-guards", image: mountainBike, name: "MTB Knee & Shin Guards", description: "Extended coverage design with slip-resistant silicone grippers" },
    { id: "mtb-elbow-guards-pro", image: mountainBike, name: "MTB Elbow Guards Pro", description: "Impact-resistant shell with soft interior padding" },
    { id: "mtb-shoulder-armor", image: mountainBike, name: "MTB Shoulder Armor", description: "Modular design compatible with all major riding jerseys" },
    { id: "mtb-hip-tailbone-guard", image: mountainBike, name: "MTB Hip & Tailbone Guard", description: "Padded protection with anti-slip waistband technology" },
  ],
  skiing: [
    { id: "ski-back-protector-elite", image: skiing, name: "Ski Back Protector Elite", description: "Cold-weather optimized protection with thermal insulation layer" },
    { id: "ski-chest-guard", image: skiing, name: "Ski Chest Guard", description: "Low-profile design that fits seamlessly under ski jackets" },
    { id: "ski-knee-protectors", image: skiing, name: "Ski Knee Protectors", description: "Articulated joint design for natural skiing motion" },
    { id: "ski-wrist-guards", image: skiing, name: "Ski Wrist Guards", description: "Integrated palm protection with touchscreen-compatible fingertips" },
    { id: "ski-hip-protector", image: skiing, name: "Ski Hip Protector", description: "Padded side panels for fall protection on icy slopes" },
    { id: "ski-shoulder-pads", image: skiing, name: "Ski Shoulder Pads", description: "Flexible armor that moves with your body during jumps" },
  ],
  sports: [
    { id: "multi-sport-back-guard", image: sports, name: "Multi-Sport Back Guard", description: "Versatile protection suitable for various athletic activities" },
    { id: "sports-chest-protector", image: sports, name: "Sports Chest Protector", description: "Universal fit design with adjustable side straps" },
    { id: "sports-knee-pads-pro", image: sports, name: "Sports Knee Pads Pro", description: "High-density foam padding with anti-bacterial fabric" },
    { id: "sports-elbow-guards", image: sports, name: "Sports Elbow Guards", description: "Compression sleeve design with reinforced impact zones" },
    { id: "sports-shin-guards", image: sports, name: "Sports Shin Guards", description: "Lightweight construction with maximum coverage area" },
    { id: "sports-ankle-support", image: sports, name: "Sports Ankle Support", description: "Stabilizing protection with flexible joint movement" },
  ],
};

interface Props {
  lang: Language;
  category: string;
}
function FloatingSidebar({lang, category}: Props) {

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-card border border-border rounded-2xl shadow-lg p-2 space-y-2">
      {categories.map((item) => (
        <a
          key={item.path}
          href={getLocalizedPath(`/products/${item.path}`, lang)}
          className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
            item.path === category
              ? "bg-primary text-primary-foreground shadow-md scale-110"
              : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
          }`}
          title={item.title}
        >
          <item.icon className="h-5 w-5" />
        </a>
      ))}
    </nav>
  );
}

const ProductCategory = ({lang, category}: Props) => {
  const {t} = useTranslations(lang);

  const products = productsByCategory[category] || productsByCategory.motorcycle;
  const currentCategory = categories.find((cat) => cat.path === category);

  return (
    <div className="min-h-screen flex flex-col">
      <FloatingSidebar category={category} lang={lang} />
      <main className="flex-1 pt-20 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          {/* Page Title */}
          <div className="flex items-center gap-3 mb-8">
            {currentCategory && <currentCategory.icon className="h-7 w-7 text-primary" />}
            <h1 className="text-3xl font-bold text-foreground">
              {currentCategory?.title || "Protector Products"}
            </h1>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <a
                key={index}
                href={`/products/${product.id}`}
                className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50 block"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductCategory;
