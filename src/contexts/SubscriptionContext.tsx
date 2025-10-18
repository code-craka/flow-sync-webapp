import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useOrganization } from './OrganizationContext';
import { getOrganizationSubscription, updateSubscription } from '@/lib/supabase/queries';
import { getSubscription, cancelSubscription, reactivateSubscription } from '@/lib/polarClient';
import type { Subscription, SubscriptionPlan, SubscriptionStatus, UsageLimits } from '@/types';

interface SubscriptionContextType {
  subscription: Subscription | null;
  loading: boolean;
  isActive: boolean;
  isPastDue: boolean;
  isCanceled: boolean;
  willCancelAtPeriodEnd: boolean;
  usage: UsageLimits;
  refreshSubscription: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
  reactivateSubscription: () => Promise<void>;
  hasFeature: (feature: string) => boolean;
  canCreateProject: () => boolean;
  canAddMember: () => boolean;
  canCreateTask: (projectId: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Plan limits configuration
const PLAN_LIMITS: Record<SubscriptionPlan, UsageLimits['projects'] & UsageLimits['members'] & UsageLimits['tasks'] & UsageLimits['storage']> = {
  free: {
    limit: 3,
    limit: 5,
    limit: 100,
    limit: 1024, // 1GB in MB
  },
  pro: {
    limit: -1, // unlimited
    limit: 25,
    limit: -1,
    limit: 51200, // 50GB
  },
  enterprise: {
    limit: -1,
    limit: -1,
    limit: -1,
    limit: -1,
  },
};

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { currentOrganization } = useOrganization();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<UsageLimits>({
    projects: { used: 0, limit: 3 },
    members: { used: 0, limit: 5 },
    tasks: { used: 0, limit: 100 },
    storage: { used: 0, limit: 1024 },
  });

  // Load subscription data
  const loadSubscription = useCallback(async () => {
    if (!currentOrganization) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch subscription from database
      const sub = await getOrganizationSubscription(currentOrganization.id);
      setSubscription(sub);

      // Update usage limits based on plan
      if (sub) {
        const planLimits = getPlanLimits(sub.plan);
        setUsage({
          projects: { used: 0, limit: planLimits.projects }, // TODO: Calculate actual usage
          members: { used: 0, limit: planLimits.members },
          tasks: { used: 0, limit: planLimits.tasks },
          storage: { used: 0, limit: planLimits.storage },
        });
      }
    } catch (error) {
      console.error('Failed to load subscription:', error);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }, [currentOrganization]);

  useEffect(() => {
    loadSubscription();
  }, [loadSubscription]);

  // Get plan limits
  const getPlanLimits = (plan: SubscriptionPlan) => {
    return {
      projects: plan === 'free' ? 3 : plan === 'pro' ? -1 : -1,
      members: plan === 'free' ? 5 : plan === 'pro' ? 25 : -1,
      tasks: plan === 'free' ? 100 : -1,
      storage: plan === 'free' ? 1024 : plan === 'pro' ? 51200 : -1,
    };
  };

  // Refresh subscription data
  const refreshSubscription = useCallback(async () => {
    await loadSubscription();
  }, [loadSubscription]);

  // Cancel subscription
  const handleCancelSubscription = useCallback(async () => {
    if (!subscription || !subscription.polar_subscription_id) {
      throw new Error('No active subscription to cancel');
    }

    try {
      // Cancel in Polar
      await cancelSubscription(subscription.polar_subscription_id);

      // Update in database
      await updateSubscription(currentOrganization!.id, {
        status: 'canceled',
        cancel_at_period_end: true,
      });

      // Refresh
      await refreshSubscription();
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  }, [subscription, currentOrganization, refreshSubscription]);

  // Reactivate subscription
  const handleReactivateSubscription = useCallback(async () => {
    if (!subscription || !subscription.polar_subscription_id) {
      throw new Error('No subscription to reactivate');
    }

    try {
      // Reactivate in Polar
      await reactivateSubscription(subscription.polar_subscription_id);

      // Update in database
      await updateSubscription(currentOrganization!.id, {
        status: 'active',
        cancel_at_period_end: false,
      });

      // Refresh
      await refreshSubscription();
    } catch (error) {
      console.error('Failed to reactivate subscription:', error);
      throw error;
    }
  }, [subscription, currentOrganization, refreshSubscription]);

  // Check if user has a specific feature
  const hasFeature = useCallback(
    (feature: string): boolean => {
      if (!subscription) return false;

      const plan = subscription.plan;

      // Define feature availability per plan
      const features: Record<string, SubscriptionPlan[]> = {
        unlimited_projects: ['pro', 'enterprise'],
        unlimited_tasks: ['pro', 'enterprise'],
        advanced_analytics: ['pro', 'enterprise'],
        priority_support: ['pro', 'enterprise'],
        custom_fields: ['pro', 'enterprise'],
        sso: ['enterprise'],
        dedicated_support: ['enterprise'],
        custom_integrations: ['enterprise'],
      };

      return features[feature]?.includes(plan) || false;
    },
    [subscription]
  );

  // Check if user can create a new project
  const canCreateProject = useCallback((): boolean => {
    if (!subscription) return usage.projects.used < usage.projects.limit;

    // Unlimited projects for pro and enterprise
    if (subscription.plan !== 'free') return true;

    // Check limit for free plan
    return usage.projects.limit === -1 || usage.projects.used < usage.projects.limit;
  }, [subscription, usage]);

  // Check if user can add a new member
  const canAddMember = useCallback((): boolean => {
    if (!subscription) return usage.members.used < usage.members.limit;

    // Unlimited members for enterprise
    if (subscription.plan === 'enterprise') return true;

    // Check limit
    return usage.members.limit === -1 || usage.members.used < usage.members.limit;
  }, [subscription, usage]);

  // Check if user can create a new task in a project
  const canCreateTask = useCallback(
    (projectId: string): boolean => {
      if (!subscription) return usage.tasks.used < usage.tasks.limit;

      // Unlimited tasks for pro and enterprise
      if (subscription.plan !== 'free') return true;

      // Check limit for free plan
      return usage.tasks.limit === -1 || usage.tasks.used < usage.tasks.limit;
    },
    [subscription, usage]
  );

  // Computed properties
  const isActive = subscription?.status === 'active';
  const isPastDue = subscription?.status === 'past_due';
  const isCanceled = subscription?.status === 'canceled';
  const willCancelAtPeriodEnd = subscription?.cancel_at_period_end || false;

  const value: SubscriptionContextType = {
    subscription,
    loading,
    isActive,
    isPastDue,
    isCanceled,
    willCancelAtPeriodEnd,
    usage,
    refreshSubscription,
    cancelSubscription: handleCancelSubscription,
    reactivateSubscription: handleReactivateSubscription,
    hasFeature,
    canCreateProject,
    canAddMember,
    canCreateTask,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
