import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import plUI from "./pl/UI.json";
import enUI from "./en/UI.json";
import plHomePage from "./pl/HomePage.json";
import enHomePage from "./en/HomePage.json";

export const LANGUAGE_STORAGE_KEY = "language";
export const SUPPORTED_LANGUAGES = ["pl", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const FALLBACK_LANGUAGE: SupportedLanguage = "pl";

function syncDocumentLanguage(language: string) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = language;
}

function cacheLanguage(language: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

const resources = {
  pl: { UI: plUI, HomePage: plHomePage },
  en: { UI: enUI, HomePage: enHomePage },
} as const;

const initialLanguage =
  typeof window === "undefined"
    ? FALLBACK_LANGUAGE
    : (window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ??
      window.navigator.language);

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: FALLBACK_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    ns: ["UI", "HomePage"],
    defaultNS: "UI",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
  .then(() => {
    const resolved =
      i18n.resolvedLanguage ?? i18n.language ?? FALLBACK_LANGUAGE;
    syncDocumentLanguage(resolved);
    cacheLanguage(resolved);
  });

i18n.on("languageChanged", () => {
  const resolved = i18n.resolvedLanguage ?? i18n.language ?? FALLBACK_LANGUAGE;
  cacheLanguage(resolved);
  syncDocumentLanguage(resolved);
});

export default i18n;
