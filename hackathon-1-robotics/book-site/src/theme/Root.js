import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { LanguageProvider } from "@site/src/context/LanguageContext";
import { CompanionProvider } from "@site/src/components/companion/CompanionContext";
import EcosystemNav from "@site/src/components/EcosystemNav";
import SnowOverlay from "@site/src/components/SnowOverlay";

export default function Root({ children }) {
  return (
    <LanguageProvider>
      <CompanionProvider>
        {children}
        <EcosystemNav />
        <BrowserOnly>
          {() => {
            const ActionDock = require("@site/src/components/ActionDock/ActionDock").default;
            return <ActionDock />;
          }}
        </BrowserOnly>
        <SnowOverlay />
        <BrowserOnly>
          {() => {
            const { CompanionShell } = require("@site/src/components/companion/CompanionShell");
            return (
              <CompanionShell
                platform="H1"
                context="Aira Robotics Textbook. Physical AI, ROS 2, kinematics, and humanoid robotics content is active."
              />
            );
          }}
        </BrowserOnly>
      </CompanionProvider>
    </LanguageProvider>
  );
}
