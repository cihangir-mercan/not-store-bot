import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslations from "./locales/en/translation.json"
import trTranslations from "./locales/tr/translation.json"

i18n.use(initReactI18next)
void i18n.init({
  resources: {
    en: { translation: enTranslations },
    tr: { translation: trTranslations },
  },
  fallbackLng: "en",
  lng: "en",
  interpolation: { escapeValue: false },
})

export default i18n
