"use client";
import {
  ImagePlus,
  Upload,
  UserCheck,
  FileImage,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useTranslation, Trans } from "next-i18next";
export default function FamilyMeetUpCard() {
  const { t } = useTranslation("familymeetup");
  return (
    <div className="bg-white border border-aws-blue shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full rounded-t">
      <div className="bg-[#4e225d] px-4 py-3 flex items-center gap-2 border">
        <ImagePlus className="text-white w-5 h-5" />
        <h3 className="text-lg font-semibold text-white hover:text-[#9d50bb] transition-colors duration-200">
          {t("title")}
        </h3>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <Trans
              t={t}
              i18nKey="description"
              components={[
                <strong key="0" />,
                <strong key="1" />,
                <strong key="2" />,
              ]}
            />

            {/* A digital family album with open and users engaged chat, done in{" "}
            <strong>Next.js</strong>, <strong>Python</strong>,{" "}
            <strong>Flask</strong>, <strong>Socket.IO</strong>,{" "}
            <strong>OpenAI</strong>.*/}
          </p>
          <ul className="text-sm text-gray-600 mb-4 space-y-2">
            <li className="flex items-start gap-2">
              <ImagePlus className="w-4 h-4 text-aws-blue mt-1" />
              {t("features.gallery")}
            </li>
            <li className="flex items-start gap-2">
              <Upload className="w-4 h-4 text-aws-orange mt-1" />
              {t("features.upload")}
            </li>
            <li className="flex items-start gap-2">
              <UserCheck className="w-4 h-4 text-aws-dark mt-1" />
              {t("features.auth")}
            </li>
            <li className="flex items-start gap-2">
              <FileImage className="w-4 h-4 text-purple-700 mt-1" />
              {t("features.cloudinary")}
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600 mt-1" />
              {t("features.formatSupport")}
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-1" />
              {t("features.notifications")}
            </li>
            <li className="flex items-start gap-2">
              <UserCheck className="w-4 h-4 text-aws-blue mt-1" />
              {t("features.nextauth")}
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-aws-dark mt-1" />
              {t("features.session")}
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-pink-600 mt-1" />
              {t("features.chat")}
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4">
          <a
            href="https://pariwar-hamro.vercel.app/"
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
