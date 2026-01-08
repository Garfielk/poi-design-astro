import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import concept from "@/assets/products/concept.jpg";
import banner1 from "@/assets/products/banner1.jpg";
import banner2 from "@/assets/products/banner2.jpg";
// import banner3 from "@/assets/index/banner3.jpg";
// import banner4 from "@/assets/index/banner4.jpg";
import type { Language } from "@/i18n/config.ts";
import { getLocalizedPath, useTranslations } from "@/i18n/utils.ts";
import ProductCategories from "@/components/ProductCategories.tsx";

interface Props {
  lang: Language;
}

const heroImages = [
  banner1.src,
  banner2.src,
  // banner3.src,
  // banner4.src,
];

const Products = ({ lang }: Props) => {
  const { t } = useTranslations(lang);

  const features = t.products.features;

  const confidencePoints = t.products.confidence.points;

  return (
    <>
      {/* Hero Section - Full Width Image Carousel */}
      <section className="relative pt-16 md:pt-20 bg-black">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex items-center justify-center bg-black">
                  <img
                    src={image}
                    alt=""
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Protector Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            {t.home.categoryGrid.title}
          </h2>

          <ProductCategories lang={lang} />
        </div>
      </section>

      {/* Product Confidence Section */}
      <section className="bg-black text-white">
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div>
              <img
                src={concept.src}
                alt={t.products.confidence.imageAlt}
                className="w-full max-h-206 object-cover"
              />
            </div>

            {/* Right - Content */}
            <div className="p-4">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                {t.products.confidence.title}
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {t.products.confidence.description}
              </p>
              <ul className="space-y-4 hidden">
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
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
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
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cotain transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
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

const protectorProducts = [
  { id: 1, name: "Motorcycle Back Protector Pro", image: "/products/top1.png" },
  { id: 2, name: "Motorcycle Back Protector Pro", image: "/products/top2.png" },
  { id: 3, name: "Motorcycle Back Protector Pro", image: "/products/top3.png" },
  { id: 4, name: "Motorcycle Back Protector Pro", image: "/products/top4.png" },
  { id: 5, name: "Motorcycle Back Protector Pro", image: "/products/top5.png" },
  { id: 6, name: "Motorcycle Back Protector Pro", image: "/products/top6.png" },
];

const garmentProducts = [
  { id: 1, name: "Motorcycle Back Protector Pro", image: "/products/bottom1.png" },
  { id: 2, name: "Motorcycle Back Protector Pro", image: "/products/bottom2.png" },
  { id: 3, name: "Motorcycle Back Protector Pro", image: "/products/bottom3.png" },
  { id: 4, name: "Motorcycle Back Protector Pro", image: "/products/bottom4.png" },
  { id: 5, name: "Motorcycle Back Protector Pro", image: "/products/bottom5.png" },

];

export default Products;
