// src/i18n/utils.ts
import { translations, defaultLang, type SupportedLanguage, type TranslationDict } from './config'

// 创建翻译函数
export function useTranslations(lang: SupportedLanguage) {
  return function t(key: string, ...args: string[]): string {
    // Get translation text
    const translation = (translations[lang] as TranslationDict)[key] || (translations[defaultLang] as TranslationDict)[key] || key

    // Replace variables
    if (args.length > 0) {
      return args.reduce((text, arg, index) => {
        return text.replace(`$${index + 1}`, arg)
      }, translation)
    }

    return translation
  }
}

export function getAlternatePath(pathname: string, targetLang: string) {
  const defaultLocale = 'en';
  const locales = ['en', 'zh-CN', 'ja', 'fr'];

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
