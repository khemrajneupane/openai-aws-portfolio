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
} from "lucide-react";
import { useTranslation } from "react-i18next";
export default function LibraryManagementCard() {
  const { t } = useTranslation("librarymanagement");
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border rounded-t">
        <Library className="text-white w-5 h-5" />
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
              <Users className="w-4 h-4 text-purple-700 mt-1" />
              {t("auth")}
            </li>
            <li className="flex items-start gap-2">
              <BookOpenCheck className="w-4 h-4 text-blue-600 mt-1" />
              {t("borrow")}
            </li>
            <li className="flex items-start gap-2">
              <BookPlus className="w-4 h-4 text-green-700 mt-1" />
              {t("add")}
            </li>
            <li className="flex items-start gap-2">
              <PencilLine className="w-4 h-4 text-yellow-600 mt-1" />
              {t("edit")}
            </li>
            <li className="flex items-start gap-2">
              <Trash2 className="w-4 h-4 text-red-600 mt-1" />
              {t("delete")}
            </li>
            <li className="flex items-start gap-2">
              <Code2 className="w-4 h-4 text-black mt-1" />
              {t("react")}
            </li>
            <li className="flex items-start gap-2">
              <Database className="w-4 h-4 text-green-700 mt-1" />
              {t("mongo")}
            </li>
            <li className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-600 mt-1" />
              {t("typescript")}
            </li>
            <li className="flex items-start gap-2">
              <Layers className="w-4 h-4 text-pink-500 mt-1" />
              {t("ui")}
            </li>
            <li className="flex items-start gap-2">
              <Settings2 className="w-4 h-4 text-indigo-600 mt-1" />
              {t("express")}
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4">
          <a
            href="https://library-management-project.netlify.app/"
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
