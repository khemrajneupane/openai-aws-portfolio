"use client";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Globe,
  Code,
  Palette,
  Languages,
  Lock,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const About = () => {
  const { t } = useTranslation("about");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const technologies = [
    { name: "Next.js 15", category: "Framework", icon: <Globe size={20} /> },
    { name: "TypeScript", category: "Language", icon: <Code size={20} /> },
    { name: "Tailwind CSS", category: "Styling", icon: <Palette size={20} /> },
    { name: "Framer Motion", category: "Animation", icon: <Zap size={20} /> },
    {
      name: "next-i18next",
      category: "Localization",
      icon: <Languages size={20} />,
    },
    {
      name: "NextAuth.js",
      category: "Authentication",
      icon: <Lock size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            {t("subtitle")}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/cv" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2"
              >
                <FileText size={18} />
                {t("viewResume")}
              </motion.button>
            </Link>
            <Link href="/send-email" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center gap-2"
              >
                <Mail size={18} />
                {t("contactMe")}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              ✨ {t("features.title")}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              t("features.items.personalIntro"),
              t("features.items.techStack"),
              t("features.items.multilingual"),
              t("features.items.projectShowcase"),
              t("features.items.responsiveDesign"),
              t("features.items.animations"),
              t("features.items.secureLogin"),
              t("features.items.ciCd"),
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/70 hover:bg-gray-700/50 border border-gray-700 rounded-xl p-6 transition-all"
              >
                <div className="text-blue-400 mb-3">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.split(":")[0]}
                </h3>
                <p className="text-gray-300">{feature.split(":")[1] || ""}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              🛠️ {t("technologies.title")}
            </span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-gray-800/50 hover:bg-gray-700/30 border border-gray-700 rounded-lg p-6 transition-all"
              >
                <div className="text-blue-400 mb-3">{tech.icon}</div>
                <h3 className="text-lg font-medium text-center">{tech.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CI/CD Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                ⚡ CI/CD Pipeline
              </span>
            </h2>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Github size={24} className="text-purple-400" />
                    GitHub Actions
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {t("ciCd.automatedDeployments")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {t("ciCd.slackIntegration")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {t("ciCd.dockerBuilds")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {t("ciCd.ghcr")}
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap size={24} className="text-blue-400" />
                    DevOps Features
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {t("ciCd.successFailureAlerts")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {t("ciCd.commitMetadata")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {t("ciCd.authorTagging")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      {t("ciCd.richSlackBlocks")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
