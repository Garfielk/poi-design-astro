import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import heroProtector from "@/assets/hero-protector.jpg";
import motorcycle from "@/assets/motorcycle.jpg";
import mountainBike from "@/assets/mountain-bike.jpg";
import skiing from "@/assets/skiing.jpg";
import sports from "@/assets/sports.jpg";
import type {Language} from "@/i18n/config.ts";
import {getLocalizedPath, useTranslations} from "@/i18n/utils.ts";

const features = [
  {
    title: "BREATHABLE",
    description: "Laser-cut ventilation holes and patchy surface provide breathable air flow.",
  },
  {
    title: "LOW PROFILE",
    description: "A lightweight, sleek comfort with low bulk fit.",
  },
  {
    title: "FLEXIBLE",
    description: "Ultimate flexibility for all temperature ranges.",
  },
  {
    title: "LEVEL 2 IMPACT PROTECTION",
    description: "Highest level of protection with EN 1621-1 and CE certified, surface compared to standard CE certified padding.",
  },
  {
    title: "BIODEGRADABLE",
    description: "Special ingredients are added during the manufacturing process of the PIGE material to speed up the biodegradation process in a microbe-rich land and oxygen environment.",
  },
];

const protectorProducts = [
  { id: 1, name: "Motorcycle Back Protector Pro", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop" },
  { id: 2, name: "MTB Knee & Shin Guards", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop" },
  { id: 3, name: "Ski Wrist Guards", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop" },
  { id: 4, name: "Sports Chest Protector", image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&h=400&fit=crop" },
  { id: 5, name: "Motorcycle Shoulder Protector", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop" },
  { id: 6, name: "MTB Elbow Guards Pro", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop" },
];

const garmentProducts = [
  { id: 1, name: "Racing Vest Pro", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
  { id: 2, name: "Protection Jacket Elite", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
  { id: 3, name: "Sports Armor Shirt", image: "https://images.unsplash.com/photo-1503341338985-b03fba30d0f1?w=400&h=400&fit=crop" },
  { id: 4, name: "Performance Vest X2", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
  { id: 5, name: "Impact Protection Tee", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
];

const confidencePoints = [
  "Evidence-based validation through accelerated lifecycle testing",
  "Data-driven design optimization leveraging experimental analytics",
  "Cloud-loop quality evolution via iterative design, prototype and enhancement",
];

interface Props {
  lang: Language;
}

const Products = ({lang}: Props) => {
  const {t} = useTranslations(lang);

  const categories = [
    { name: "Protector", image: heroProtector.src, path: getLocalizedPath("/products/motorcycle", lang) },
    { name: "Garment", image: motorcycle.src, path: getLocalizedPath("/products/mountain-bike", lang) },
    { name: "Accessory", image: sports.src, path: getLocalizedPath("/products/skiing", lang) },
    { name: "Custom", image: mountainBike.src, path: getLocalizedPath("/products/sports", lang) },
  ];

  return (
    <>
      {/* Hero Section with Product Features */}
      <section className="relative min-h-screen flex items-center pt-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src={heroProtector.src}
            alt="POI Protector"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Product Image/Visual */}
            <div>
              <div className="relative">
                <img
                  src={heroProtector.src}
                  alt="Protector Product"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group"
                >
                  <div className="border-l-4 border-primary pl-6 py-2 hover:border-accent transition-colors">
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Protector Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Protector
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.path}
              >
                <Card
                  className="group relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-white/80">POI</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Product Confidence Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&h=800&fit=crop"
                alt="Product Structure"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            {/* Right - Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                What constitutes the foundation of our product confidence?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Our products' superior performance originates from:
              </p>
              <ul className="space-y-4">
                {confidencePoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="text-primary font-bold">{index + 1}.</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Protector Products Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {protectorProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4">
                    <div className="p-4">
                      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                        <div className="aspect-square overflow-hidden bg-secondary relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <h3 className="text-white font-bold text-lg text-center px-4">{product.name}</h3>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Garment Products Carousel */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {garmentProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4">
                    <div className="p-4">
                      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                        <div className="aspect-square overflow-hidden bg-background relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <h3 className="text-white font-bold text-lg text-center px-4">{product.name}</h3>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* More Designs Search */}
      {/*<section className="py-20 bg-background">*/}
      {/*  <div className="container mx-auto px-4 lg:px-8">*/}
      {/*    <div className="max-w-2xl mx-auto">*/}
      {/*      <h3 className="text-2xl font-bold mb-6">More designs:</h3>*/}
      {/*      <div className="flex gap-4">*/}
      {/*        <Input*/}
      {/*          type="text"*/}
      {/*          placeholder="Search designs..."*/}
      {/*          value={searchQuery}*/}
      {/*          onChange={(e) => setSearchQuery(e.target.value)}*/}
      {/*          className="flex-1"*/}
      {/*        />*/}
      {/*        <Button size="lg" className="px-8">*/}
      {/*          <Search className="w-5 h-5" />*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </>
  );
};

export default Products;
