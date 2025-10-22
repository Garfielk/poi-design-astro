import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import enLocale from '@/i18n/locales/en';
import zhLocale from '@/i18n/locales/zh-CN';

const STORAGE_KEY = 'i18n-editor-translations';

type LocaleLanguage = 'en' | 'zh-CN';
type LocaleValue = string | LocaleValue[] | { [key: string]: LocaleValue };
type LocaleRoot = { [key: string]: LocaleValue };

interface TranslationState {
  en: LocaleRoot;
  'zh-CN': LocaleRoot;
}

const defaultLocales: TranslationState = {
  en: enLocale as unknown as LocaleRoot,
  'zh-CN': zhLocale as unknown as LocaleRoot,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeLocaleValue = (base: LocaleValue, override: unknown): LocaleValue => {
  if (typeof base === 'string') {
    return typeof override === 'string' ? override : base;
  }

  if (Array.isArray(base)) {
    const overrideArray = Array.isArray(override) ? override : [];
    return base.map((item, index) =>
      mergeLocaleValue(item, overrideArray[index]),
    );
  }

  if (isRecord(base)) {
    const result: Record<string, LocaleValue> = {};
    const overrideRecord = isRecord(override) ? override : {};

    for (const key of Object.keys(base)) {
      result[key] = mergeLocaleValue(
        (base as Record<string, LocaleValue>)[key],
        overrideRecord[key],
      );
    }

    return result;
  }

  return base;
};

const mergeLocales = (base: LocaleRoot, override: unknown): LocaleRoot =>
  mergeLocaleValue(base, override) as LocaleRoot;

const setLocaleValue = (
  value: LocaleValue,
  path: (string | number)[],
  next: string,
): LocaleValue => {
  if (!path.length) {
    return next;
  }

  const [current, ...rest] = path;

  if (Array.isArray(value)) {
    const index = typeof current === 'number' ? current : Number(current);
    return value.map((item, itemIndex) =>
      itemIndex === index ? setLocaleValue(item, rest, next) : item,
    ) as LocaleValue[];
  }

  if (isRecord(value)) {
    const key = String(current);
    const source = value as Record<string, LocaleValue>;
    const updated: Record<string, LocaleValue> = {};

    for (const [entryKey, entryValue] of Object.entries(source)) {
      updated[entryKey] = entryKey === key
        ? setLocaleValue(entryValue, rest, next)
        : entryValue;
    }

    return updated;
  }

  return value;
};

const formatSegment = (segment: string | number | undefined): string => {
  if (typeof segment === 'number') {
    return `[${segment}]`;
  }

  return segment ?? '';
};

const formatPath = (path: (string | number)[]): string =>
  path.reduce<string>((acc, segment, index) => {
    if (typeof segment === 'number') {
      return `${acc}[${segment}]`;
    }

    return index === 0 ? segment : `${acc}.${segment}`;
  }, '');

const pathKey = (path: (string | number)[]): string =>
  path.map((segment) => (typeof segment === 'number' ? `#${segment}` : segment)).join('|');

const identifierRegex = /^[$A-Z_][0-9A-Z_$]*$/i;

const serializeString = (value: string): string => {
  const jsonString = JSON.stringify(value);
  const body = jsonString.slice(1, -1).replace(/'/g, "\\'");
  return `'${body}'`;
};

const indent = (depth: number): string => '  '.repeat(depth);

const serializeValue = (value: LocaleValue, depth: number): string => {
  if (typeof value === 'string') {
    return serializeString(value);
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return '[]';
    }

    const items = value
      .map((item) => `${indent(depth + 1)}${serializeValue(item, depth + 1)}`)
      .join(',\n');

    return `[\n${items}\n${indent(depth)}]`;
  }

  if (isRecord(value)) {
    const entries = Object.entries(value as Record<string, LocaleValue>);

    if (!entries.length) {
      return '{}';
    }

    const lines = entries.map(([key, entryValue]) => {
      const printableKey = identifierRegex.test(key) ? key : serializeString(key);
      return `${indent(depth + 1)}${printableKey}: ${serializeValue(entryValue, depth + 1)}`;
    });

    return `{
${lines.join(',\n')}
${indent(depth)}}`;
  }

  return 'null';
};

const createLocaleFile = (data: LocaleRoot): string =>
  `export default ${serializeValue(data, 0)} as const;\n`;

const buildCrcTable = (): Uint32Array => {
  const table = new Uint32Array(256);

  for (let i = 0; i < 256; i += 1) {
    let crc = i;

    for (let j = 0; j < 8; j += 1) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xedb88320;
      } else {
        crc >>>= 1;
      }
    }

    table[i] = crc >>> 0;
  }

  return table;
};

