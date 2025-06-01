// i18n.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import aboutEN from "../locales/en/about.json";
import aboutFI from "../locales/fi/about.json";
import commonEN from "../locales/en/common.json";
import commonFI from "../locales/fi/common.json";
import deiplusEN from "../locales/en/deiplus.json";
import deiplusFI from "../locales/fi/deiplus.json";
import freedaysEN from "../locales/en/freedays.json";
import freedaysFI from "../locales/fi/freedays.json";
import mediatoolsEN from "../locales/en/mediatools.json";
import mediatoolsFI from "../locales/fi/mediatools.json";
import hotelbookingEN from "../locales/en/hotelbooking.json";
import hotelbookingFI from "../locales/fi/hotelbooking.json";
import familymeetupEN from "../locales/en/familymeetup.json";
import familymeetupFI from "../locales/fi/familymeetup.json";
import ilkkapohjalainenEN from "../locales/en/ilkkapohjalainen.json";
import ilkkapohjalainenFI from "../locales/fi/ilkkapohjalainen.json";

import librarymanagementEN from "../locales/en/librarymanagement.json";
import librarymanagementFI from "../locales/fi/librarymanagement.json";

i18n
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "fi"],
    resources: {
      en: {
        deiplus: deiplusEN,
        ilkkapohjalainen: ilkkapohjalainenEN,
        familymeetup: familymeetupEN,
        freedays: freedaysEN,
        hotelbooking: hotelbookingEN,
        librarymanagement: librarymanagementEN,
        mediatools: mediatoolsEN,
        common: commonEN,
        about: aboutEN,
      },
      fi: {
        deiplus: deiplusFI,
        ilkkapohjalainen: ilkkapohjalainenFI,
        familymeetup: familymeetupFI,
        freedays: freedaysFI,
        hotelbooking: hotelbookingFI,
        librarymanagement: librarymanagementFI,
        mediatools: mediatoolsFI,
        common: commonFI,
        about: aboutFI,
      },
    },
    ns: [
      "deiplus",
      "ilkkapohjalainen",
      "freedays",
      "hotelbooking",
      "familymeetup",
      "librarymanagement",
      "mediatools",
      "common",
      "about",
    ],
    defaultNS: "deiplus",
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    react: {
      useSuspense: false, // Disable suspense for client-side rendering
    },
  });

export default i18n;
