import React from "react";
import Layout from "@theme-original/Layout";
import SnowOverlay from "@site/src/components/SnowOverlay";
import ActionDock from "@site/src/components/ActionDock/ActionDock";

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <SnowOverlay />
      <ActionDock />
    </>
  );
}
