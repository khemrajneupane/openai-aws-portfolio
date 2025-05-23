"use client";

import {
  Radio,
  ExternalLink,
  CalendarDays,
  Users,
  CheckCircle,
  LogIn,
} from "lucide-react";
import { useTranslation, Trans } from "next-i18next";

export default function FreeDaysCard() {
  const { t } = useTranslation("freedays");

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Radio className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          {t("freedays.title")}
        </h3>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <Trans
              t={t}
              i18nKey="freedays.description"
              components={[
                <strong key="0" />,
                <strong key="1" />,
                <strong key="2" />,
                <strong key="3" />,
                <strong key="5" />,
              ]}
            />
          </p>

          <ul className="space-y-2 pl-1">
            <li className="flex items-center gap-2">
              <LogIn className="w-4 h-4 text-emerald-600" />
              {t("freedays.features.login")}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-indigo-500" />
              {t("freedays.features.calendar")}
            </li>
            <li className="flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-500" />
              {t("freedays.features.stats")}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              {t("freedays.features.tech")}
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://hamro-pariwar.vercel.app/"
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
