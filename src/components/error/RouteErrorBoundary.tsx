import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface RouteErrorBoundaryProps {
  error?: Error;
  resetError?: () => void;
  routeName?: string;
}

export const RouteErrorBoundary: React.FC<RouteErrorBoundaryProps> = ({
  error,
  resetError,
  routeName,
}) => {
  const navigate = useNavigate();
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-full">
              <AlertCircle className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          <CardTitle className="text-xl">
            {routeName ? `Error loading ${routeName}` : 'Page Error'}
          </CardTitle>
          <CardDescription>
            This page encountered an error. You can try reloading or go back.
          </CardDescription>
        </CardHeader>

        {isDevelopment && error && (
          <CardContent>
            <div className="p-3 bg-muted rounded-md overflow-auto max-h-32">
              <p className="text-xs font-mono text-destructive break-words">
                {error.message}
              </p>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            {resetError && (
              <Button
                onClick={resetError}
                className="flex-1 gap-2"
                variant="default"
                size="sm"
              >
                <RefreshCw className="h-4 w-4" />
                Reload
              </Button>
            )}
            <Button
              onClick={() => navigate(-1)}
              className="flex-1 gap-2"
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
          <Button
            onClick={() => navigate('/app/dashboard')}
            className="w-full gap-2"
            variant="ghost"
            size="sm"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RouteErrorBoundary;
