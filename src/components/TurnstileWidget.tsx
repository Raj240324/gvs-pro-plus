import { useEffect, useRef } from "react";

/* -------------------------------------------------------------------------- */
/*                          GLOBAL TURNSTILE TYPES                            */
/* -------------------------------------------------------------------------- */

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          retry?: "never" | "auto";
          theme?: "auto" | "light" | "dark";
        }
      ) => string;
      reset?: (widgetId?: string) => void;
      remove?: (widgetId?: string) => void;
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENT TYPES                               */
/* -------------------------------------------------------------------------- */

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void;
  theme?: "auto" | "light" | "dark";
}

/* -------------------------------------------------------------------------- */
/*                          TURNSTILE WIDGET COMPONENT                        */
/* -------------------------------------------------------------------------- */

export function TurnstileWidget({
  onToken,
  theme = "auto",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;
  
  useEffect(() => {
    if (!siteKey) {
      console.error("[Turnstile] Missing VITE_TURNSTILE_SITE_KEY");
      return;
    }

    let cancelled = false;

    function renderWidget() {
      if (
        cancelled ||
        !containerRef.current ||
        !window.turnstile ||
        widgetIdRef.current
      ) {
        return;
      }

      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,

        callback: (token: string) => {
          onToken(token);
        },

        "error-callback": () => {
          console.warn("[Turnstile] verification error");
          onToken(null);
        },

        "expired-callback": () => {
          console.warn("[Turnstile] token expired");
          onToken(null);
        },

        retry: "auto",
      });

      widgetIdRef.current = widgetId;
    }

    /* ---------------------------------------------------------------------- */
    /*                    SCRIPT ALREADY LOADED → RENDER                      */
    /* ---------------------------------------------------------------------- */

    if (window.turnstile) {
      renderWidget();
      return;
    }

    /* ---------------------------------------------------------------------- */
    /*                    CHECK IF SCRIPT ALREADY EXISTS                      */
    /* ---------------------------------------------------------------------- */

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");

      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;

      script.onload = renderWidget;

      document.body.appendChild(script);
    }

    /* ---------------------------------------------------------------------- */
    /*                           CLEANUP ON UNMOUNT                           */
    /* ---------------------------------------------------------------------- */

    return () => {
      cancelled = true;

      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove?.(widgetIdRef.current);
      }

      widgetIdRef.current = null;

      onToken(null);
    };
  }, [onToken, siteKey, theme]);

  /* -------------------------------------------------------------------------- */
  /*                         FAIL-SAFE IF ENV MISSING                           */
  /* -------------------------------------------------------------------------- */

  if (!siteKey) {
    return (
      <p className="text-xs text-red-500 mt-2">
        Turnstile configuration error. Please contact the administrator.
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mt-4 flex justify-center"
      aria-label="Human verification"
    />
  );
}

export default TurnstileWidget;