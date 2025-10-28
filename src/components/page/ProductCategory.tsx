import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import heroProtector from "@/assets/hero-protector.jpg";
import motorcycle from "@/assets/motorcycle.jpg";
import mountainBike from "@/assets/mountain-bike.jpg";
import skiing from "@/assets/skiing.jpg";
import sports from "@/assets/sports.jpg";
import type {Language} from "@/i18n/config.ts";
import {getLocalizedPath, useTranslations} from "@/i18n/utils.ts";

interface Category {
  title: string;
  path: string;
  children: Array<{
    title: string;
    path: string;
  }>;
}

const categories: Category[] = [
  { 
    title: "Motorcycle", 
    path: "motorcycle",
    children: [
      { title: "Racing Gear", path: "racing" },
      { title: "Touring Protection", path: "touring" },
      { title: "Off-Road Armor", path: "offroad" },
    ]
  },
  { 
    title: "Mountain Bike", 
    path: "mountain-bike",
    children: [
      { title: "Downhill Protection", path: "downhill" },
      { title: "Cross-Country Gear", path: "cross-country" },
      { title: "Enduro Equipment", path: "enduro" },
    ]
  },
  { 
    title: "Skiing", 
    path: "skiing",
    children: [
      { title: "Alpine Skiing", path: "alpine" },
      { title: "Freestyle & Park", path: "freestyle" },
      { title: "Backcountry", path: "backcountry" },
    ]
  },
  { 
    title: "Sports", 
    path: "textile-garment",
    children: [
      { title: "Team Sports", path: "team-sports" },
      { title: "Extreme Sports", path: "extreme-sports" },
      { title: "Water Sports", path: "water-sports" },
    ]
  },
];

