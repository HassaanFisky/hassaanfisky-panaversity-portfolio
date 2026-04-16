// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "PANAVERSITY | ROBOTICS",
  tagline: "The Future of Humanoid Robotics",
  favicon: "img/favicon.png",
  url: "https://hackathon-1-robotics.vercel.app",
  baseUrl: "/",
  organizationName: "HassaanFisky",
  projectName: "Physical-AI-Humanoid-Robots-Textbook",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl:
            "https://github.com/HassaanFisky/Physical-AI-Humanoid-Robots-Textbook/tree/main/submissions/textbook-variant/book-site/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  // Alias framer-motion to an empty module on the server (SSG) build.
  // framer-motion v11+ uses React.lazy() internally; webpack generates
  // require.resolveWeak() calls which fail in Docusaurus's Node.js eval
  // context. All framer-motion usage is inside BrowserOnly, so the alias is safe.
  plugins: [
    function patchFramerMotionServerBundle() {
      return {
        name: "patch-framer-motion-server",
        configureWebpack(_config, isServer) {
          if (!isServer) return {};
          return {
            resolve: {
              alias: { "framer-motion": false },
            },
          };
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/social-card.png",
      navbar: {
        title: "PANAVERSITY | ROBOTICS",
        logo: {
          alt: "Physical AI Logo",
          src: "img/app-logo.png",
          srcDark: "img/app-logo.png", // We'll handle color via CSS inversion if needed
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Chapters",
          },
          {
            href: "https://github.com/HassaanFisky/Physical-AI-Humanoid-Robots-Textbook",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Textbook",
            items: [
              {
                label: "M1: Foundations",
                to: "/docs/module-01-foundations/what-is-physical-ai",
              },
              {
                label: "M2: Hardware",
                to: "/docs/module-02-hardware/kinematics-dynamics",
              },
              {
                label: "M3: Software",
                to: "/docs/module-03-software/ros2-concepts",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Course Companion",
                href: "https://hassaanfisky-aira-digital-fte.vercel.app/",
              },
              {
                label: "GIAIC Hackathon",
                href: "https://giaic.com",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/HassaanFisky/Physical-AI-Humanoid-Robots-Textbook",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Muhammad Hassaan Aslam. HASSAAN AI ARCHITECT. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