const CRC_TABLE = buildCrcTable();

const crc32 = (data: Uint8Array): number => {
  let crc = 0xffffffff;

  for (let i = 0; i < data.length; i += 1) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ data[i]) & 0xff];
  }

  return (crc ^ 0xffffffff) >>> 0;
};

const concatUint8Arrays = (arrays: Uint8Array[]): Uint8Array => {
  const length = arrays.reduce((total, current) => total + current.length, 0);
  const combined = new Uint8Array(length);
  let offset = 0;

  for (const array of arrays) {
    combined.set(array, offset);
    offset += array.length;
  }

  return combined;
};

const getDosDateTime = (date: Date): { dosDate: number; dosTime: number } => {
  const year = Math.max(date.getFullYear(), 1980) - 1980;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  const dosDate = (year << 9) | (month << 5) | day;
  const dosTime = (hours << 11) | (minutes << 5) | seconds;

  return { dosDate, dosTime };
};

const createZip = (files: { name: string; content: string }[]): Blob => {
  const textEncoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;
  const now = new Date();
  const { dosDate, dosTime } = getDosDateTime(now);

  for (const file of files) {
    const nameBytes = textEncoder.encode(file.name);
    const dataBytes = textEncoder.encode(file.content);
    const fileCrc = crc32(dataBytes);
    const size = dataBytes.length;

    const localHeader = new Uint8Array(30);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, dosTime, true);
    localView.setUint16(12, dosDate, true);
    localView.setUint32(14, fileCrc, true);
    localView.setUint32(18, size, true);
    localView.setUint32(22, size, true);
    localView.setUint16(26, nameBytes.length, true);
    localView.setUint16(28, 0, true);

    const localPart = concatUint8Arrays([localHeader, nameBytes, dataBytes]);
    localParts.push(localPart);

    const centralHeader = new Uint8Array(46);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, dosTime, true);
    centralView.setUint16(14, dosDate, true);
    centralView.setUint32(16, fileCrc, true);
    centralView.setUint32(20, size, true);
    centralView.setUint32(24, size, true);
    centralView.setUint16(28, nameBytes.length, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint16(36, 0, true);
    centralView.setUint32(38, 0, true);
    centralView.setUint32(42, offset, true);

    const centralPart = concatUint8Arrays([centralHeader, nameBytes]);
    centralParts.push(centralPart);

    offset += localPart.length;
  }

  const centralDirectoryOffset = offset;
  const centralDirectorySize = centralParts.reduce((total, part) => total + part.length, 0);

  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralDirectorySize, true);
  endView.setUint32(16, centralDirectoryOffset, true);
  endView.setUint16(20, 0, true);

  const bytes = concatUint8Arrays([...localParts, ...centralParts, endRecord]);

  return new Blob([bytes], { type: 'application/zip' });
};

interface SectionProps {
  title: string;
  pathLabel: string;
  level: number;
  children: ReactNode;
}

