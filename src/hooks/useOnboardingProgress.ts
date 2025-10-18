import { useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useOrganization } from '@/contexts/OrganizationContext';

/**
 * Hook to automatically track and complete onboarding steps based on user actions
 *
 * This hook monitors the app state and auto-completes onboarding steps when:
 * - User creates their first organization (create_organization)
 * - User has projects (create_project)
 * - User has team members (invite_member)
 * - User has tasks (create_task)
 */
export function useOnboardingProgress() {
  const { completeStep, steps } = useOnboarding();
  const { organizations, currentOrganization } = useOrganization();

  // Auto-complete "create_organization" step
  useEffect(() => {
    const step = steps.find((s) => s.id === 'create_organization');
    if (step && !step.completed && organizations && organizations.length > 0) {
      completeStep('create_organization');
    }
  }, [organizations, steps, completeStep]);

  // You can add more auto-completion logic here for other steps
  // For example, listening to project count, member count, etc.

  return {
    markProjectCreated: () => completeStep('create_project'),
    markMemberInvited: () => completeStep('invite_member'),
    markTaskCreated: () => completeStep('create_task'),
    markFeaturesExplored: () => completeStep('explore_features'),
  };
}
