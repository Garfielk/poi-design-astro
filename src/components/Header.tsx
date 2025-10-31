import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {Language} from "@/i18n/config.ts";
import {getTranslations, getLocalizedPath, getAlternateLanguage, getLanguageSwitchUrl} from "@/i18n/utils.ts";
import {languages} from "@/i18n/config.ts";

interface Props {
  lang: Language;
}

const Header = ({ lang }: Props) => {
  const t = getTranslations(lang);
  const alternateLang = getAlternateLanguage(lang);
  const alternateLangName = languages[alternateLang];
  const switchUrl = getLanguageSwitchUrl(typeof window !== 'undefined' ? window.location.pathname : '/', lang);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // 创建哨兵元素
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '20px';
    sentinel.style.width = '1px';
    sentinel.style.pointerEvents = 'none';
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: [1] } // 完全可见时为 true
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    // 标记组件已挂载并设置初始路径
    setIsMounted(true);
    setCurrentPath(window.location.pathname);

    // 监听路由变化 (支持 Astro 的客户端路由)
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    // 监听 Astro 的页面导航事件
    document.addEventListener('astro:page-load', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('astro:page-load', handleLocationChange);
    };
  }, []);

  const navItems = [
    { label: t.nav.home, href: getLocalizedPath("/", lang) },
    { label: t.nav.company, href: getLocalizedPath("/company", lang) },
    { label: t.nav.products, href: getLocalizedPath("/products", lang) },
    { label: t.nav.events, href: getLocalizedPath("/events", lang) },
    { label: t.nav.contactUs, href: getLocalizedPath("/contact", lang) },
  ];

  // 判断导航项是否激活
  const isActive = (href: string) => {
    // 在组件挂载之前不显示激活状态,避免 hydration 不匹配
    if (!isMounted) return false;

    // 移除尾部斜杠进行比较
    const normalizedPath = currentPath.replace(/\/$/, '') || '/';
    const normalizedHref = href.replace(/\/$/, '') || '/';
    return normalizedPath === normalizedHref;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-lg shadow-lg border-b border-white/10" : "bg-black/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div
              className="w-32 h-10 lg:w-40 lg:h-12 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/logo.png')" }}
            >
              <span className="sr-only">POI design</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 relative group ${
                  isActive(item.href) 
                    ? "text-accent" 
                    : "text-white/90 hover:text-accent"
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  isActive(item.href) 
                    ? "w-full" 
                    : "w-0 group-hover:w-full"
                }`} />
              </a>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 text-sm">
              <button
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  lang === 'en' 
                    ? 'bg-accent text-white cursor-not-allowed' 
                    : 'text-white/90 hover:text-accent hover:bg-white/10'
                }`}
                onClick={() => lang !== 'en' && (window.location.href = getLanguageSwitchUrl(typeof window !== 'undefined' ? window.location.pathname : '/', lang))}
                disabled={lang === 'en'}
              >
                EN
              </button>
              <span className="text-white/60 mx-1">/</span>
              <button
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  lang === 'zh-CN' 
                    ? 'bg-accent text-white cursor-not-allowed' 
                    : 'text-white/90 hover:text-accent hover:bg-white/10'
                }`}
                onClick={() => lang !== 'zh-CN' && (window.location.href = getLanguageSwitchUrl(typeof window !== 'undefined' ? window.location.pathname : '/', lang))}
                disabled={lang === 'zh-CN'}
              >
                简体中文
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/90 hover:text-accent transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors py-2 ${
                    isActive(item.href)
                      ? "text-accent font-semibold"
                      : "text-white/90 hover:text-accent"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-1 text-sm py-2">
                <button
                  className={`px-3 py-1 rounded transition-colors duration-200 ${
                    lang === 'en' 
                      ? 'bg-accent text-white cursor-not-allowed' 
                      : 'text-white/90 hover:text-accent hover:bg-white/10'
                  }`}
                  onClick={() => lang !== 'en' && (window.location.href = getLanguageSwitchUrl(typeof window !== 'undefined' ? window.location.pathname : '/', lang))}
                  disabled={lang === 'en'}
                >
                  EN
                </button>
                <span className="text-white/60 mx-1">/</span>
                <button
                  className={`px-3 py-1 rounded transition-colors duration-200 ${
                    lang === 'zh-CN' 
                      ? 'bg-accent text-white cursor-not-allowed' 
                      : 'text-white/90 hover:text-accent hover:bg-white/10'
                  }`}
                  onClick={() => lang !== 'zh-CN' && (window.location.href = getLanguageSwitchUrl(typeof window !== 'undefined' ? window.location.pathname : '/', lang))}
                  disabled={lang === 'zh-CN'}
                >
                  简体中文
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