const productsByCategory: Record<string, Array<{ id: string; image: string; name: string; description: string }>> = {
  "motorcycle-racing": [
    { id: "racing-back-protector-pro", image: heroProtector, name: "Racing Back Protector Pro", description: "Advanced sheer thinning technology with CE Level 2 certification for maximum impact protection" },
    { id: "racing-chest-guard-elite", image: motorcycle, name: "Racing Chest Guard Elite", description: "Lightweight design with superior ventilation and shock absorption capabilities" },
    { id: "racing-shoulder-protector", image: heroProtector, name: "Racing Shoulder Protector", description: "Ergonomic fit with flexible armor plates for unrestricted movement" },
    { id: "racing-knee-slider-guards", image: motorcycle, name: "Racing Knee Slider Guards", description: "Professional-grade protection with replaceable sliders" },
  ],
  "motorcycle-touring": [
    { id: "touring-back-protector", image: heroProtector, name: "Touring Back Protector", description: "All-day comfort with CE Level 1 protection for long-distance rides" },
    { id: "touring-elbow-protectors", image: motorcycle, name: "Touring Elbow Protectors", description: "Breathable mesh construction with reinforced impact zones" },
    { id: "touring-hip-protector", image: heroProtector, name: "Touring Hip Protector", description: "Slim profile design that fits comfortably under riding gear" },
    { id: "touring-knee-guards", image: motorcycle, name: "Touring Knee Guards", description: "Adjustable straps for perfect fit during extended rides" },
  ],
  "motorcycle-offroad": [
    { id: "offroad-chest-protector", image: motorcycle, name: "Off-Road Chest Protector", description: "Heavy-duty roost deflector with maximum coverage" },
    { id: "offroad-knee-braces", image: heroProtector, name: "Off-Road Knee Braces", description: "Medical-grade support with impact protection" },
    { id: "offroad-elbow-guards", image: motorcycle, name: "Off-Road Elbow Guards", description: "Hard-shell protection for extreme terrain" },
    { id: "offroad-neck-brace", image: heroProtector, name: "Off-Road Neck Brace", description: "Advanced neck protection system for MX riders" },
  ],
  "mountain-bike-downhill": [
    { id: "dh-full-body-armor", image: mountainBike, name: "DH Full Body Armor", description: "Complete protection system for aggressive downhill riding" },
    { id: "dh-knee-shin-guards", image: mountainBike, name: "DH Knee & Shin Guards", description: "Extended coverage design with slip-resistant silicone grippers" },
    { id: "dh-elbow-guards-pro", image: mountainBike, name: "DH Elbow Guards Pro", description: "Impact-resistant shell with soft interior padding" },
  ],
  "mountain-bike-cross-country": [
    { id: "xc-lightweight-back-protector", image: mountainBike, name: "XC Lightweight Back Protector", description: "Minimal weight with maximum breathability for climbing" },
    { id: "xc-knee-pads", image: mountainBike, name: "XC Knee Pads", description: "Low-profile protection that stays in place" },
    { id: "xc-elbow-sleeves", image: mountainBike, name: "XC Elbow Sleeves", description: "Compression fit with strategic padding" },
  ],
  "mountain-bike-enduro": [
    { id: "enduro-back-protector", image: mountainBike, name: "Enduro Back Protector", description: "Flexible spine protection with moisture-wicking fabric" },
    { id: "enduro-knee-guards", image: mountainBike, name: "Enduro Knee Guards", description: "All-day comfort with trail-ready protection" },
    { id: "enduro-shoulder-armor", image: mountainBike, name: "Enduro Shoulder Armor", description: "Modular design compatible with all major riding jerseys" },
  ],
  "skiing-alpine": [
    { id: "alpine-back-protector-elite", image: skiing, name: "Alpine Back Protector Elite", description: "Cold-weather optimized protection with thermal insulation layer" },
    { id: "alpine-chest-guard", image: skiing, name: "Alpine Chest Guard", description: "Low-profile design that fits seamlessly under ski jackets" },
    { id: "alpine-knee-protectors", image: skiing, name: "Alpine Knee Protectors", description: "Articulated joint design for natural skiing motion" },
  ],
  "skiing-freestyle": [
    { id: "freestyle-impact-vest", image: skiing, name: "Freestyle Impact Vest", description: "Multi-impact protection for park and pipe riding" },
    { id: "freestyle-wrist-guards", image: skiing, name: "Freestyle Wrist Guards", description: "Integrated palm protection with touchscreen-compatible fingertips" },
    { id: "freestyle-hip-protector", image: skiing, name: "Freestyle Hip Protector", description: "Padded side panels for fall protection on features" },
  ],
  "skiing-backcountry": [
    { id: "backcountry-avalanche-airbag", image: skiing, name: "Backcountry Avalanche Airbag", description: "Integrated protection with avalanche safety system" },
    { id: "backcountry-spine-protector", image: skiing, name: "Backcountry Spine Protector", description: "Lightweight protection for touring and splitboarding" },
    { id: "backcountry-shoulder-pads", image: skiing, name: "Backcountry Shoulder Pads", description: "Packable protection for sidecountry adventures" },
  ],
  "textile-garment-team-sports": [
    { id: "team-chest-protector", image: sports, name: "Team Sports Chest Protector", description: "Universal fit design for soccer, basketball, and more" },
    { id: "team-knee-pads-pro", image: sports, name: "Team Sports Knee Pads Pro", description: "High-density foam padding with anti-bacterial fabric" },
    { id: "team-elbow-guards", image: sports, name: "Team Sports Elbow Guards", description: "Compression sleeve design with reinforced impact zones" },
  ],
  "textile-garment-extreme-sports": [
    { id: "extreme-multi-sport-back-guard", image: sports, name: "Extreme Sports Back Guard", description: "Versatile protection for skateboarding, BMX, and parkour" },
    { id: "extreme-wrist-guards", image: sports, name: "Extreme Sports Wrist Guards", description: "Heavy-duty protection for high-impact activities" },
    { id: "extreme-shin-guards", image: sports, name: "Extreme Sports Shin Guards", description: "Lightweight construction with maximum coverage area" },
  ],
  "textile-garment-water-sports": [
    { id: "water-impact-vest", image: sports, name: "Water Sports Impact Vest", description: "Buoyant protection for wakeboarding and kitesurfing" },
    { id: "water-knee-pads", image: sports, name: "Water Sports Knee Pads", description: "Neoprene construction with drainage system" },
    { id: "water-ankle-support", image: sports, name: "Water Sports Ankle Support", description: "Water-resistant stabilizing protection" },
  ],
};

