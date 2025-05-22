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

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 px-4 bg-gradient-to-br from-white via-purple-50 to-purple-100 rounded-3xl shadow-amber-900">
        <h1 className="text-5xl font-extrabold text-aws-dark mb-6 tracking-tight drop-shadow-sm">
          <span className="inline-flex items-center gap-2">
            <UserCheck className="w-8 h-8 text-purple-600 animate-pulse" />
            Myself
          </span>
        </h1>

        <div className="text-lg text-gray-700 max-w-3xl mx-auto space-y-4 leading-relaxed">
          {/*<p className="flex items-center justify-center gap-2">
            <Code className="w-5 h-5 text-aws-orange" />
            React.js, Next.js, TypeScript, Node.js, Express.js, TailwindCSS,
            Python, Flask
          </p>
          <p className="flex items-center justify-center gap-2">
            <Database className="w-5 h-5 text-aws-orange" />
            MongoDB, MariaDB, DynamoDB, OpenAI, Socket.IO
          </p>
          <p className="flex items-center justify-center gap-2">
            <Layers className="w-5 h-5 text-aws-blue" />
            Full Stack Development, Software Engineering
          </p>
          <p className="flex items-center justify-center gap-2">
            <Cloud className="w-5 h-5 text-aws-blue" />
            AWS CDK, AWS Amplify, Lambda
          </p>*/}
          {/* <div className="border-2 border-dashed border-purple-600 p-6 rounded-lg max-w-fit mx-auto mt-10 shadow-md">
            <div className="text-center font-semibold text-lg mb-4">
              React.js, Next.js, TypeScript, Node.js, Express.js, TailwindCSS,
              Python, Flask
            </div>
            <div className="text-center text-base mb-4">
              MongoDB, MariaDB, DynamoDB, OpenAI, Socket.IO
            </div>
            <div className="text-center text-sm text-gray-700">
              Full Stack Development, Software Engineering
              <br />
              Lorem Ipsum Lorem Ipsum Lorem
            </div>
          </div>*/}
          <div className="relative mx-auto mt-10 p-8 rounded-[1%] bg-gradient-to-r from-purple-200 to-blue-200 animate-pulse shadow-lg">
            <div className="text-center text-gray-800">
              <p className="flex items-center justify-center gap-2">
                <Code className="w-5 h-5 text-aws-orange" />
                React.js, Next.js, TypeScript, Node.js, Express.js, TailwindCSS,
                Python, Flask
              </p>
              <p className="flex items-center justify-center gap-2">
                <Database className="w-5 h-5 text-aws-orange" />
                MongoDB, MariaDB, DynamoDB, OpenAI, Socket.IO
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
          </div>
          <motion.div
            animate={{
              y: [0, -10, 0, 10, 0],
              x: [0, 5, 0, -5, 0],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="bg-gradient-to-br from-blue-200 to-purple-300 rounded-[1%] p-10 shadow-2xl"
          >
            <div className="text-center text-gray-800">
              <p className="italic font-medium text-gray-600 mt-4">
                A passionate and dedicated Full-Stack Developer with over{" "}
                <span className="text-purple-700 font-semibold">4 years</span>{" "}
                of professional experience, building high-quality web
                applications.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="aws-services" className="py-8">
        <h2 className="text-3xl font-bold text-aws-dark mb-8 text-center">
          Client Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IlkkaPohjalainenCard />
          <DeiplusCard />
          <MediaToolsCard />
        </div>
      </section>

      <section id="aws-services" className="py-8">
        <h2 className="text-3xl font-bold text-aws-dark mb-8 text-center">
          Personal Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HotelBookingCard />
          <FamilyMeetUpCard />
          <LibraryManagementCard />
          <FreeDaysCard />
        </div>
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
