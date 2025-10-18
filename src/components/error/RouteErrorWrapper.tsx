import React, { Component, ReactNode, ErrorInfo } from 'react';
import { RouteErrorBoundary } from './RouteErrorBoundary';
import { logError } from '@/lib/errorLogger';

interface RouteErrorWrapperProps {
  children: ReactNode;
  routeName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Route-level error boundary wrapper
 * Catches errors in route components and shows a user-friendly error UI
 */
class RouteErrorWrapper extends Component<RouteErrorWrapperProps, State> {
  constructor(props: RouteErrorWrapperProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error
    logError(error, errorInfo);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Route Error:', error);
      console.error('Route:', this.props.routeName);
      console.error('Error Info:', errorInfo);
    }
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <RouteErrorBoundary
          error={this.state.error || undefined}
          resetError={this.resetError}
          routeName={this.props.routeName}
        />
      );
    }

    return this.props.children;
  }
}

export default RouteErrorWrapper;
