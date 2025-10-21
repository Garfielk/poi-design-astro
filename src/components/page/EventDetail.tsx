import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import eicmaMilan from "@/assets/events/eicma-milan.jpg";
import intermotCologne from "@/assets/events/intermot-cologne.jpg";
import motogpEvent from "@/assets/events/motogp-event.jpg";
import ispoMunich from "@/assets/events/ispo-munich.jpg";

const eventsData = [
  {
    id: "eicma-milan",
    title: "EICMA Milan",
    location: "Fiera Milano, Italy",
    date: "07 - 12 NOV",
    image: eicmaMilan,
    content: `
      <h2>About EICMA Milan</h2>
      <p>EICMA (Esposizione Internazionale Ciclo Motociclo e Accessori) is the world's largest motorcycle exhibition, held annually in Milan, Italy. This prestigious event brings together manufacturers, suppliers, and enthusiasts from around the globe.</p>
      
      <h3>Event Highlights</h3>
      <ul>
        <li>Over 1,800 exhibitors from 40+ countries</li>
        <li>Latest motorcycle models and prototypes</li>
        <li>Innovative safety equipment demonstrations</li>
        <li>Networking opportunities with industry leaders</li>
      </ul>
      
      <h3>Our Participation</h3>
      <p>We'll be showcasing our latest protective gear innovations, including CE-certified back protectors and armor systems. Visit our booth to experience hands-on demonstrations and meet our technical team.</p>
      
      <h3>Venue Information</h3>
      <p>Fiera Milano Exhibition Center<br>
      Strada Statale del Sempione, 28<br>
      20017 Rho, Milan, Italy</p>
    `,
  },
  {
    id: "intermot-cologne",
    title: "INTERMOT Cologne",
    location: "Cologne, Germany",
    date: "04 - 08 OCT",
    image: intermotCologne,
    content: `
      <h2>About INTERMOT Cologne</h2>
      <p>INTERMOT is one of Europe's premier motorcycle trade shows, attracting thousands of visitors and exhibitors to Cologne every year. The event showcases the latest trends in motorcycling and protective equipment.</p>
      
      <h3>What to Expect</h3>
      <ul>
        <li>New product launches and innovations</li>
        <li>Test rides and live demonstrations</li>
        <li>Industry conferences and workshops</li>
        <li>Exclusive dealer meetings</li>
      </ul>
      
      <h3>Our Exhibition</h3>
      <p>Join us at Hall 8 where we'll present our complete range of motorcycle protectors. Our experts will be available for consultations and custom fitting sessions.</p>
      
      <h3>How to Visit</h3>
      <p>Koelnmesse GmbH<br>
      Messeplatz 1<br>
      50679 Cologne, Germany</p>
    `,
  },
  {
    id: "motogp-championship",
    title: "MotoGP Championship",
    location: "Various Locations",
    date: "MAR - NOV",
    image: motogpEvent,
    content: `
      <h2>MotoGP Championship Partnership</h2>
      <p>As an official supplier to several MotoGP teams, we're proud to be part of the world's premier motorcycle racing series. Our protective technology is trusted by professional riders competing at the highest level.</p>
      
      <h3>Championship Season</h3>
      <ul>
        <li>20+ races across 5 continents</li>
        <li>Cutting-edge safety technology testing</li>
        <li>Real-world performance validation</li>
        <li>Direct feedback from professional riders</li>
      </ul>
      
      <h3>Technology Transfer</h3>
      <p>The innovations developed for MotoGP directly influence our consumer products. Every protector we sell benefits from insights gained on the world's fastest racing circuits.</p>
      
      <h3>Meet Us at the Track</h3>
      <p>Throughout the season, our team attends multiple races. Visit our hospitality area to see the latest prototypes and learn how racing technology enhances rider safety.</p>
    `,
  },
  {
    id: "ispo-munich",
    title: "ISPO Munich",
    location: "Munich, Germany",
    date: "28 - 30 NOV",
    image: ispoMunich,
    content: `
      <h2>ISPO Munich - Sports Innovation</h2>
      <p>ISPO Munich is the world's largest sports trade fair, bringing together innovations from multiple sporting disciplines. Our presence showcases how our protective technology extends beyond motorcycling to various action sports.</p>
      
      <h3>Multi-Sport Protection</h3>
      <ul>
        <li>Skiing and snowboarding protection</li>
        <li>Mountain biking armor systems</li>
        <li>Multi-purpose impact protection</li>
        <li>Breathable, flexible design innovations</li>
      </ul>
      
      <h3>Innovation Awards</h3>
      <p>ISPO is renowned for recognizing breakthrough innovations. Join us to see our award-nominated products and discover the future of sports protection.</p>
      
      <h3>Location Details</h3>
      <p>Messe München<br>
      Messegelände<br>
      81823 Munich, Germany</p>
    `,
  },
];

const EventDetail = () => {
  const { id } = useParams();
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
            <Link to="/events" className="text-primary hover:underline">
              Back to Events
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 lg:px-8 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-white">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg font-semibold">{event.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/events">Events</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{event.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-ul:text-muted-foreground prose-ul:my-4
                prose-li:my-2
                prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
