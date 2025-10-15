import { useState } from "react";
import ceCertificate from "@/assets/certificates/ce-certificate.jpg";
import fccCertificate from "@/assets/certificates/fcc-certificate.jpg";
import euDeclaration from "@/assets/certificates/eu-declaration.jpg";
import koreanCert from "@/assets/certificates/korean-cert.jpg";

const certificates = [
  {
    id: 1,
    image: koreanCert.src,
    title: "Korean Certification",
    rotation: -3,
    zIndex: 1,
  },
  {
    id: 2,
    image: euDeclaration.src,
    title: "EU Declaration",
    rotation: -1,
    zIndex: 2,
  },
  {
    id: 3,
    image: fccCertificate.src,
    title: "FCC Certificate",
    rotation: 1,
    zIndex: 3,
  },
  {
    id: 4,
    image: ceCertificate.src,
    title: "CE Certificate",
    rotation: 3,
    zIndex: 4,
  },
];

const Certificates = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Calculate positions dynamically based on number of certificates
  const certWidth = 300;
  const overlapFactor = 2 / 3; // Show 2/3 of each certificate
  const spacing = certWidth * overlapFactor; // Space between certificates
  const totalWidth = spacing * (certificates.length - 1) + certWidth;

  return (
    <section className="py-12 bg-secondary relative z-0">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            CE Certificate
          </h2>
          <p className="text-lg text-muted-foreground">
            Certified quality and safety standards
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
                alt={cert.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 text-center">
                <h3 className="text-sm font-semibold text-foreground">
                  {cert.title}
                </h3>
              </div>
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
                alt={cert.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-foreground">
                  {cert.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Spread Certificates */}
        <div className="hidden lg:block relative mx-auto h-[450px]" style={{ maxWidth: `${totalWidth + 100}px` }}>
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
                      width: "300px",
                      height: "400px",
                    }}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay on hover */}
                    {hoveredId === cert.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 animate-fade-in">
                        <h3 className="text-white text-xl font-bold">
                          {cert.title}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-10 animate-fade-in-up">
          <p className="text-muted-foreground">
            All products meet international safety and quality standards
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
