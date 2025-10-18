import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

/**
 * Test component for error boundaries
 * Use this in development to test if error boundaries are working correctly
 */

// Component that throws an error when button is clicked
const ErrorThrower: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error: This is an intentional error to test error boundaries');
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Error Boundary Test
        </CardTitle>
        <CardDescription>
          Click the button below to trigger an intentional error
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => setShouldThrow(true)}
          variant="destructive"
          className="w-full"
        >
          Throw Test Error
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          This will test if the error boundary catches and displays errors properly.
        </p>
      </CardContent>
    </Card>
  );
};

// Component that throws an error during render
export const ImmediateErrorThrower: React.FC = () => {
  throw new Error('Immediate render error: This error is thrown during component render');
};

// Component that throws an async error
export const AsyncErrorThrower: React.FC = () => {
  const throwAsyncError = async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error('Async error: This error occurs in an async operation');
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Async Error Test
        </CardTitle>
        <CardDescription>
          Click to trigger an async error (Note: Error boundaries don't catch these)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={throwAsyncError}
          variant="outline"
          className="w-full"
        >
          Throw Async Error
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          Async errors need separate handling (e.g., try-catch in the function).
        </p>
      </CardContent>
    </Card>
  );
};

export default ErrorThrower;
