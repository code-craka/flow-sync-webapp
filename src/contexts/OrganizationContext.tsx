import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getUserOrganizations,
  createOrganization as createOrgQuery,
  updateOrganization as updateOrgQuery,
  deleteOrganization as deleteOrgQuery,
  getUserRole as getUserRoleQuery,
} from '@/lib/supabase/queries';
import type {
  Organization,
  MemberRole,
  OrganizationContextType,
} from '@/types';

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<MemberRole | null>(null);

  // Load user's organizations
  const loadOrganizations = useCallback(async () => {
    if (!user) {
      setOrganizations([]);
      setCurrentOrganization(null);
      setUserRole(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const orgs = await getUserOrganizations(user.id);
      setOrganizations(orgs);

      // Set current organization from localStorage or use first org
      const savedOrgId = localStorage.getItem('flowsync-current-org');
      const currentOrg = savedOrgId
        ? orgs.find((org) => org.id === savedOrgId)
        : orgs[0];

      if (currentOrg) {
        setCurrentOrganization(currentOrg);
        // Get user's role in this organization
        const role = await getUserRoleQuery(currentOrg.id, user.id);
        setUserRole(role);
      } else {
        setCurrentOrganization(null);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Failed to load organizations:', error);
      setOrganizations([]);
      setCurrentOrganization(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load organizations on mount and when user changes
  useEffect(() => {
    loadOrganizations();
  }, [loadOrganizations]);

  // Switch to a different organization
  const switchOrganization = useCallback(
    async (organizationId: string) => {
      if (!user) return;

      const org = organizations.find((o) => o.id === organizationId);
      if (!org) {
        throw new Error('Organization not found');
      }

      setCurrentOrganization(org);
      localStorage.setItem('flowsync-current-org', organizationId);

      // Get user's role in the new organization
      try {
        const role = await getUserRoleQuery(organizationId, user.id);
        setUserRole(role);
      } catch (error) {
        console.error('Failed to get user role:', error);
        setUserRole(null);
      }
    },
    [organizations, user]
  );

  // Create a new organization
  const createOrganization = useCallback(
    async (name: string, slug: string): Promise<Organization> => {
      if (!user) {
        throw new Error('User must be authenticated to create an organization');
      }

      try {
        const newOrg = await createOrgQuery({
          name,
          slug,
          owner_id: user.id,
        });

        // Reload organizations to include the new one
        await loadOrganizations();

        // Auto-switch to the new organization
        await switchOrganization(newOrg.id);

        return newOrg;
      } catch (error) {
        console.error('Failed to create organization:', error);
        throw error;
      }
    },
    [user, loadOrganizations, switchOrganization]
  );

  // Update current organization
  const updateOrganization = useCallback(
    async (id: string, data: Partial<Organization>) => {
      try {
        const updated = await updateOrgQuery(id, data);

        // Update in local state
        setOrganizations((orgs) =>
          orgs.map((org) => (org.id === id ? { ...org, ...updated } : org))
        );

        // Update current org if it's the one being updated
        if (currentOrganization?.id === id) {
          setCurrentOrganization((current) =>
            current ? { ...current, ...updated } : null
          );
        }
      } catch (error) {
        console.error('Failed to update organization:', error);
        throw error;
      }
    },
    [currentOrganization]
  );

  // Delete an organization
  const deleteOrganization = useCallback(
    async (id: string) => {
      try {
        await deleteOrgQuery(id);

        // Remove from local state
        setOrganizations((orgs) => orgs.filter((org) => org.id !== id));

        // If deleting current org, switch to another one
        if (currentOrganization?.id === id) {
          const remainingOrgs = organizations.filter((org) => org.id !== id);
          if (remainingOrgs.length > 0) {
            await switchOrganization(remainingOrgs[0].id);
          } else {
            setCurrentOrganization(null);
            setUserRole(null);
            localStorage.removeItem('flowsync-current-org');
          }
        }
      } catch (error) {
        console.error('Failed to delete organization:', error);
        throw error;
      }
    },
    [currentOrganization, organizations, switchOrganization]
  );

  // Get user's role in current organization
  const getUserRole = useCallback(() => {
    return userRole;
  }, [userRole]);

  // Check if user has at least a certain permission level
  const hasPermission = useCallback(
    (requiredRole: MemberRole): boolean => {
      if (!userRole) return false;

      const roleHierarchy: Record<MemberRole, number> = {
        owner: 4,
        admin: 3,
        editor: 2,
        viewer: 1,
      };

      return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
    },
    [userRole]
  );

  const value: OrganizationContextType = {
    currentOrganization,
    organizations,
    loading,
    switchOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getUserRole,
    hasPermission,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}
