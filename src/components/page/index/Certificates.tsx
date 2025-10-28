import { useState } from "react";
import certificates1 from "@/assets/certificates/1.jpg";
import certificates2 from "@/assets/certificates/2.jpg";
import certificates3 from "@/assets/certificates/3.jpg";
import certificates4 from "@/assets/certificates/4.jpg";
import certificates5 from "@/assets/certificates/5.jpg";
import certificates6 from "@/assets/certificates/6.jpg";
import type { Language } from "@/i18n/config.ts";
import { getTranslations } from "@/i18n/utils.ts";

interface CertificatesProps {
  lang: Language;
}

const Certificates = ({ lang }: CertificatesProps) => {
  const t = getTranslations(lang);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const certificates = [
    {
      id: 1,
      image: certificates1.src,
      rotation: -3.5,
      zIndex: 1,
    },
    {
      id: 2,
      image: certificates2.src,
      rotation: -2,
      zIndex: 2,
    },
    {
      id: 3,
      image: certificates3.src,
      rotation: -0.5,
      zIndex: 3,
    },
    {
      id: 4,
      image: certificates4.src,
      rotation: 1,
      zIndex: 4,
    },
    {
      id: 5,
      image: certificates5.src,
      rotation: 2.5,
      zIndex: 5,
    },
    {
      id: 6,
      image: certificates6.src,
      rotation: 4,
      zIndex: 6,
    },
  ];

  // Calculate positions dynamically based on number of certificates
  const certWidth = 280; // Adjusted to match image aspect ratio (768:1086 ≈ 0.707)
  const overlapFactor = 2 / 3; // Show 2/3 of each certificate
  const spacing = certWidth * overlapFactor; // Space between certificates
  const totalWidth = spacing * (certificates.length - 1) + certWidth;

  return (
    <section className="py-12 bg-secondary relative z-0">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.home.certificates.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.home.certificates.subtitle}
          </p>
        </div>

        {/* Mobile: Grid Layout */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="relative bg-background rounded-lg overflow-hidden shadow-lg animate-fade-in"
            >
              <img
                src={cert.image}
                alt="Certificate"
                className="w-full h-64 object-cover"
              />
              {/*<div className="p-2 text-center">*/}
              {/*  <h3 className="text-sm font-semibold text-foreground">*/}
              {/*    {cert.title}*/}
              {/*  </h3>*/}
              {/*</div>*/}
            </div>
          ))}
        </div>

        {/* Tablet: Simplified Grid */}
        <div className="hidden md:grid lg:hidden grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="relative bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in"
            >
              <img
                src={cert.image}
                alt="Certificate"
                className="w-full h-80 object-cover"
              />
              {/*<div className="p-3 text-center">*/}
              {/*  <h3 className="text-sm font-semibold text-foreground">*/}
              {/*    {cert.title}*/}
              {/*  </h3>*/}
              {/*</div>*/}
            </div>
          ))}
        </div>

        {/* Desktop: Spread Certificates */}
        <div className="hidden lg:block relative mx-auto h-[480px]" style={{ maxWidth: `${totalWidth + 100}px` }}>
          <div className="relative h-full flex items-center justify-center">
            {certificates.map((cert, index) => {
              const xPosition = index * spacing - (totalWidth - certWidth) / 2;

              return (
                <div
                  key={cert.id}
                  className="absolute transition-all duration-500 ease-out cursor-pointer"
                  style={{
                    transform: `translateX(${xPosition}px) translateY(${hoveredId === cert.id ? -20 : 0}px) rotate(${
                      hoveredId === cert.id ? 0 : cert.rotation
                    }deg) scale(${hoveredId === cert.id ? 1.05 : 1})`,
                    zIndex: hoveredId === cert.id ? 10 : cert.zIndex,
                  }}
                  onMouseEnter={() => setHoveredId(cert.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    className={`relative bg-background rounded-lg overflow-hidden transition-shadow duration-500 ${
                      hoveredId === cert.id
                        ? "shadow-2xl shadow-primary/30"
                        : "shadow-lg"
                    }`}
                    style={{
                      width: "280px",
                      height: "396px",
                    }}
                  >
                    <img
                      src={cert.image}
                      alt="Certificate"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay on hover */}
                    {/*{hoveredId === cert.id && (*/}
                    {/*  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 animate-fade-in">*/}
                    {/*    <h3 className="text-white text-xl font-bold">*/}
                    {/*      {cert.title}*/}
                    {/*    </h3>*/}
                    {/*  </div>*/}
                    {/*)}*/}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        {/*<div className="text-center mt-10 animate-fade-in-up">*/}
        {/*  <p className="text-muted-foreground">*/}
        {/*    {t.home.certificates.additionalInfo}*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default Certificates;