const Section = ({ title, pathLabel, level, children }: SectionProps) => (
  <details
    open
    className="rounded-xl border border-border bg-card shadow-sm"
    style={{ marginLeft: level === 0 ? 0 : level * 12 }}
  >
    <summary className="flex cursor-pointer select-none flex-col gap-0.5 px-4 py-3">
      <span className="text-base font-semibold text-foreground">{title}</span>
      <span className="font-mono text-xs text-gray-500">{pathLabel}</span>
    </summary>
    <div className="space-y-4 border-t border-border px-4 py-4">
      {children}
    </div>
  </details>
);

interface TranslationFieldProps {
  path: (string | number)[];
  segmentLabel: string;
  displayPath: string;
  englishValue: string;
  chineseValue: string;
  onValueChange: (
    lang: LocaleLanguage,
    path: (string | number)[],
    value: string,
  ) => void;
  onFieldBlur: () => void;
}

const TranslationField = ({
  path,
  segmentLabel,
  displayPath,
  englishValue,
  chineseValue,
  onValueChange,
  onFieldBlur,
}: TranslationFieldProps) => {
  const englishRows = Math.min(Math.max(englishValue.split('\n').length, 3), 12);
  const chineseRows = Math.min(Math.max(chineseValue.split('\n').length, 3), 12);

  return (
    <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">{segmentLabel}</span>
        <span className="font-mono text-xs text-gray-500">{displayPath}</span>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">English</span>
          <textarea
            className="w-full rounded-md border border-border bg-white p-3 text-sm leading-relaxed shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            value={englishValue}
            rows={englishRows}
            spellCheck={false}
            autoComplete="off"
            onChange={(event) => onValueChange('en', path, event.target.value)}
            onBlur={onFieldBlur}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">简体中文</span>
          <textarea
            className="w-full rounded-md border border-border bg-white p-3 text-sm leading-relaxed shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            value={chineseValue}
            rows={chineseRows}
            spellCheck={false}
            autoComplete="off"
            onChange={(event) => onValueChange('zh-CN', path, event.target.value)}
            onBlur={onFieldBlur}
          />
        </label>
      </div>
    </div>
  );
};