interface ProductItem {
  id: string;
  name: string;
  image: string;
  subcategory?: string;
  description?: string;
}

interface Props {
  lang: Language;
  category: string;
  subcategory?: string;
  products?: ProductItem[];
  allCategories?: string[];
}

interface SidebarProps extends Props {
  isOpen?: boolean;
  onClose?: () => void;
}

function Sidebar({lang, category, subcategory, isOpen, onClose}: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<string[]>(() => {
    // 默认展开当前选中的分类
    return category ? [category] : [];
  });

  const toggleCategory = (path: string) => {
    setOpenCategories(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <aside className={`
        fixed inset-y-0 lg:top-16 left-0 z-50 lg:z-30
        w-64 bg-card border-r border-border 
        transform transition-transform duration-300 ease-in-out
        lg:transform-none lg:h-[calc(100vh-4rem)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <nav className="h-full overflow-y-auto p-6 pt-20 lg:pt-6">
          {/* 移动端关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted lg:hidden"
            aria-label="关闭菜单"
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-lg font-semibold text-foreground mb-4">产品分类</h2>
          <ul className="space-y-1">
            {categories.map((item) => {
              const isOpen = openCategories.includes(item.path);
              const isActive = item.path === category;

              return (
                <li key={item.path}>
                  <Collapsible open={isOpen} onOpenChange={() => toggleCategory(item.path)}>
                    <CollapsibleTrigger className="w-full group">
                      <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}>
                        <span>{item.title}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1">
                      <ul className="ml-4 space-y-1 border-l-2 border-border pl-2">
                        {item.children.map((child) => {
                          const isChildActive = child.path === subcategory && isActive;
                          return (
                            <li key={child.path}>
                              <a
                                href={getLocalizedPath(`/products/${item.path}/${child.path}`, lang)}
                                className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                  isChildActive
                                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                                onClick={onClose}
                              >
                                {child.title}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

const ProductCategory = ({lang, category, subcategory, products: dynamicProducts = [], allCategories = []}: Props) => {
  const {t} = useTranslations(lang);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 如果有动态产品数据，使用动态数据；否则使用静态数据
  const useStaticData = dynamicProducts.length === 0;

  // 构建产品key: "category-subcategory"
  const productKey = subcategory ? `${category}-${subcategory}` : null;
  const staticProducts = productKey ? (productsByCategory[productKey] || []) : [];

  // 过滤动态产品（如果有子分类）
  const filteredDynamicProducts = subcategory 
    ? dynamicProducts.filter(p => p.subcategory === subcategory)
    : dynamicProducts;

  const currentCategory = categories.find((cat) => cat.path === category);
  const currentSubcategory = currentCategory?.children.find((child) => child.path === subcategory);

  // 使用动态或静态产品数据
  const displayProducts = useStaticData ? staticProducts : filteredDynamicProducts.map(p => ({
    id: p.id,
    image: p.image,
    name: p.name,
    description: p.description || `High-quality ${p.name.toLowerCase()} for maximum protection`,
  }));

  return (
    <div className="min-h-screen">
      <Sidebar 
        category={category} 
        subcategory={subcategory}
        lang={lang}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="pt-16 lg:pl-64 bg-gradient-to-b from-background via-muted/20 to-background min-h-screen">
        {/* 移动端菜单按钮 */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-16 left-4 z-20 p-2 bg-card border border-border rounded-lg shadow-lg lg:hidden hover:bg-muted transition-colors"
          aria-label="打开菜单"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Title with Breadcrumb */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{currentCategory?.title || "Products"}</span>
              {currentSubcategory && (
                <>
                  <span>/</span>
                  <span className="text-foreground font-medium">{currentSubcategory.title}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {currentSubcategory?.title || currentCategory?.title || "Protector Products"}
            </h1>
          </div>

          {/* Product Grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 max-w-7xl">
              {displayProducts.map((product, index) => (
                <a
                  key={index}
                  href={`/products/${product.id}`}
                  className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50 block"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">请从侧边栏选择一个子分类查看产品</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductCategory;
