"use client";

import {
  FileImage,
  Database,
  ExternalLink,
  BookIcon,
  Layers,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ReReadCard() {
  const { t } = useTranslation("reread");

  return (
    <div className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <BookIcon className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          {t("reread.heading")}
        </h3>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p dangerouslySetInnerHTML={{ __html: t("reread.description") }}></p>

          <ul className="space-y-2 pl-1">
            <li className="flex items-start gap-2">
              <FileImage size={50} className="text-purple-700 mt-1" />
              <p
                dangerouslySetInnerHTML={{
                  __html: t("reread.features.payment"),
                }}
              ></p>
            </li>
            <li className="flex items-start gap-2">
              <Database size={20} className=" text-green-700 mt-1" />
              <p
                dangerouslySetInnerHTML={{
                  __html: t("reread.features.storage"),
                }}
              ></p>
            </li>
            <li className="flex items-start gap-2">
              <Layers size={200} className=" text-green-700 mt-1" />
              <p
                dangerouslySetInnerHTML={{
                  __html: t("reread.techstack"),
                }}
              ></p>
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a
            href="https://re-read-books.vercel.app//"
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
