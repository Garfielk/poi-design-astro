import en from './locales/en.ts'
import zhCN from './locales/zh-CN.ts'

export const languages = {
  en: 'English',
  'zh-CN': '简体中文',
} as const

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export const translations = {
  en,
  'zh-CN': zhCN,
} as const

export type TranslationKeys = typeof en;
