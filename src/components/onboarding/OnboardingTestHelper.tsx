import React from 'react';
import { RotateCcw, Eye, EyeOff, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useOnboarding } from '@/contexts/OnboardingContext';

/**
 * Development-only component for testing onboarding flows
 *
 * IMPORTANT: Remove this component or hide it in production!
 */
export function OnboardingTestHelper() {
  const {
    steps,
    showWelcomeWizard,
    showChecklist,
    checklistProgress,
    resetOnboarding,
    dismissWelcomeWizard,
    dismissChecklist,
    completeStep,
  } = useOnboarding();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="fixed bottom-6 left-6 z-50 w-80 shadow-2xl border-2 border-yellow-500">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-500 text-white">
            DEV ONLY
          </Badge>
          <CardTitle className="text-sm">Onboarding Test Helper</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Testing tools for onboarding flow
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-xs">
        {/* Status */}
        <div className="space-y-1">
          <p className="font-semibold">Status:</p>
          <div className="flex items-center gap-2">
            <Badge variant={showWelcomeWizard ? 'default' : 'secondary'}>
              Wizard: {showWelcomeWizard ? 'Visible' : 'Hidden'}
            </Badge>
            <Badge variant={showChecklist ? 'default' : 'secondary'}>
              Checklist: {showChecklist ? 'Visible' : 'Hidden'}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Progress: {checklistProgress}% ({steps.filter((s) => s.completed).length}/{steps.length})
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-1">
          <p className="font-semibold">Steps:</p>
          {steps.map((step) => (
            <div key={step.id} className="flex items-center justify-between gap-2 p-1 rounded bg-muted/50">
              <span className={step.completed ? 'line-through text-muted-foreground' : ''}>
                {step.title}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2"
                onClick={() => completeStep(step.id)}
                disabled={step.completed}
              >
                <CheckSquare className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2 border-t">
          <Button
            size="sm"
            variant="destructive"
            onClick={resetOnboarding}
            className="gap-2 h-8"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Onboarding
          </Button>

          <div className="flex gap-2">
            {showWelcomeWizard && (
              <Button
                size="sm"
                variant="outline"
                onClick={dismissWelcomeWizard}
                className="gap-2 h-8 flex-1"
              >
                <EyeOff className="h-3 w-3" />
                Hide Wizard
              </Button>
            )}
            {!showWelcomeWizard && (
              <Button
                size="sm"
                variant="outline"
                onClick={resetOnboarding}
                className="gap-2 h-8 flex-1"
              >
                <Eye className="h-3 w-3" />
                Show Wizard
              </Button>
            )}

            {showChecklist && (
              <Button
                size="sm"
                variant="outline"
                onClick={dismissChecklist}
                className="gap-2 h-8 flex-1"
              >
                <EyeOff className="h-3 w-3" />
                Hide List
              </Button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center pt-2 border-t">
          This panel only appears in development mode
        </p>
      </CardContent>
    </Card>
  );
}
