"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function LanguageSwitcher({
  customClass,
  showLine,
}: {
  customClass?: string;
  showLine: boolean;
}) {
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
    <div className={`relative flex gap-3  ${customClass}`}>
      <Languages size={14} />
      <button
        onClick={() => changeLanguage("en")}
        className={i18nInstance.language === "en" ? "font-bold underline" : ""}
      >
        EN
      </button>
      {showLine && (
        <hr className="absolute top-2 left-14 h-4 rotate-14 w-0.5 bg-amber-50" />
      )}
      <button
        onClick={() => changeLanguage("fi")}
        className={i18nInstance.language === "fi" ? "font-bold underline" : ""}
      >
        FI
      </button>
    </div>
  );
}
