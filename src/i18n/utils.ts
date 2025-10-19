import {defaultLang, type Language, translations} from './config.ts'
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
