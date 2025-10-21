import laboratoryImg from "@/assets/laboratory.jpg";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {getLocalizedPath, getTranslations} from "@/i18n/utils.ts";
import type {Language} from "@/i18n/config.ts";

interface Props {
  lang: Language;
}

const LaboratoryDetail = ({ lang }: Props) => {
  const t = getTranslations(lang);
  // Sample data for content blocks
  const contentBlocks = [
    {
      id: 1,
      title: "Test data empirically validates performance",
      description: "Our advanced laboratory is equipped with state-of-the-art impact machine and a programmable constant temperature and humidity test chamber.\n\nWe test the product's impact resistance under different temperature and humidity conditions and will improve the product based on the test results.\n\nErgonomic design principles integrated with scientifically validated test data deliver exceptional product performance and user comfort.",
      image: laboratoryImg.src,
      imageOnRight: true,
      bgClass: "bg-background"
    },
    {
      id: 2,
      title: "Through which engineering methodologies can we enhance product performance metrics?",
      description: "Through multidimensional analysis of quantitative data across various test trails, comprehensive experimental evaluation and critical examination of structural parameters, we can achieve targeted reinforcement of structural strength.\n\nOur methodology combines advanced testing protocols with data-driven insights to optimize protection performance.",
      image: laboratoryImg.src,
      imageOnRight: false,
      bgClass: "bg-secondary/20"
    },
    {
      id: 3,
      title: "How do we implement this process?",
      description: "Our laboratory performs global impact resistance testing under programmable temperature and humidity conditions. By leveraging customizable algorithm test databases, we enhance product reliability via testing experimental insights back into our design process.\n\nThis iterative approach ensures continuous improvement and superior product quality.",
      image: laboratoryImg.src,
      imageOnRight: true,
      bgClass: "bg-background"
    },
    {
      id: 4,
      title: "About the test",
      description: "Our R&D center utilizes specialized impact testing equipment to rigorously validate product quality and reliability.\n\nOur facility leverages systematic analysis, providing actionable insights for new product development.\n\nWe are committed to continuous refinement of our offerings to enhance competitive positioning in the market.",
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
                  <a href={getLocalizedPath("/", lang)}>Home</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Laboratory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              LABORATORY
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-accent mb-8" />
            <p className="text-xl text-foreground/80 leading-relaxed">
              Product test data provides the most accurate quantification of performance.
              Our state-of-the-art facility ensures every product meets the highest standards.
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
