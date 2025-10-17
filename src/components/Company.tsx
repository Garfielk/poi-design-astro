import { useState } from "react";
import { Play } from "lucide-react";
import laboratoryImg from "@/assets/laboratory.jpg";

const Company = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${laboratoryImg.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pioneer of manufacture.
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Experienced in garment industry since 1995.
            </p>
          </div>
        </div>
      </section>

      {/* About POI Designs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">ABOUT POI DESIGNS</h2>
            <div className="max-w-4xl mx-auto text-muted-foreground space-y-4">
              <p>
                Specializing in manufacturing a comprehensive range ofsports protective equipment and
                luggage products,ourcompany distinguishes globally with consistently acclaimedquality.
              </p>
              <p>
                Encompassing garments, bags,gloves,and safety gear,our portfolio is underscored by a
                vigilant approach to "Quality First, Reputation First, and Efficiency",we deliver
                authoritativesaves to domestic and international clients.
              </p>
              <p>
                Adhering to standardized,professional initiative,andharmain operational principles,we
                commit ourselves to an ethos of "Technological innovation,standard quality,excellent
                professionalism,service-oriented commitment,and pragmatic advancement",we relentlessly
                pursue maximumin partner benefits while providing unparalleled assurance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">OUR ADVANTAGES</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We focus on the development and production of the sports goods,
              especially the impact protection goods for bicycle and motorcycle,
              and kinds of backpacks. We export mostly our products to all over
              the world and also engage in the domestic market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            {[
              { title: "POI Factory introduction", id: "1" },
              { title: "Production Process", id: "2" }
            ].map((video, index) => (
              <div
                key={video.id}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in bg-background"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <span className="w-6 h-6 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-xs font-bold">
                      P
                    </span>
                  {video.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">OUR HISTORY</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We focus on the development and production of the sports goods,
              especially the impact protection goods for bicycle and motorcycle,
              and kinds of backpacks. We export mostly our products to all over
              the world and also engage in the domestic market.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto mt-16 pb-24">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" style={{ height: 'calc(100% - 80px)' }} />

            {/* Timeline Items */}
            <div className="space-y-16">
              {/* 1995 */}
              <div className="relative animate-fade-in group">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="text-right pr-8">
                    <div className="inline-block bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">1995</h3>
                      <p className="text-xl font-semibold text-muted-foreground">Factory established</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 pl-8">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-48 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" />
                  </div>
                </div>
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background hidden md:block group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300" />
              </div>

              {/* 2006 */}
              <div className="relative animate-fade-in group" style={{ animationDelay: "0.1s" }}>
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="order-2 md:order-1 mt-4 md:mt-0 pr-8">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-48 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" />
                  </div>
                  <div className="order-1 md:order-2 text-left pl-8">
                    <div className="inline-block bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2006</h3>
                      <p className="text-xl font-semibold text-muted-foreground">Off-road</p>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background hidden md:block group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300" />
              </div>

              {/* 2016 */}
              <div className="relative animate-fade-in group" style={{ animationDelay: "0.2s" }}>
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="text-right pr-8">
                    <div className="inline-block bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2016</h3>
                      <p className="text-xl font-semibold text-muted-foreground">Accessories PU, TPE,etc.</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 pl-8">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-48 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" />
                  </div>
                </div>
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background hidden md:block group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300" />
              </div>

              {/* 2022 */}
              <div className="relative animate-fade-in group" style={{ animationDelay: "0.3s" }}>
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="order-2 md:order-1 mt-4 md:mt-0 pr-8">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-48 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" />
                  </div>
                  <div className="order-1 md:order-2 text-left pl-8">
                    <div className="inline-block bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2022</h3>
                      <p className="text-xl font-semibold text-muted-foreground">Garment project</p>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background hidden md:block group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300" />
              </div>
            </div>

            {/* Continue Button */}
            <div className="text-center mt-24 animate-fade-in relative z-10" style={{ animationDelay: "0.4s" }}>
              <div className="inline-block text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-default">
                Continue...
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Company;
