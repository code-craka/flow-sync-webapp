import React from 'react';
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  description?: string;
  showDetails?: boolean;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  title = 'Oops! Something went wrong',
  description = "We're sorry, but something unexpected happened. Please try again.",
  showDetails = false,
}) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="max-w-lg w-full shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base mt-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {(isDevelopment || showDetails) && error && (
            <div className="mt-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2 flex items-center gap-2">
                  <span className="group-open:rotate-90 transition-transform">▶</span>
                  Error Details
                </summary>
                <div className="mt-2 p-4 bg-muted rounded-md overflow-auto max-h-64">
                  <p className="text-sm font-semibold text-destructive mb-2">
                    {error.name}: {error.message}
                  </p>
                  {error.stack && (
                    <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap break-words">
                      {error.stack}
                    </pre>
                  )}
                </div>
              </details>
            </div>
          )}

          <div className="mt-6 p-4 bg-muted/50 rounded-md">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Need help?
            </h4>
            <p className="text-xs text-muted-foreground">
              If this problem continues, please contact our support team at{' '}
              <a
                href="mailto:support@flowsync.com"
                className="text-primary hover:underline"
              >
                support@flowsync.com
              </a>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-4">
          {resetError && (
            <Button
              onClick={resetError}
              className="flex-1 gap-2"
              variant="default"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          <Button
            onClick={() => (window.location.href = '/')}
            className="flex-1 gap-2"
            variant="outline"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorFallback;
