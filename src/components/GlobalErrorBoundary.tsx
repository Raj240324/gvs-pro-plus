import * as Sentry from "@sentry/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GlobalErrorBoundary = ({ children }: Props) => {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50 dark:bg-slate-950">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Our team has been notified automatically.</p>
          <button
            onClick={resetError}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Try Again
          </button>
        </div>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
