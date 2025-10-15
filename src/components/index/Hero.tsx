import {useState, useEffect, memo} from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import heroProtector from "@/assets/hero-protector.jpg";
import motorcycle from "@/assets/motorcycle.jpg";
import skiing from "@/assets/skiing.jpg";
import mountainBike from "@/assets/mountain-bike.jpg";

const carouselImages = [
  { src: heroProtector.src, alt: "POI Sports Protector" },
  { src: motorcycle.src, alt: "Motorcycle Protection" },
  { src: skiing.src, alt: "Skiing Protection" },
  { src: mountainBike.src, alt: "Mountain Bike Protection" },
];

const Hero = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };


    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Pattern Overlay */}
      {/*<div className="absolute inset-0 opacity-[0.03]" style={{*/}
      {/*  backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,*/}
      {/*  backgroundSize: '50px 50px'*/}
      {/*}} />*/}

      <div className="relative w-full min-h-screen flex items-center">
        <div className="grid lg:grid-cols-[45%_55%] w-full items-center">
          {/* Left Content */}
          <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-0 space-y-8 z-10">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block text-foreground">Engineered</span>
              <span className="block text-foreground">for the</span>
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Impact.
              </span>
            </h1>

            <div className="space-y-4 text-lg lg:text-xl text-muted-foreground">
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-1 h-8 bg-primary group-hover:h-12 transition-all duration-300" />
                <span className="group-hover:text-accent transition-colors">Protection</span>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-1 h-8 bg-primary group-hover:h-12 transition-all duration-300" />
                <span className="group-hover:text-accent transition-colors">Innovate</span>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-1 h-8 bg-primary group-hover:h-12 transition-all duration-300" />
                <span className="group-hover:text-accent transition-colors">Passion</span>
              </div>
            </div>
          </div>

          {/* Right Image Carousel */}
          <div className="relative h-[60vh] lg:h-screen w-full">
            <div className="absolute inset-0 -z-10" />

            <Carousel
              setApi={setApi}
              className="w-full h-full"
              opts={{
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
            >
              <CarouselContent className="h-[60vh] lg:h-screen">
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index} className="h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Carousel Dots */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      console.log('click')
                      api?.scrollTo(index)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === current
                        ? "bg-accent w-8"
                        : "bg-muted-foreground/50 hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
