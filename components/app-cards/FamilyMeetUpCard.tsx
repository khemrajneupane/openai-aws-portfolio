"use client";
import {
  ImagePlus,
  Upload,
  UserCheck,
  FileImage,
  AlertCircle,
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
              {t("features.secureVoting")}
            </li>
            <li className="flex items-start gap-2">
              <Upload className="w-4 h-4 text-aws-orange mt-1" />
              {t("features.backendProtection")}
            </li>
            <li className="flex items-start gap-2">
              <UserCheck className="w-4 h-4 text-aws-dark mt-1" />
              {t("features.realTimeResults")}
            </li>
            <li className="flex items-start gap-2">
              <FileImage className="w-4 h-4 text-purple-700 mt-1" />
              {t("features.newsAggregation")}
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-1" />
              {t("features.performanceDeployment")}
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4">
          <a
            href="https://votenepal.netlify.app/"
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
