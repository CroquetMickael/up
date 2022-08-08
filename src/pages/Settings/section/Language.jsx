import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "../../../i18n/Language";

const LanguageComponent = ({ user, setUser }) => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(user.lang);

  const changeLanguage = (test) => {
    let language = test.target.value;

    switch (language) {
      case Language.EN:
        setLang(Language.EN);
        i18n.changeLanguage(Language.EN);
        break;
      case Language.FR:
      default:
        setLang(Language.FR);
        i18n.changeLanguage(Language.FR);
        break;
    }

    setUser({ ...user, lang: language });
  };

  return (
    <div className="ml-6 mt-8">
      <h3 className="text-2xl text-white">{t('settings.Language.title')}</h3>
      <div className="flex gap-8 mt-4">
        <div className="flex gap-8 justify-center items-center">
          <div className="relative text-white flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                id="en"
                name="drone"
                value={Language.EN}
                onChange={changeLanguage}
                defaultChecked={lang === Language.EN}
              />
              <label for="en">English</label>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                id="fr"
                name="drone"
                value={Language.FR}
                onChange={changeLanguage}
                defaultChecked={lang === Language.FR}
              />
              <label for="fr">Français</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageComponent;