const I18nEditorPage = () => {
  const [translations, setTranslations] = useState<TranslationState | null>(null);
  const translationsRef = useRef<TranslationState | null>(null);
  const [loadWarning, setLoadWarning] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const saveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedRaw = window.localStorage.getItem(STORAGE_KEY);
    let stored: Partial<Record<LocaleLanguage, unknown>> | undefined;

    if (storedRaw) {
      try {
        const parsed = JSON.parse(storedRaw);
        stored = isRecord(parsed) ? (parsed as Partial<Record<LocaleLanguage, unknown>>) : undefined;
      } catch (error) {
        console.warn('Failed to parse stored i18n translations', error);
        setLoadWarning('检测到损坏的缓存数据，已加载默认翻译。');
      }
    }

    const initialState: TranslationState = {
      en: mergeLocales(defaultLocales.en, stored?.en),
      'zh-CN': mergeLocales(defaultLocales['zh-CN'], stored?.['zh-CN']),
    };

    setTranslations(initialState);
    translationsRef.current = initialState;
  }, []);

  useEffect(() => () => {
    if (saveTimeoutRef.current !== null) {
      window.clearTimeout(saveTimeoutRef.current);
    }
  }, []);

  const persistToLocalStorage = useCallback(() => {
    if (typeof window === 'undefined' || !translationsRef.current) {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(translationsRef.current),
      );

      if (saveTimeoutRef.current !== null) {
        window.clearTimeout(saveTimeoutRef.current);
      }

      setSaveStatus('saved');
      saveTimeoutRef.current = window.setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Failed to save translations to localStorage', error);
      setSaveStatus('error');
    }
  }, []);

  const handleValueChange = useCallback(
    (lang: LocaleLanguage, path: (string | number)[], nextValue: string) => {
      setTranslations((prev) => {
        if (!prev) {
          return prev;
        }

        const updatedLang = setLocaleValue(prev[lang], path, nextValue) as LocaleRoot;
        const nextState: TranslationState = { ...prev, [lang]: updatedLang };
        translationsRef.current = nextState;
        return nextState;
      });
    },
    [],
  );

  const handleExport = useCallback(() => {
    if (!translationsRef.current) {
      return;
    }

    const files = [
      { name: 'en.ts', content: createLocaleFile(translationsRef.current.en) },
      { name: 'zh-CN.ts', content: createLocaleFile(translationsRef.current['zh-CN']) },
    ];

    const blob = createZip(files);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'locales.zip';
    anchor.rel = 'noopener';
    anchor.click();
    URL.revokeObjectURL(url);
  }, []);

  const renderNode = (
    valueEn: LocaleValue,
    valueZh: LocaleValue | undefined,
    path: (string | number)[],
    level: number,
  ): ReactNode => {
    if (typeof valueEn === 'string') {
      const segmentLabel = formatSegment(path[path.length - 1]);
      const displayPath = formatPath(path);
      const zhValue = typeof valueZh === 'string' ? valueZh : '';

      return (
        <TranslationField
          key={pathKey(path)}
          path={path}
          segmentLabel={segmentLabel}
          displayPath={displayPath}
          englishValue={valueEn}
          chineseValue={zhValue}
          onValueChange={handleValueChange}
          onFieldBlur={persistToLocalStorage}
        />
      );
    }

    if (Array.isArray(valueEn)) {
      const zhArray = Array.isArray(valueZh) ? valueZh : [];
      const sectionLabel = formatSegment(path[path.length - 1]);
      const pathLabel = formatPath(path);

      return (
        <Section
          key={pathKey(path)}
          title={sectionLabel}
          pathLabel={pathLabel}
          level={level}
        >
          {valueEn.map((item, index) =>
            renderNode(item, zhArray[index], [...path, index], level + 1),
          )}
        </Section>
      );
    }

    if (isRecord(valueEn)) {
      const zhRecord = isRecord(valueZh) ? (valueZh as Record<string, LocaleValue>) : {};
      const sectionLabel = formatSegment(path[path.length - 1]);
      const pathLabel = formatPath(path);

      return (
        <Section
          key={pathKey(path)}
          title={sectionLabel}
          pathLabel={pathLabel}
          level={level}
        >
          {Object.entries(valueEn as Record<string, LocaleValue>).map(([key, child]) =>
            renderNode(child, zhRecord[key], [...path, key], level + 1),
          )}
        </Section>
      );
    }

    return null;
  };

  if (!translations) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted text-sm text-gray-600">
        正在加载翻译数据...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>i18n 翻译维护工具</CardTitle>
            <CardDescription>
              浏览器中保存的翻译将覆盖项目内的默认文案。编辑完成后，按导出按钮获取可直接替换的 en.ts 与 zh-CN.ts 文件。
            </CardDescription>
          </CardHeader>
          <CardAction className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
            {saveStatus === 'saved' && (
              <span className="text-xs font-medium text-emerald-600">已保存到浏览器</span>
            )}
            {saveStatus === 'error' && (
              <span className="text-xs font-medium text-red-500">保存失败，请检查浏览器存储空间。</span>
            )}
            <Button onClick={handleExport} className="w-full sm:w-auto">
              导出 ZIP
            </Button>
          </CardAction>
          <CardContent className="space-y-3">
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
              <li>页面会在输入框失焦后自动保存至浏览器的 LocalStorage。</li>
              <li>导出的文件结构与项目中的 <code>src/i18n/locales</code> 完全一致。</li>
              <li>无法增删字段，如需恢复默认翻译，可清除浏览器缓存数据。</li>
            </ul>
            {loadWarning && (
              <p className="text-sm text-amber-600">{loadWarning}</p>
            )}
            <p className="text-xs text-gray-400">存储键：{STORAGE_KEY}</p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {Object.entries(translations.en).map(([key, value]) =>
            renderNode(value, translations['zh-CN'][key], [key], 0),
          )}
        </div>
      </div>
    </div>
  );
};

export default I18nEditorPage;
