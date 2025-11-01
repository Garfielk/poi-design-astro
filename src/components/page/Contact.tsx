import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import type {Language} from "@/i18n/config.ts";
import {useTranslations} from "@/i18n/utils.ts";
import banner from '@/assets/contact/banner.jpg'
import Dean from '@/assets/contact/Dean.jpg'
import Ella from '@/assets/contact/Ella.jpg'
import Susan from '@/assets/contact/Susan.jpg'

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
    name: "Ella Guan",
    role: "VP",
    mobile: '+86-15020036235',
    email: 'ella@poidesigns.com',
    image: Ella.src,
  },
  {
    id: 3,
    name: "Susan Pan",
    role: "Manager",
    mobile: '+86-13361232855',
    email: 'susan@poidesigns.com',
    image: Susan.src,
  },
  {
    id: 3,
    name: "Dean Ding",
    role: "Manager",
    mobile: '+86-18660299596',
    email: 'dean@poidesigns.com',
    image: Dean.src,
  },
];

interface Props {
  lang: Language;
}
const Contact = ({lang}: Props) => {
  const {t} = useTranslations(lang);

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
              <div className="space-y-4 hidden">
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{t.contact.details.email}</p>
                    <a href={`mailto:${t.footer.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {t.footer.email}
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
                      {t.footer.phone}
                    </a>
                    <br />
                    <a href="tel:+8619920628225" className="text-muted-foreground hover:text-primary transition-colors">
                      {t.footer.phoneSecondary}
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
                      {t.footer.zipCode}<br />
                      {t.footer.address}<br />
                      {t.footer.addressLine2}<br />
                      {t.footer.addressLine3}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative animate-fade-in flex justify-center items-center" style={{ animationDelay: "0.1s" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[720/920] h-[52.5vh] w-auto">
                <img
                  src={banner.src}
                  alt={t.contact.hero.imageAlt}
                  className="w-full h-full object-cover"
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
            {/*<p className="text-lg text-muted-foreground max-w-3xl mx-auto">*/}
            {/*  {t.contact.team.subtitle}*/}
            {/*</p>*/}
          </div>

          {/* Leadership Level */}
          {/*<div className="mb-20">*/}
          {/*  <div className="text-center mb-8 animate-fade-in">*/}
          {/*    <h3 className="text-2xl font-bold text-primary">{t.contact.team.leadership}</h3>*/}
          {/*  </div>*/}
          {/*  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">*/}
          {/*    {leadershipTeam.map((member, index) => {*/}
          {/*      const isHovered = hoveredMember === member.id;*/}

          {/*      return (*/}
          {/*        <div*/}
          {/*          key={member.id}*/}
          {/*          className="group animate-fade-in"*/}
          {/*          style={{ animationDelay: `${index * 0.1}s` }}*/}
          {/*          onMouseEnter={() => setHoveredMember(member.id)}*/}
          {/*          onMouseLeave={() => setHoveredMember(null)}*/}
          {/*        >*/}
          {/*          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">*/}
          {/*            /!* Image *!/*/}
          {/*            <div className="w-full aspect-[3/4] overflow-hidden">*/}
          {/*              <img*/}
          {/*                src={member.image}*/}
          {/*                alt={member.name}*/}
          {/*                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"*/}
          {/*              />*/}
          {/*            </div>*/}

          {/*            /!* Info Overlay *!/*/}
          {/*            <div className="absolute bottom-0 left-0 right-0 bg-background p-4 transform transition-transform duration-300">*/}
          {/*              <h3 className="font-bold text-lg mb-1">{member.name}</h3>*/}
          {/*              <p className="text-sm text-muted-foreground">{member.role}</p>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* Team Members Level */}
          <div>
            {/*<div className="text-center mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>*/}
            {/*  <h3 className="text-2xl font-bold text-primary">{t.contact.team.members}</h3>*/}
            {/*</div>*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Image with padding */}
                    <div className="w-full aspect-[1/1] overflow-hidden p-4 pb-0 bg-[#fbfbfb]">
                      <div className="w-full h-full overflow-hidden rounded-lg">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Info Below Image */}
                    <div className="p-4 bg-background transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                      <h3 className="font-bold text-lg mb-2">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 transition-colors duration-200 group-hover:text-primary-foreground/90">{member.role}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-1 transition-colors duration-200 group-hover:text-primary-foreground/80">
                          <Phone className="w-3 h-3" />
                          {member.mobile}
                        </p>
                        <p className="text-sm">
                          <a
                            href={`mailto:${member.email}`}
                            className="text-primary hover:underline flex items-center gap-1 transition-colors duration-200 group-hover:text-primary-foreground group-hover:no-underline"
                          >
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
