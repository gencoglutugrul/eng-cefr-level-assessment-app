import { useLocales } from "expo-localization";
import { englishTranslations } from "../translations/en";
import { turkishTranslations } from "../translations/tr";

const supportedLocales = ["en", "tr"] as const;

type SupportedLanguageCode = (typeof supportedLocales)[number];

export const useTranslation = () => {
  const languageCode = getLanguageCode();

  return {
    t: (translationKey: TranslationKey) => {
      return getTranslationForKeyAndLanguage(translationKey, languageCode);
    },
    languageCode,
  };
};

const getLanguageCode = (): SupportedLanguageCode => {
  const [locale, _rest] = useLocales();
  const languageCode = locale.languageCode || "en";

  if (supportedLocales.includes(languageCode as any)) {
    return languageCode as SupportedLanguageCode;
  }

  return "en";
};

const getTranslationForKeyAndLanguage = (
  translationKey: TranslationKey,
  _languageCode: SupportedLanguageCode
) => {
  const translations: Record<SupportedLanguageCode, Record<string, string>> = {
    en: englishTranslations,
    tr: turkishTranslations,
  };

  return translations["tr"][translationKey];
};

type TranslationKey = keyof typeof englishTranslations;
