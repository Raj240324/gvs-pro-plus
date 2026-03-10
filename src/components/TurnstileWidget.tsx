import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          retry?: 'never' | 'auto';
          theme?: 'auto' | 'light' | 'dark';
        }
      ) => void;
      reset?: () => void;
    };
  }
}

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void;
  theme?: 'auto' | 'light' | 'dark';
}

/**
 * Cloudflare Turnstile widget wrapper.
 *
 * - Loads the Turnstile script once per app lifetime.
 * - Renders a widget into a div and propagates tokens via onToken().
 * - Keeps implementation fully client-side and Vite-compatible.
 */
export function TurnstileWidget({ onToken, theme = 'auto' }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  useEffect(() => {
    if (!siteKey) {
      console.error('[Turnstile] Missing VITE_TURNSTILE_SITE_KEY');
      return;
    }

    let cancelled = false;

    function renderWidget() {
      if (cancelled || !containerRef.current || !window.turnstile) return;

      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        callback: (token: string) => {
          onToken(token);
        },
        'error-callback': () => {
          onToken(null);
        },
        'expired-callback': () => {
          onToken(null);
        },
        retry: 'auto',
      });
    }

    // If script already present, render immediately
    if (window.turnstile) {
      renderWidget();
      return () => {
        cancelled = true;
      };
    }

    // Inject Turnstile script once
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', renderWidget, { once: true });
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', renderWidget, { once: true });
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      onToken(null);
    };
  }, [onToken, siteKey, theme]);

  if (!siteKey) {
    // Fail closed visually but avoid throwing on client
    return (
      <p className="text-xs text-red-500 mt-2">
        Turnstile configuration error. Please contact the site administrator.
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

