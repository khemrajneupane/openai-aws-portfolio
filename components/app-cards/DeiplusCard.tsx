"use client";
import { useTranslation } from "react-i18next";
import { Radio, Star, Clock, User, ExternalLink, Podcast } from "lucide-react";

export default function DeiplusCard() {
  const { t } = useTranslation("deiplus");

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Radio className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          {t("title")}
        </h3>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p
            dangerouslySetInnerHTML={{
              __html: t("description"),
            }}
          />

          <ul className="space-y-2 pl-1">
            <li className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-green-600" />
              {t("features.radio")}
            </li>
            <li className="flex items-center gap-2">
              <Podcast className="w-4 h-4 text-green-600" />
              {t("features.podcast")}
            </li>
            <li className="flex items-center gap-2">
              <User className="w-4 h-4 text-aws-orange" />
              {t("features.user")}
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              {t("features.favourites")}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              {t("features.history")}
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://deiplus.fi/"
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
