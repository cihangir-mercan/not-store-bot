// src/hooks/useScrollRestoration.ts
import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

export function useScrollRestoration() {
  const location = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    // Only scroll to top on PUSH navigations—ignore POP (back/forward)
    if (navType === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [location, navType]);
}
