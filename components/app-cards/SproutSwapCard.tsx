"use client";
import {
  Library,
  ExternalLink,
  Users,
  BookOpenCheck,
  PencilLine,
  Trash2,
  BookPlus,
  Code2,
  Database,
  FileText,
  Layers,
  Settings2,
  DollarSign,
  EuroIcon,
  Code,
  Image,
  LayoutDashboard,
  Leaf,
} from "lucide-react";
import { useTranslation } from "react-i18next";
export default function SproutSwapCard() {
  const { t } = useTranslation("librarymanagement");
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Leaf className="h-6 w-6 text-green-700" />
        <h3 className="text-lg font-semibold text-white transition-colors duration-200">
          {t("title")}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>{t("description")}</p>
          <ul className="space-y-2 pl-1 mt-3">
            <li className="flex items-start gap-2">
              <Code size={45} className=" text-purple-700 mt-1" />
              {t("auth")}
            </li>

            <li className="flex items-start gap-2">
              <LayoutDashboard size={18} className=" text-yellow-700 mt-1" />
              {t("dashboard")}
            </li>

            <li className="flex items-start gap-2">
              <Database size={30} className=" text-green-700 mt-1" />
              {t("inventory")}
            </li>
            <li className="flex items-start gap-2">
              <EuroIcon size={18} className=" text-blue-700 mt-1" />
              {t("payments")}
            </li>
            <li className="flex items-start gap-2">
              <Image size={18} className=" text-green-700 mt-1" />

              {t("media")}
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4">
          <a
            href="https://sproutandswap.vercel.app/"
            className="inline-flex items-center gap-1 text-sm font-medium text-aws-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("link")} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
