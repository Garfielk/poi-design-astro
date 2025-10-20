import {defaultLang, type Language, translations, languages} from './config.ts'

// 生成带有语言前缀的路径
export function getLocalizedPath(path: string, lang: Language = defaultLang): string {
  // 确保路径以 / 开头
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // 如果是默认语言（英语），直接返回路径
  if (lang === defaultLang) {
    return cleanPath;
  }

  // 其他语言添加语言前缀
  return `/${lang}${cleanPath}`;
}

// 获取待切换的语言（非当前语言）
export function getAlternateLanguage(currentLang: Language): Language {
  const allLanguages = Object.keys(languages) as Language[];
  return allLanguages.find(lang => lang !== currentLang) || defaultLang;
}

// 获取语言切换的 URL（基于当前路径）
export function getLanguageSwitchUrl(currentPath: string, currentLang: Language): string {
  const targetLang = getAlternateLanguage(currentLang);
  return getAlternatePath(currentPath, targetLang);
}

export function getAlternatePath(pathname: string, targetLang: string) {
  const defaultLocale = 'en';
  const locales = ['en', 'zh-CN'];

  // 从路径提取现有语言前缀
  const currentPrefix = locales.find((l) =>
    pathname.startsWith(`/${l}`)
  );

  let cleanPath = pathname;
  if (currentPrefix && currentPrefix !== defaultLocale) {
    cleanPath = pathname.replace(`/${currentPrefix}`, '');
  }

  if (targetLang === defaultLocale) return cleanPath || '/';
  return `/${targetLang}${cleanPath}`;
}

// 获取翻译文本
export function getTranslations(lang: Language = defaultLang) {
  return translations[lang] || translations[defaultLang];
}

// 类型安全的翻译函数
export function useTranslations(lang: Language = defaultLang) {
  const t = getTranslations(lang);

  return {
    t,
    lang,
  };
}
