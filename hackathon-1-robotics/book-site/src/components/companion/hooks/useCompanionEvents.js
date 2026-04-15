/**
 * useCompanionEvents — Event bus bridge for H1 Docusaurus companion.
 * Bridges: toggle-chat → toggle, toggle-aira → toggle,
 *          toggle-notebook → open, close-all-panels → close.
 */

import { useEffect } from "react";

export function useCompanionEvents({ open, close, toggle }) {
  useEffect(() => {
    const onToggleChat     = () => toggle();
    const onToggleAira     = () => toggle();
    const onToggleNotebook = () => open();
    const onCloseAll       = () => close();

    window.addEventListener("toggle-chat",      onToggleChat);
    window.addEventListener("toggle-aira",      onToggleAira);
    window.addEventListener("toggle-notebook",  onToggleNotebook);
    window.addEventListener("close-all-panels", onCloseAll);

    return () => {
      window.removeEventListener("toggle-chat",      onToggleChat);
      window.removeEventListener("toggle-aira",      onToggleAira);
      window.removeEventListener("toggle-notebook",  onToggleNotebook);
      window.removeEventListener("close-all-panels", onCloseAll);
    };
  }, [open, close, toggle]);
}
