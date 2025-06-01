# My Portfolio App

- A modern, responsive portfolio web application showcasing professional experiences, technical skills, client projects, and personal projects.
- Set up GitHub Actions workflows with Slack integration for deployment alerts, featuring success/failure detection, commit metadata extraction, author tagging, and rich Slack Block Kit formatting.

## ✨ Features

- Personal introduction and professional summary
- Tech stack highlights with icons
- Multilingual support (English & Finnish)
- Client and personal project showcases
- Responsive design with clean UI
- Animations for enhanced UX
- Secure login (Credentials-based)
- Continuous Integration & Deployment (CI/CD)

## 🛠️ Technologies Used

- **Framework & Language**
  - [Next.js 15](https://nextjs.org/) with **App Router**
  - [TypeScript](https://www.typescriptlang.org/)
- **Styling & Animation**
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Framer Motion](https://www.framer.com/motion/) for smooth animations
- **Localization**
  - [next-i18next](https://github.com/i18next/next-i18next) for multilingual support (English and Finnish)
- **Authentication**
  - [NextAuth.js](https://next-auth.js.org/) with `CredentialsProvider`
- **Icons**
  - [lucide-react](https://lucide.dev/)
- **CI/CD & DevOps**
  - [GitHub Actions](https://github.com/features/actions) for continuous integration and deployment
  - Builds Docker image using GitHub Actions and pushes to [GitHub Container Registry (GHCR)](https://ghcr.io/)
  - Automatic deployment on push to `main`
