import * as Sentry from "@sentry/react";

export const captureError = (error: Error, context?: Record<string, unknown>) => {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, { extra: context });
  } else {
    console.error("[Dev Error]", error, context);
  }
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = "info") => {
  if (import.meta.env.PROD) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`[Dev Message - ${level}]`, message);
  }
};
