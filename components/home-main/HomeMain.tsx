"use client";
import DeiplusCard from "@/components/app-cards/DeiplusCard";
import IlkkaPohjalainenCard from "@/components/app-cards/IlkkapohjalainenCard";
import MediaToolsCard from "@/components/app-cards/MediaToolsCard";
import LibraryManagementCard from "@/components/app-cards/LibraryManagementCard";
import { motion } from "framer-motion";
import { Cloud, Code, Database, Layers, UserCheck } from "lucide-react";
import FamilyMeetUpCard from "@/components/app-cards/FamilyMeetUpCard";
import HotelBookingCard from "@/components/app-cards/HotelBookingCard";
import FreeDaysCard from "@/components/app-cards/FreeDaysCard";
import { useTranslation, Trans } from "next-i18next";
import SocketChat from "@/components/socket-chat/SocketChat";
import ReReadCard from "@/components/app-cards/ReReadCard";
import RagPipeline from "../rag-pipeline/RagPipeline";

export default function HomeMain() {
  const { t } = useTranslation("common");
  return (
    <div className="space-y-12 p-1 flex flex-col">
      <section className="text-center py-16 px-4 mt-40 bg-gradient-to-br from-white via-purple-50 to-purple-100 rounded-3xl shadow-amber-900">
        <h1 className="text-5xl font-extrabold text-aws-dark mb-6 tracking-tight drop-shadow-sm">
          <span className="inline-flex items-center gap-2">
            <UserCheck className="w-8 h-8 text-purple-600 animate-pulse" />
            {t("common.title")}
          </span>
        </h1>

        <div className="text-lg text-gray-700 max-w-3xl mx-auto space-y-4 leading-relaxed">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -15, 0, 15, 0],
              x: [0, 10, 0, -10, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
            }}
            className="bg-gradient-to-br from-blue-200 to-purple-300 rounded-[1%] p-10 shadow-2xl"
          >
            <div className="text-center text-gray-800">
              <p className="italic font-medium text-gray-600 mt-4">
                <Trans
                  i18nKey="common.intro"
                  t={t}
                  components={{
                    strong: <span className="text-purple-700 font-semibold" />,
                  }}
                />
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, 15, 0, -15, 0],
              x: [0, -15, 0, 15, 0],
              rotate: [0, -3, 0, 3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "easeInOut",
              opacity: { duration: 0.5, delay: 0.2 },
              scale: { duration: 0.5, delay: 0.2 },
            }}
            className="bg-gradient-to-br from-blue-200 to-purple-300 rounded-[1%] p-10 shadow-2xl"
          >
            <div className="text-center text-gray-800">
              <p className="flex items-center justify-center gap-2">
                <Code className="w-5 h-5 text-aws-orange" />
                ReactJS, NextJS, TypeScript, NodeJS, ExpressJS, TailwindCSS,
                Python, LLM, LangChain, AI-Agent, OpenAI, RAG Pipeline.
              </p>
              <p className="flex items-center justify-center gap-2">
                <Database className="w-5 h-5 text-aws-orange" />
                MongoDB, MariaDB, DynamoDB, Pinecone Vector DB, Socket.IO
              </p>
              <p className="flex items-center justify-center gap-2">
                <Layers className="w-5 h-5 text-aws-blue" />
                Full Stack Development, Software Engineering
              </p>
              <p className="flex items-center justify-center gap-2">
                <Cloud className="w-5 h-5 text-aws-blue" />
                AWS CDK, AWS Amplify, Lambda
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="aws-services" className="py-8">
        <h2 className="text-3xl font-bold text-aws-dark mb-8 text-center">
          {t("common.client")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IlkkaPohjalainenCard />
          <DeiplusCard />
          <MediaToolsCard />
        </div>
      </section>

      <section id="aws-services" className="py-8">
        <h2 className="text-3xl font-bold text-aws-dark mb-8 text-center">
          {t("common.personal")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReReadCard />
          <FamilyMeetUpCard />
          <HotelBookingCard />
          <FreeDaysCard />
          <SocketChat />
          <LibraryManagementCard />
        </div>
      </section>
      <section>
        <RagPipeline />
      </section>

      {/* <section id="chat" className="py-8">
        <h2 className="text-3xl font-bold text-aws-dark mb-8 text-center">
          AI Chat Demo
        </h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <ChatInterface />
        </div>
      </section> */}
    </div>
  );
}
