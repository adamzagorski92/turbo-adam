import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import plUI from "./src/i18n/pl/UI.json";
import plBlog from "./src/i18n/pl/Blog.json";

void i18n.use(initReactI18next).init({
  resources: {
    pl: { UI: plUI, Blog: plBlog },
  },
  lng: "pl",
  fallbackLng: "pl",
  ns: ["UI", "Blog"],
  defaultNS: "UI",
  interpolation: { escapeValue: false },
});
