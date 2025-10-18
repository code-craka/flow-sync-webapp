import { ErrorInfo } from 'react';

interface ErrorLog {
  timestamp: string;
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  errorInfo?: {
    componentStack: string;
  };
  userAgent: string;
  url: string;
  userId?: string;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private logs: ErrorLog[] = [];
  private maxLogs = 50; // Keep last 50 errors in memory

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  /**
   * Log an error with context information
   */
  public logError(error: Error, errorInfo?: ErrorInfo, userId?: string): void {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo: errorInfo
        ? {
            componentStack: errorInfo.componentStack || '',
          }
        : undefined,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId,
    };

    // Add to in-memory logs
    this.logs.push(errorLog);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // Remove oldest log
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🔴 Error Logged');
      console.error('Error:', error);
      if (errorInfo) {
        console.error('Component Stack:', errorInfo.componentStack);
      }
      console.groupEnd();
    }

    // Send to error tracking service (e.g., Sentry, LogRocket, etc.)
    this.sendToErrorService(errorLog);

    // Save to localStorage for debugging
    this.saveToLocalStorage(errorLog);
  }

  /**
   * Send error to external error tracking service
   */
  private sendToErrorService(errorLog: ErrorLog): void {
    // TODO: Implement error service integration
    // Example with Sentry:
    // if (window.Sentry) {
    //   window.Sentry.captureException(new Error(errorLog.error.message), {
    //     contexts: {
    //       react: {
    //         componentStack: errorLog.errorInfo?.componentStack,
    //       },
    //     },
    //     user: errorLog.userId ? { id: errorLog.userId } : undefined,
    //   });
    // }

    // For now, just log that we would send it
    if (process.env.NODE_ENV === 'development') {
      console.log('Would send to error service:', errorLog);
    }
  }

  /**
   * Save error to localStorage for debugging
   */
  private saveToLocalStorage(errorLog: ErrorLog): void {
    try {
      const existingLogs = this.getStoredErrors();
      const updatedLogs = [...existingLogs, errorLog].slice(-10); // Keep last 10
      localStorage.setItem('flowsync-error-logs', JSON.stringify(updatedLogs));
    } catch (e) {
      // Silently fail if localStorage is full or unavailable
      console.warn('Failed to save error to localStorage:', e);
    }
  }

  /**
   * Get stored errors from localStorage
   */
  public getStoredErrors(): ErrorLog[] {
    try {
      const stored = localStorage.getItem('flowsync-error-logs');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Clear stored errors
   */
  public clearStoredErrors(): void {
    localStorage.removeItem('flowsync-error-logs');
    this.logs = [];
  }

  /**
   * Get in-memory error logs
   */
  public getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  /**
   * Export errors as JSON for support/debugging
   */
  public exportErrors(): string {
    return JSON.stringify(
      {
        logs: this.logs,
        exportedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      },
      null,
      2
    );
  }
}

// Export singleton instance
export const errorLogger = ErrorLogger.getInstance();

// Helper function for easy error logging
export const logError = (
  error: Error,
  errorInfo?: ErrorInfo,
  userId?: string
): void => {
  errorLogger.logError(error, errorInfo, userId);
};

export default errorLogger;
