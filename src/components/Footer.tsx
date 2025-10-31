import { Mail, Phone, MapPin } from "lucide-react";
import type { Language } from "@/i18n/config";
import {getLocalizedPath, getTranslations} from "@/i18n/utils";

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => {
  const t = getTranslations(lang);

  const navLinks = [
    { label: t.nav.home, href: getLocalizedPath("/", lang) },
    { label: t.nav.company, href: getLocalizedPath("/company", lang) },
    { label: t.nav.products, href: getLocalizedPath("/products", lang) },
    { label: t.nav.events, href: getLocalizedPath("/events", lang) },
    { label: t.nav.contactUs, href: getLocalizedPath("/contact", lang) },
  ];

  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-32 h-10 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/logo.png')" }}
              >
                <span className="sr-only">POI</span>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {t.footer.brandDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.quickLinks}</h3>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm hover:text-accent transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.contactUs}</h3>
            <div className="space-y-3">
              <a href={`mailto:${t.footer.email}`} className="flex items-start gap-3 text-sm hover:text-accent transition-colors group">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>{t.footer.email}</span>
              </a>
              <a href={`tel:${t.footer.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 text-sm hover:text-accent transition-colors group">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>{t.footer.phone}<br />{t.footer.phoneSecondary}</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>
                  {t.footer.zipCode}<br />
                  {t.footer.address}<br />
                  {t.footer.addressLine2}<br />
                  {t.footer.addressLine3}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>{t.footer.copyright}</p>
            {/*<div className="flex gap-6">*/}
            {/*  <a href="#privacy" className="hover:text-accent transition-colors">{t.footer.privacyPolicy}</a>*/}
            {/*  <a href="#terms" className="hover:text-accent transition-colors">{t.footer.termsOfService}</a>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
