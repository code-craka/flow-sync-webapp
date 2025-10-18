import { useState, useEffect, useCallback } from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import {
  getOrganizationProjects,
  getOrganizationMembers,
  getProjectTasks,
} from '@/lib/supabase/queries';
import type { UsageLimits } from '@/types';

/**
 * Hook to track and enforce usage limits based on subscription plan
 *
 * @example
 * const { usage, isAtLimit, percentUsed, canCreate } = useUsageLimits();
 *
 * if (!canCreate('project')) {
 *   showUpgradePrompt();
 * }
 */
export function useUsageLimits() {
  const { currentOrganization } = useOrganization();
  const { subscription } = useSubscription();

  const [usage, setUsage] = useState<UsageLimits>({
    projects: { used: 0, limit: 3 },
    members: { used: 0, limit: 5 },
    tasks: { used: 0, limit: 100 },
    storage: { used: 0, limit: 1024 }, // 1GB in MB
  });

  const [loading, setLoading] = useState(true);

  // Calculate actual usage
  const calculateUsage = useCallback(async () => {
    if (!currentOrganization) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch actual usage data
      const [projects, members] = await Promise.all([
        getOrganizationProjects(currentOrganization.id),
        getOrganizationMembers(currentOrganization.id),
      ]);

      // Count total tasks across all projects
      const taskCounts = await Promise.all(
        projects.map((project) => getProjectTasks(project.id))
      );
      const totalTasks = taskCounts.reduce((sum, tasks) => sum + tasks.length, 0);

      // Get plan limits
      const limits = getPlanLimits(subscription?.plan || 'free');

      setUsage({
        projects: { used: projects.length, limit: limits.projects },
        members: { used: members.length, limit: limits.members },
        tasks: { used: totalTasks, limit: limits.tasks },
        storage: { used: 0, limit: limits.storage }, // TODO: Calculate actual storage usage
      });
    } catch (error) {
      console.error('Failed to calculate usage:', error);
    } finally {
      setLoading(false);
    }
  }, [currentOrganization, subscription]);

  useEffect(() => {
    calculateUsage();
  }, [calculateUsage]);

  // Get plan limits based on subscription
  const getPlanLimits = (plan: 'free' | 'pro' | 'enterprise') => {
    const limits = {
      free: { projects: 3, members: 5, tasks: 100, storage: 1024 },
      pro: { projects: -1, members: 25, tasks: -1, storage: 51200 }, // 50GB
      enterprise: { projects: -1, members: -1, tasks: -1, storage: -1 },
    };

    return limits[plan] || limits.free;
  };

  // Check if at limit for a specific resource
  const isAtLimit = useCallback(
    (resource: keyof UsageLimits): boolean => {
      const { used, limit } = usage[resource];

      // -1 means unlimited
      if (limit === -1) return false;

      return used >= limit;
    },
    [usage]
  );

  // Check if can create a new resource
  const canCreate = useCallback(
    (resource: keyof UsageLimits): boolean => {
      return !isAtLimit(resource);
    },
    [isAtLimit]
  );

  // Get percentage used for a resource
  const percentUsed = useCallback(
    (resource: keyof UsageLimits): number => {
      const { used, limit } = usage[resource];

      // Unlimited
      if (limit === -1) return 0;

      return Math.min(Math.round((used / limit) * 100), 100);
    },
    [usage]
  );

  // Get remaining count for a resource
  const remaining = useCallback(
    (resource: keyof UsageLimits): number => {
      const { used, limit } = usage[resource];

      // Unlimited
      if (limit === -1) return Infinity;

      return Math.max(limit - used, 0);
    },
    [usage]
  );

  // Check if approaching limit (>80%)
  const isApproachingLimit = useCallback(
    (resource: keyof UsageLimits): boolean => {
      return percentUsed(resource) >= 80 && !isAtLimit(resource);
    },
    [percentUsed, isAtLimit]
  );

  // Get limit warning message
  const getLimitWarning = useCallback(
    (resource: keyof UsageLimits): string | null => {
      const { used, limit } = usage[resource];

      if (limit === -1) return null;

      if (isAtLimit(resource)) {
        return `You've reached your ${resource} limit (${used}/${limit}). Upgrade to create more.`;
      }

      if (isApproachingLimit(resource)) {
        return `You're approaching your ${resource} limit (${used}/${limit}). Consider upgrading.`;
      }

      return null;
    },
    [usage, isAtLimit, isApproachingLimit]
  );

  // Refresh usage data
  const refreshUsage = useCallback(async () => {
    await calculateUsage();
  }, [calculateUsage]);

  return {
    usage,
    loading,
    isAtLimit,
    canCreate,
    percentUsed,
    remaining,
    isApproachingLimit,
    getLimitWarning,
    refreshUsage,
  };
}
