
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './en.json';
import translationFR from './fr.json';
import { Language } from "./Language";
 

 // the translations
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};
 
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: JSON.parse(localStorage.getItem("up"))?.user?.lang || Language.EN,
 
    keySeparator: ".",  // to support nested translations
 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
 
  export default i18n;