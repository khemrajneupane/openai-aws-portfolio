"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { i18n: i18nInstance } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const changeLanguage = (lng: string) => {
    i18nInstance.changeLanguage(lng);
  };

  if (!hydrated) return null; // or render a loading state

  return (
    <div className="flex gap-2">
      <Languages />
      <button
        onClick={() => changeLanguage("en")}
        className={i18nInstance.language === "en" ? "font-bold underline" : ""}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("fi")}
        className={i18nInstance.language === "fi" ? "font-bold underline" : ""}
      >
        FI
      </button>
    </div>
  );
}
