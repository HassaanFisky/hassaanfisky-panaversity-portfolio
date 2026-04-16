import BrowserOnly from "@docusaurus/BrowserOnly";
import { LanguageProvider } from "@site/src/context/LanguageContext.js";

// LanguageProvider is the only static import — pure React context, no DOM APIs.
// Every component that touches the DOM or imports framer-motion is loaded via
// BrowserOnly + require() so Docusaurus SSG never bundles them into the server
// chunk (which would trigger require.resolveWeak errors).

export default function Root({ children }) {
  return (
    <LanguageProvider>
      {children}
      <BrowserOnly>
        {() => {
          const { CompanionProvider } = require("@site/src/components/companion/CompanionContext.jsx");
          const EcosystemNav = require("@site/src/components/EcosystemNav.js").default;
          const SnowOverlay = require("@site/src/components/SnowOverlay.jsx").default;
          const ActionDock = require("@site/src/components/ActionDock/ActionDock.jsx").default;
          const { CompanionShell } = require("@site/src/components/companion/CompanionShell.jsx");
          return (
            <CompanionProvider>
              <EcosystemNav />
              <ActionDock />
              <SnowOverlay />
              <CompanionShell
                platform="H1"
                context="Aira Robotics Textbook. Physical AI, ROS 2, kinematics, and humanoid robotics content is active."
              />
            </CompanionProvider>
          );
        }}
      </BrowserOnly>
    </LanguageProvider>
  );
}
