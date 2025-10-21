import laboratoryImg from "@/assets/laboratory.jpg";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {getLocalizedPath, getTranslations} from "@/i18n/utils.ts";
import type {Language} from "@/i18n/config.ts";

interface Props {
  lang: Language;
}

const LaboratoryDetail = ({ lang }: Props) => {
  const t = getTranslations(lang);

  const contentBlocks = [
    {
      id: 1,
      title: t.laboratory.contentBlocks[0].title,
      description: t.laboratory.contentBlocks[0].description,
      image: laboratoryImg.src,
      imageOnRight: true,
      bgClass: "bg-background"
    },
    {
      id: 2,
      title: t.laboratory.contentBlocks[1].title,
      description: t.laboratory.contentBlocks[1].description,
      image: laboratoryImg.src,
      imageOnRight: false,
      bgClass: "bg-secondary/20"
    },
    {
      id: 3,
      title: t.laboratory.contentBlocks[2].title,
      description: t.laboratory.contentBlocks[2].description,
      image: laboratoryImg.src,
      imageOnRight: true,
      bgClass: "bg-background"
    },
    {
      id: 4,
      title: t.laboratory.contentBlocks[3].title,
      description: t.laboratory.contentBlocks[3].description,
      image: laboratoryImg.src,
      imageOnRight: false,
      bgClass: "bg-white"
    }
  ];

  return (
    <div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href={getLocalizedPath("/", lang)}>{t.nav.home}</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t.home.laboratory.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t.home.laboratory.title}
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-accent mb-8" />
            <p className="text-xl text-foreground/80 leading-relaxed">
              {t.laboratory.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Blocks */}
      {contentBlocks.map((block) => (
        <section key={block.id} className={`py-0 ${block.bgClass}`}>
          <div className="container mx-auto px-0">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Image */}
              <div
                className={`relative ${block.imageOnRight ? 'lg:order-2' : 'lg:order-1'} h-full min-h-[400px] lg:min-h-[600px]`}
              >
                <img
                  src={block.image}
                  alt={block.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div
                className={`flex items-center ${block.imageOnRight ? 'lg:order-1' : 'lg:order-2'} px-6 lg:px-16 py-12 lg:py-16`}
              >
                <div className="max-w-xl">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    {block.title}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-6" />
                  <div className="space-y-4 text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                    {block.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

    </div>
  );
};

export default LaboratoryDetail;
