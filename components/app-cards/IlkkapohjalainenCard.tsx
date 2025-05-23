"use client";

import {
  Newspaper,
  Globe,
  BookmarkCheck,
  MessageCircleHeart,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { useTranslation, Trans } from "next-i18next";

export default function IlkkaPohjalainenCard() {
  const { t } = useTranslation("ilkkapohjalainen");

  return (
    <div className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Newspaper className="text-white w-5 h-5" />
        <h1 className="text-lg font-semibold text-white transition-colors duration-200">
          {t("ilkkapohjalainen.heading")}
        </h1>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <Trans
              i18nKey="description"
              t={t}
              components={{ strong: <strong className="text-gray-900" /> }}
            />
          </p>
          <ul className="space-y-2 pl-1">
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-600" />
              {t("ilkkapohjalainen.features.login")}
            </li>
            <li className="flex items-center gap-2">
              <MessageCircleHeart className="w-4 h-4 text-pink-500" />
              {t("ilkkapohjalainen.features.comments")}
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-aws-blue" />
              {t("ilkkapohjalainen.features.analytics")}
            </li>
            <li className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              {t("ilkkapohjalainen.features.bookmarking")}
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://ilkkapohjalainen.fi/"
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
