import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { LanguageProvider } from "@site/src/context/LanguageContext";
import EcosystemNav from "@site/src/components/EcosystemNav";
import SnowOverlay from "@site/src/components/SnowOverlay";

export default function Root({ children }) {
  return (
    <LanguageProvider>
      {children}
      <EcosystemNav />
      <BrowserOnly>
        {() => {
          const ActionDock = require("@site/src/components/ActionDock/ActionDock").default;
          return <ActionDock />;
        }}
      </BrowserOnly>
      <SnowOverlay />
    </LanguageProvider>
  );
}
