import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import type {Language} from "@/i18n/config.ts";
import {useTranslations} from "@/i18n/utils.ts";

const leadershipTeam = [
  {
    id: 1,
    name: "Joss Anderson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    social: { icon: Linkedin, bg: "bg-[#0A66C2]" }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Chief Operating Officer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    social: { icon: Linkedin, bg: "bg-[#0A66C2]" }
  }
];

const teamMembers = [
  {
    id: 3,
    name: "Michael Chen",
    role: "Art Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    social: { icon: Twitter, bg: "bg-[#1DA1F2]" }
  },
  {
    id: 4,
    name: "Emily Williams",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    social: { icon: Facebook, bg: "bg-[#1877F2]" }
  },
  {
    id: 5,
    name: "David Martinez",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    social: { icon: Instagram, bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]" }
  },
  {
    id: 6,
    name: "Lisa Thompson",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    social: { icon: Twitter, bg: "bg-[#1DA1F2]" }
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    social: { icon: Linkedin, bg: "bg-[#0A66C2]" }
  },
  {
    id: 8,
    name: "Anna Rodriguez",
    role: "Business Developer",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    social: { icon: Facebook, bg: "bg-[#1877F2]" }
  }
];

interface Props {
  lang: Language;
}
const Contact = ({lang}: Props) => {
  const {t} = useTranslations(lang);

  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Contact Info */}
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                {t.contact.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {t.contact.hero.description}
              </p>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{t.contact.details.email}</p>
                    <a href="mailto:info@poidesigns.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@poidesigns.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{t.contact.details.phone}</p>
                    <a href="tel:+8653266736937" className="text-muted-foreground hover:text-primary transition-colors">
                      +86 532 66736937
                    </a>
                    <br />
                    <a href="tel:+8619920628225" className="text-muted-foreground hover:text-primary transition-colors">
                      +86 19920628225
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{t.contact.details.address}</p>
                    <p className="text-muted-foreground">
                      AF CODE: 370214<br />
                      NO 8-3, YIYUAN ROAD, XIFUZHEN SUBDISTRICT<br />
                      CHENGYANG DISTRICT, QINGDAO, SHANDONG, CHINA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop"
                  alt={t.contact.hero.imageAlt}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t.contact.team.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.contact.team.subtitle}
            </p>
          </div>

          {/* Leadership Level */}
          <div className="mb-20">
            <div className="text-center mb-8 animate-fade-in">
              <h3 className="text-2xl font-bold text-primary">{t.contact.team.leadership}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {leadershipTeam.map((member, index) => {
                const isHovered = hoveredMember === member.id;

                return (
                  <div
                    key={member.id}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                      {/* Image */}
                      <div className="w-full aspect-[3/4] overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-background p-4 transform transition-transform duration-300">
                        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Members Level */}
          <div>
            <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-bold text-primary">{t.contact.team.members}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => {
                const isHovered = hoveredMember === member.id;

                return (
                  <div
                    key={member.id}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                      {/* Image */}
                      <div className="w-full aspect-[3/4] overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-background p-4 transform transition-transform duration-300">
                        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
