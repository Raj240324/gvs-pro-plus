import { Component, ErrorInfo, ReactNode } from 'react';
import Button from './ui/Button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 text-center">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              We encountered an unexpected error. Our team has been notified. Please try refreshing the page.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                Refresh Page
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
              >
                <Home size={16} />
                Go Home
              </Button>
            </div>
            
            {/* Optional: Show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 text-left bg-gray-100 dark:bg-slate-950 p-4 rounded-lg overflow-auto max-h-40 text-xs font-mono text-red-500">
                {this.state.error.toString()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
