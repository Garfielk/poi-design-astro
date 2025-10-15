import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "COMPANY", href: "#company" },
    { label: "EVENTS", href: "#events" },
    { label: "PRODUCTS", href: "#products" },
    { label: "CONTACT US", href: "#contact" },
  ];

  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                POI
              </div>
              <span className="text-sm text-white/70">RESEARCH</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Engineered protection for athletes. Innovation through passion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
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
            <h3 className="text-lg font-semibold text-white mb-4">CONTACT US</h3>
            <div className="space-y-3">
              <a href="mailto:info@poiresearch.com" className="flex items-start gap-3 text-sm hover:text-accent transition-colors group">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>info@poiresearch.com</span>
              </a>
              <a href="tel:+8653266748597" className="flex items-start gap-3 text-sm hover:text-accent transition-colors group">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>+86 532 66748597<br />+86 19920826825</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>
                  2/F BLOCK NO.6, XIYUAN ROAD,<br />
                  XIFU'AN SUBDISTRICT, CHENGYANG DISTRICT,<br />
                  QINGDAO, SHANDONG, CHINA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>© 2024 POI Research. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
