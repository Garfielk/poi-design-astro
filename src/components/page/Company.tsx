import companyBannerImg from "@/assets/company/banner.jpg";
import company1 from "@/assets/company/1.jpg";
import company2 from "@/assets/company/2.jpg";
import company3 from "@/assets/company/3.jpg";
import history1995 from "@/assets/history/1995.jpg";
import history2006 from "@/assets/history/2006.jpg";
import history2012 from "@/assets/history/2012.jpg";
import history2016 from "@/assets/history/2016.jpg";
import history2022 from "@/assets/history/2022.jpg";
import history2023 from "@/assets/history/2023.jpg";
// import history2024 from "@/assets/history/2024.jpg";
import history2025 from "@/assets/history/2025.jpg";
import type {Language} from "@/i18n/config.ts";
import {useTranslations} from "@/i18n/utils.ts";

interface Props {
  lang: Language;
}

const Company = ({lang}: Props) => {
  const {t} = useTranslations(lang);

  const videos = [
    {
      title: t.company.advantages.videos.factory,
      id: "1",
      src: "https://www.youtube.com/embed/INnqcXiOGEk"
    },
    {
      title: t.company.advantages.videos.lab,
      id: "2",
      src: "https://www.youtube.com/embed/SQzmkWsiW4c"
    }
  ]

  const historyTimeline = [
    {
      year: "1995",
      description: t.company.history.timeline['1995'],
      detail: t.company.history.timelineDetails['1995'],
      image: history1995,
    },
    {
      year: "2006",
      description: t.company.history.timeline['2006'],
      detail: t.company.history.timelineDetails['2006'],
      image: history2006,
    },
    {
      year: "2012",
      description: t.company.history.timeline['2012'],
      detail: t.company.history.timelineDetails['2012'],
      image: history2012,
    },
    {
      year: "2016",
      description: t.company.history.timeline['2016'],
      detail: t.company.history.timelineDetails['2016'],
      image: history2016,
    },
    {
      year: "2022",
      description: t.company.history.timeline['2022'],
      detail: t.company.history.timelineDetails['2022'],
      image: history2022,
    },
    {
      year: "2023",
      description: t.company.history.timeline['2023'],
      detail: t.company.history.timelineDetails['2023'],
      image: history2023,
    },
    // {
    //   year: "2024",
    //   description: t.company.history.timeline['2024'],
    //   detail: t.company.history.timelineDetails['2024'],
    //   image: history2024,
    // },
    {
      year: "2025",
      description: t.company.history.timeline['2025'],
      detail: t.company.history.timelineDetails['2025'],
      image: history2025,
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[535px] flex items-center justify-center overflow-hidden mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: `url(${companyBannerImg.src})`}}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/50 to-background/40"/>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 ">
          <div className="max-w-2xl">
            <h1
              className="text-4xl lg:text-6xl font-bold mb-6 text-black leading-tight pb-2">
              {t.company.hero.title}
            </h1>
            <p className="text-lg lg:text-xl text-black">
              {t.company.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* About POI Designs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t.company.about.title}</h2>
            <div className="max-w-5xl mx-auto text-muted-foreground space-y-4">
              <p>
                {t.company.about.paragraph1}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[company1, company2, company3].map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={`Company ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t.company.advantages.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto whitespace-pre-line leading-relaxed">
              {t.company.advantages.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in bg-background"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <iframe width="496" height="280" src={video.src}
                        title={video.title} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t.company.history.title}</h2>
            <p className="text-left text-lg text-muted-foreground max-w-4xl mx-auto whitespace-pre-line leading-relaxed">
              {t.home.productShowcase.description}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto mt-16 pb-24">
            {/* Vertical Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block"
              style={{height: 'calc(100% - 80px)'}}/>

            {/* Timeline Items */}
            <div className="space-y-16">
              {historyTimeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className="relative animate-fade-in group"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
                      {isEven ? (
                        <>
                          {/* Desktop: Text on left, Image on right */}
                          <div className="pr-8 hidden md:block">
                            <div
                              className="bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 text-right">
                              <h3
                                className="text-3xl font-bold mb-2 text-black">
                                {item.year}
                              </h3>
                              <p className="text-xl font-semibold text-black break-words">{item.description}</p>
                              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.detail}</p>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 pl-8 hidden md:block">
                            <div className="rounded-lg w-48 h-48 shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                              <img
                                src={item.image.src}
                                alt={`History ${item.year}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Mobile/Tablet: Text on top, Image on bottom, centered */}
                          <div className="md:hidden text-center mb-6">
                            <div
                              className="bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                              <h3
                                className="text-3xl font-bold mb-2 text-black">
                                {item.year}
                              </h3>
                              <p className="text-xl font-semibold text-black break-words">{item.description}</p>
                              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.detail}</p>
                            </div>
                          </div>
                          <div className="md:hidden flex justify-center">
                            <div className="rounded-lg w-48 h-48 shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                              <img
                                src={item.image.src}
                                alt={`History ${item.year}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Desktop: Image on left, Text on right */}
                          <div className="order-2 md:order-1 mt-4 md:mt-0 pr-8 hidden md:block">
                            <div className="rounded-lg w-48 ml-auto h-48 shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                              <img
                                src={item.image.src}
                                alt={`History ${item.year}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="order-1 md:order-2 pl-8 hidden md:block">
                            <div
                              className="bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 text-left">
                              <h3
                                className="text-3xl font-bold mb-2 text-black">
                                {item.year}
                              </h3>
                              <p className="text-xl font-semibold text-black break-words">{item.description}</p>
                              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.detail}</p>
                            </div>
                          </div>

                          {/* Mobile/Tablet: Text on top, Image on bottom, centered */}
                          <div className="md:hidden text-center mb-6">
                            <div
                              className="bg-background p-6 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                              <h3
                                className="text-3xl font-bold mb-2 text-black">
                                {item.year}
                              </h3>
                              <p className="text-xl font-semibold text-black break-words">{item.description}</p>
                              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.detail}</p>
                            </div>
                          </div>
                          <div className="md:hidden flex justify-center">
                            <div className="rounded-lg w-48 h-48 shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                              <img
                                src={item.image.src}
                                alt={`History ${item.year}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className="absolute left-1/2 top-6 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background hidden md:block group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300"/>
                  </div>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="text-center mt-24 animate-fade-in relative z-10" style={{animationDelay: "0.4s"}}>
              <div
                className="inline-block text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-default">
                {t.company.history.continue}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Company;
