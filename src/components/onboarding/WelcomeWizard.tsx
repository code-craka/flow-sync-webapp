import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Users,
  Folder,
  CheckSquare,
  Zap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';

interface WizardStep {
  icon: React.ElementType;
  title: string;
  description: string;
  image?: string;
}

const wizardSteps: WizardStep[] = [
  {
    icon: Rocket,
    title: 'Welcome to FlowSync!',
    description:
      'Your all-in-one project management platform. Let\'s get you started with a quick tour of what you can do.',
  },
  {
    icon: Folder,
    title: 'Organize with Projects',
    description:
      'Create projects to organize your work. Each project can have multiple tasks, team members, and custom workflows.',
  },
  {
    icon: CheckSquare,
    title: 'Track Tasks Effortlessly',
    description:
      'Break down your projects into tasks. Assign them to team members, set due dates, and track progress in real-time.',
  },
  {
    icon: Users,
    title: 'Collaborate with Your Team',
    description:
      'Invite team members, assign roles, and collaborate in real-time. See who\'s online and working on what.',
  },
  {
    icon: Zap,
    title: 'Stay in Sync',
    description:
      'Get real-time updates, notifications, and activity feeds. Never miss an important update or deadline.',
  },
];

export function WelcomeWizard() {
  const { showWelcomeWizard, dismissWelcomeWizard } = useOnboarding();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === wizardSteps.length - 1;
  const progress = ((currentStep + 1) / wizardSteps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleComplete = () => {
    dismissWelcomeWizard();
  };

  const handleSkip = () => {
    dismissWelcomeWizard();
  };

  const step = wizardSteps[currentStep];
  const Icon = step.icon;

  return (
    <Dialog open={showWelcomeWizard} onOpenChange={handleSkip}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10"
          onClick={handleSkip}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Progress bar */}
        <div className="px-6 pt-6">
          <Progress value={progress} className="h-1" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <DialogHeader className="text-center space-y-4">
              {/* Icon */}
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-10 w-10 text-primary" />
              </div>

              {/* Title */}
              <DialogTitle className="text-2xl font-bold">
                {isFirstStep && user?.user_metadata?.full_name
                  ? `Welcome, ${user.user_metadata.full_name.split(' ')[0]}! 👋`
                  : step.title}
              </DialogTitle>

              {/* Description */}
              <DialogDescription className="text-base text-muted-foreground max-w-md mx-auto">
                {step.description}
              </DialogDescription>
            </DialogHeader>

            {/* Feature highlights for first step */}
            {isFirstStep && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 grid grid-cols-2 gap-4"
              >
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Sparkles className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Real-time Collaboration</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Instant Updates</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Team Management</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Folder className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Project Organization</p>
                </div>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex-1">
                {!isFirstStep && (
                  <Button variant="outline" onClick={handleBack} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>

              {/* Step indicators */}
              <div className="flex gap-2">
                {wizardSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-primary w-8'
                        : index < currentStep
                        ? 'bg-primary/50'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <div className="flex-1 flex justify-end gap-2">
                {!isLastStep && (
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext} className="gap-2">
                  {isLastStep ? (
                    <>
                      Get Started
                      <Rocket className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
