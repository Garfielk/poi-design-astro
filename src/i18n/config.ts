import en from './locales/en.json'
import zh from './locales/zh.json'

export const languages = {
  en: 'English',
  zh: '中文',
}

export const defaultLang = 'en'

export type TranslationDict = {
  [key: string]: string
}

// 支持语言的类型
export type SupportedLanguage = keyof typeof translations

// Translation dictionary
export const translations: Record<string, TranslationDict> = {
  en,
  zh,
}
