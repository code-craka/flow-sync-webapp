import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface OnboardingContextType {
  isOnboardingComplete: boolean;
  showWelcomeWizard: boolean;
  showChecklist: boolean;
  steps: OnboardingStep[];
  completeStep: (stepId: string) => void;
  dismissWelcomeWizard: () => void;
  dismissChecklist: () => void;
  resetOnboarding: () => void;
  checklistProgress: number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const DEFAULT_STEPS: OnboardingStep[] = [
  {
    id: 'create_organization',
    title: 'Create your workspace',
    description: 'Set up your first organization workspace',
    completed: false,
  },
  {
    id: 'create_project',
    title: 'Create your first project',
    description: 'Start organizing your work with a project',
    completed: false,
  },
  {
    id: 'invite_member',
    title: 'Invite team members',
    description: 'Collaborate by inviting your team',
    completed: false,
  },
  {
    id: 'create_task',
    title: 'Create your first task',
    description: 'Add a task to start tracking your work',
    completed: false,
  },
  {
    id: 'explore_features',
    title: 'Explore features',
    description: 'Check out real-time collaboration and more',
    completed: false,
  },
];

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [steps, setSteps] = useState<OnboardingStep[]>(DEFAULT_STEPS);
  const [showWelcomeWizard, setShowWelcomeWizard] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  // Load onboarding state from localStorage
  useEffect(() => {
    if (user) {
      const storageKey = `flowsync-onboarding-${user.id}`;
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        try {
          const data = JSON.parse(stored);
          setSteps(data.steps || DEFAULT_STEPS);
          setShowWelcomeWizard(data.showWelcomeWizard ?? false);
          setShowChecklist(data.showChecklist ?? true);
        } catch (e) {
          console.error('Failed to parse onboarding state:', e);
        }
      } else {
        // First time user - show welcome wizard
        setShowWelcomeWizard(true);
        setShowChecklist(true);
      }
    }
  }, [user]);

  // Save onboarding state to localStorage
  const saveState = useCallback(
    (newSteps: OnboardingStep[], welcomeWizard: boolean, checklist: boolean) => {
      if (user) {
        const storageKey = `flowsync-onboarding-${user.id}`;
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            steps: newSteps,
            showWelcomeWizard: welcomeWizard,
            showChecklist: checklist,
          })
        );
      }
    },
    [user]
  );

  // Complete a step
  const completeStep = useCallback(
    (stepId: string) => {
      const newSteps = steps.map((step) =>
        step.id === stepId ? { ...step, completed: true } : step
      );
      setSteps(newSteps);
      saveState(newSteps, showWelcomeWizard, showChecklist);
    },
    [steps, showWelcomeWizard, showChecklist, saveState]
  );

  // Dismiss welcome wizard
  const dismissWelcomeWizard = useCallback(() => {
    setShowWelcomeWizard(false);
    saveState(steps, false, showChecklist);
  }, [steps, showChecklist, saveState]);

  // Dismiss checklist
  const dismissChecklist = useCallback(() => {
    setShowChecklist(false);
    saveState(steps, showWelcomeWizard, false);
  }, [steps, showWelcomeWizard, saveState]);

  // Reset onboarding (for testing or re-onboarding)
  const resetOnboarding = useCallback(() => {
    const resetSteps = DEFAULT_STEPS.map((step) => ({ ...step, completed: false }));
    setSteps(resetSteps);
    setShowWelcomeWizard(true);
    setShowChecklist(true);
    saveState(resetSteps, true, true);
  }, [saveState]);

  // Calculate progress
  const checklistProgress = Math.round(
    (steps.filter((s) => s.completed).length / steps.length) * 100
  );

  // Check if onboarding is complete
  const isOnboardingComplete = steps.every((s) => s.completed);

  const value: OnboardingContextType = {
    isOnboardingComplete,
    showWelcomeWizard,
    showChecklist,
    steps,
    completeStep,
    dismissWelcomeWizard,
    dismissChecklist,
    resetOnboarding,
    checklistProgress,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}

export default OnboardingContext;
