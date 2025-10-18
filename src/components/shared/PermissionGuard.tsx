import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import type { MemberRole } from '@/types';

interface PermissionGuardProps {
  /** Children to render if permission check passes */
  children: React.ReactNode;

  /** Minimum required role to view this content */
  requiredRole?: MemberRole;

  /** Custom permission check function */
  hasPermission?: () => boolean;

  /** Fallback content to render if permission check fails */
  fallback?: React.ReactNode;

  /** If true, renders children but disables interactive elements */
  disableOnly?: boolean;
}

/**
 * Component that conditionally renders children based on user permissions
 *
 * @example
 * // Require admin role
 * <PermissionGuard requiredRole="admin">
 *   <Button>Delete Project</Button>
 * </PermissionGuard>
 *
 * @example
 * // Custom permission check
 * <PermissionGuard hasPermission={() => canEditProjects}>
 *   <ProjectEditor />
 * </PermissionGuard>
 *
 * @example
 * // Disable instead of hide
 * <PermissionGuard requiredRole="editor" disableOnly>
 *   <Button>Edit Task</Button>
 * </PermissionGuard>
 */
export function PermissionGuard({
  children,
  requiredRole,
  hasPermission: customPermissionCheck,
  fallback = null,
  disableOnly = false,
}: PermissionGuardProps) {
  const { hasPermission } = usePermissions();

  // Check permission
  let allowed = true;

  if (requiredRole) {
    allowed = hasPermission(requiredRole);
  } else if (customPermissionCheck) {
    allowed = customPermissionCheck();
  }

  // If permission check fails
  if (!allowed) {
    if (disableOnly) {
      // Clone children and add disabled prop if it's a valid element
      return (
        <>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                disabled: true,
                className: `${(child.props as any).className || ''} opacity-50 cursor-not-allowed`,
              });
            }
            return child;
          })}
        </>
      );
    }

    // Otherwise render fallback
    return <>{fallback}</>;
  }

  // Permission granted, render children
  return <>{children}</>;
}

/**
 * Higher-order component version of PermissionGuard
 *
 * @example
 * const ProtectedButton = withPermission(Button, { requiredRole: 'admin' });
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  guardProps: Omit<PermissionGuardProps, 'children'>
) {
  return (props: P) => (
    <PermissionGuard {...guardProps}>
      <Component {...props} />
    </PermissionGuard>
  );
}
