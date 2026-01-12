"use client";

import {
  FileImage,
  Database,
  Code2,
  Squirrel,
  Paintbrush,
  Type,
  ExternalLink,
  Hotel,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HotelBookingCard() {
  const { t } = useTranslation("hotelbooking");

  return (
    <div className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Hotel className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          {t("title")}
        </h3>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p dangerouslySetInnerHTML={{ __html: t("description") }}></p>

          <ul className="space-y-2 pl-1">
            <li className="flex items-start gap-2">
              <FileImage className="w-4 h-4 text-purple-700 mt-1" />
              {t("features.cloudinary")}
            </li>
            <li className="flex items-start gap-2">
              <Database className="w-4 h-4 text-green-700 mt-1" />
              {t("features.mongodb")}
            </li>
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 text-black mt-1" />
              {t("features.nextjs")}
            </li>
            <li className="flex items-start gap-2">
              <Squirrel className="w-4 h-4 text-orange-500 mt-1" />
              {t("features.redux")}
            </li>
            <li className="flex items-start gap-2">
              <Paintbrush className="w-4 h-4 text-blue-500 mt-1" />
              {t("features.tailwind")}
            </li>
            <li className="flex items-start gap-2">
              <Type className="w-4 h-4 text-blue-900 mt-1" />
              {t("features.typescript")}
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://khem-room-book.netlify.app/"
            className="inline-flex items-center gap-1 text-sm font-medium text-aws-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("viewLive")} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
