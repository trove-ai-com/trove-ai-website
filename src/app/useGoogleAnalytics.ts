import { useEffect, useRef } from "react";

const MEASUREMENT_ID = "G-6RCSKVYLYH";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function useGoogleAnalytics(pathname: string) {
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("config", MEASUREMENT_ID, { page_path: pathname });
  }, [pathname]);
}
