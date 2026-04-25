"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Handle Hash-based restoration (e.g., #all-courses)
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    // 2. Handle SessionStorage-based position restoration
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(`scrollPos:${pathname}`);
      if (savedPosition && !window.location.hash) {
        window.scrollTo(0, parseInt(savedPosition));
      }
    };

    // Run restoration
    if (window.location.hash) {
      handleHashScroll();
    } else {
      restoreScrollPosition();
    }

    // 3. Save position before navigating away
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scrollPos:${pathname}`, window.scrollY.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    // We also need to save when clicking links (Next.js navigation)
    // Since we don't have a global hook for "before navigation", we'll save on every scroll
    // but debounced for performance.
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.setItem(`scrollPos:${pathname}`, window.scrollY.toString());
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, searchParams]);

  return null;
}
