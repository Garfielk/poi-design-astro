import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Language } from "@/i18n/config.ts";
import { getLocalizedPath, useTranslations } from "@/i18n/utils.ts";

type CategoryTreeNode = {
  id: string;
  name: string;
  children: Record<string, CategoryTreeNode> | null;
};

interface ProductItem {
  id: string;
  name: string;
  image: string;
  parent: string;
  subcategory?: string;
  description?: string;
}

interface Props {
  lang: Language;
  category: string;
  products?: ProductItem[];
  categoryTree?: Record<string, CategoryTreeNode>;
}

interface SidebarProps {
  lang: Language;
  parentEntries: Array<[string, CategoryTreeNode]>;
  selectedCategory?: string | null;
  activeParentKey?: string | null;
  openParentKey?: string | null;
  onParentToggle: (parentKey: string, nextOpen: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLDivElement> | null;
}

const PRIMARY_CATEGORY_ORDER = ["Poi Products", "Partner Brands"] as const;

const getOrderedParentEntries = (
  categoryTree: Record<string, CategoryTreeNode>,
  lang: Language,
) => {
  const orderMap = new Map<string, number>(
    PRIMARY_CATEGORY_ORDER.map((category, index) => [category.toLowerCase(), index]),
  );
  const collator = new Intl.Collator(lang === "zh-CN" ? "zh-CN" : "en", {
    sensitivity: "base",
    usage: "sort",
  });

  return Object.entries(categoryTree).sort(([keyA], [keyB]) => {
    const normalizedA = keyA.toLowerCase();
    const normalizedB = keyB.toLowerCase();
    const orderA = orderMap.get(normalizedA);
    const orderB = orderMap.get(normalizedB);

    if (orderA !== undefined && orderB !== undefined) {
      return orderA - orderB;
    }

    if (orderA !== undefined) {
      return -1;
    }

    if (orderB !== undefined) {
      return 1;
    }

    return collator.compare(keyA, keyB);
  });
};

const Sidebar = ({
  lang,
  parentEntries,
  selectedCategory,
  activeParentKey,
  openParentKey,
  onParentToggle,
  isOpen,
  onClose,
  containerRef,
}: SidebarProps) => {
  const [sidebarLeft, setSidebarLeft] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateSidebarPosition = () => {
      if (!mediaQuery.matches) {
        setSidebarLeft(null);
        return;
      }

      const containerElement = containerRef?.current;
      if (!containerElement) {
        return;
      }

      const rect = containerElement.getBoundingClientRect();
      setSidebarLeft(rect.left + window.scrollX);
    };

    updateSidebarPosition();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateSidebarPosition);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(updateSidebarPosition);
    }

    window.addEventListener("resize", updateSidebarPosition);

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateSidebarPosition);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(updateSidebarPosition);
      }

      window.removeEventListener("resize", updateSidebarPosition);
    };
  }, [containerRef]);

  const sidebarTitle = lang === "zh-CN" ? "产品分类" : "Product Categories";
  const sidebarStyle = sidebarLeft !== null ? { left: sidebarLeft } : undefined;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:inset-auto lg:top-1/2 lg:z-40 lg:w-64 lg:translate-x-0 lg:-translate-y-1/2
          lg:border lg:border-border lg:bg-card lg:rounded-2xl lg:shadow-sm
          lg:max-h-[calc(100vh-4rem)] lg:overflow-hidden
        `}
        style={sidebarStyle}
      >
        <nav className="flex h-full flex-col overflow-y-auto p-6 pt-20 lg:pt-6 lg:pb-6 lg:pr-2 lg:max-h-[calc(100vh-4rem)]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted lg:hidden"
            aria-label={lang === "zh-CN" ? "关闭菜单" : "Close menu"}
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-lg font-semibold text-foreground mb-4">{sidebarTitle}</h2>

          <ul className="space-y-1">
            {parentEntries.map(([parentKey, node]) => {
              const childEntries = Object.entries(node.children ?? {});
              const hasChildren = childEntries.length > 0;
              const isExpanded = openParentKey === parentKey;
              const isParentActive =
                activeParentKey === parentKey || selectedCategory === parentKey;

              const parentClasses = isParentActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted";

              if (!hasChildren) {
                const targetHref = getLocalizedPath(`/products/${encodeURIComponent(parentKey)}`, lang);
                return (
                  <li key={parentKey}>
                    <a
                      href={targetHref}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${parentClasses}`}
                      onClick={onClose}
                    >
                      <span>{node.name || parentKey}</span>
                    </a>
                  </li>
                );
              }

              return (
                <li key={parentKey}>
                  <Collapsible
                    open={isExpanded}
                    onOpenChange={(open) => onParentToggle(parentKey, open)}
                  >
                    <CollapsibleTrigger className="w-full group">
                      <div
                        className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${parentClasses}`}
                      >
                        <span>{node.name || parentKey}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1">
                      <ul className="ml-4 space-y-1 pl-2">
                        {childEntries.map(([childKey, childNode]) => {
                          const isChildActive = childKey === selectedCategory;
                          const childHref = getLocalizedPath(
                            `/products/${encodeURIComponent(childKey)}`,
                            lang,
                          );

                          return (
                            <li key={childKey}>
                              <a
                                href={childHref}
                                className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                  isChildActive
                                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                                onClick={onClose}
                              >
                                {childNode.name || childKey}
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
};

const ProductCategory = ({
  lang,
  category,
  products = [],
  categoryTree = {},
}: Props) => {
  const { t } = useTranslations(lang);
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    selectedParentKey,
    selectedChildKey,
    selectedParentNode,
    selectedChildNode,
  } = useMemo(() => {
    let parentKeyMatch: string | null = null;
    let childKeyMatch: string | null = null;
    let parentNodeMatch: CategoryTreeNode | null = null;
    let childNodeMatch: CategoryTreeNode | null = null;

    for (const [parentKey, node] of Object.entries(categoryTree)) {
      if (parentKey === category) {
        parentKeyMatch = parentKey;
        parentNodeMatch = node;
        break;
      }

      for (const [childKey, childNode] of Object.entries(node.children ?? {})) {
        if (childKey === category) {
          parentKeyMatch = parentKey;
          parentNodeMatch = node;
          childKeyMatch = childKey;
          childNodeMatch = childNode;
          break;
        }
      }

      if (childKeyMatch) {
        break;
      }
    }

    return {
      selectedParentKey: parentKeyMatch,
      selectedChildKey: childKeyMatch,
      selectedParentNode: parentNodeMatch,
      selectedChildNode: childNodeMatch,
    };
  }, [categoryTree, category]);

  const orderedParentEntries = useMemo(
    () => getOrderedParentEntries(categoryTree, lang),
    [categoryTree, lang],
  );

  const firstParentKey = orderedParentEntries[0]?.[0] ?? null;

  const activeParentKey = selectedParentKey ?? firstParentKey;
  const activeParentNode =
    selectedParentNode ??
    (activeParentKey ? categoryTree[activeParentKey] : undefined) ??
    null;
  const activeChildNode = selectedChildNode ?? null;

  const [openParentKey, setOpenParentKey] = useState<string | null>(activeParentKey);

  useEffect(() => {
    setOpenParentKey(activeParentKey ?? null);
  }, [activeParentKey]);

  const normalizedProducts = useMemo(
    () =>
      (products ?? []).map((product) => ({
        ...product,
        description:
          product.description ?? product.subcategory ?? product.parent ?? "",
      })),
    [products],
  );

  const breadcrumbParentLabel = activeParentNode?.name ?? t.nav.products;
  const breadcrumbChildLabel = activeChildNode?.name ?? selectedChildKey ?? "";
  const pageTitle =
    activeChildNode?.name ?? activeParentNode?.name ?? t.nav.products;
  const emptyStateMessage =
    lang === "zh-CN"
      ? "请从侧边栏选择一个分类查看产品"
      : "Select a category from the sidebar to view products.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="pt-16 lg:pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={layoutRef}
            className="relative lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10"
          >
            <Sidebar
              lang={lang}
              parentEntries={orderedParentEntries}
              selectedCategory={category}
              activeParentKey={activeParentKey}
              openParentKey={openParentKey}
              onParentToggle={(parentKey, open) => {
                setOpenParentKey(open ? parentKey : null);
              }}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              containerRef={layoutRef}
            />

            <main className="relative lg:col-start-2 lg:flex lg:flex-col lg:min-h-[calc(100vh-8rem)] lg:overflow-hidden py-8 lg:py-12">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed top-16 left-4 z-20 p-2 bg-card border border-border rounded-lg shadow-lg lg:hidden hover:bg-muted transition-colors"
                aria-label={lang === "zh-CN" ? "打开菜单" : "Open menu"}
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="mb-6 lg:mb-8 shrink-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{breadcrumbParentLabel}</span>
                  {breadcrumbChildLabel && (
                    <>
                      <span>/</span>
                      <span className="text-foreground font-medium">
                        {breadcrumbChildLabel}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {pageTitle}
                </h1>
              </div>

              <div className="flex-1 lg:overflow-y-auto lg:pr-2">
                {normalizedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 max-w-7xl pb-6 lg:pb-8">
                    {normalizedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50"
                      >
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">{emptyStateMessage}</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
