import { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void;
}

declare global {
  interface Window {
    turnstile?: any;
  }
}

export default function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

  useEffect(() => {
    if (!siteKey) {
      console.error("Turnstile site key missing");
      return;
    }

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current) return;

      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onToken(token);
        },
        "expired-callback": () => {
          onToken(null);
        },
        "error-callback": () => {
          onToken(null);
        },
      });
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;

    document.body.appendChild(script);
  }, [siteKey, onToken]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center mt-4"
    />
  );
}