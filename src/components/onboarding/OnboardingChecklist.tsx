import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

export function OnboardingChecklist() {
  const {
    showChecklist,
    dismissChecklist,
    steps,
    checklistProgress,
    isOnboardingComplete,
  } = useOnboarding();

  const [isExpanded, setIsExpanded] = useState(true);

  if (!showChecklist || isOnboardingComplete) {
    return null;
  }

  const completedCount = steps.filter((s) => s.completed).length;
  const totalCount = steps.length;

  return (
    <AnimatePresence>
      {showChecklist && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 w-full max-w-sm"
        >
          <Card className="shadow-2xl border-2">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                    {checklistProgress === 100 && (
                      <Badge className="bg-green-500">
                        Complete!
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    Complete these steps to get the most out of FlowSync
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={dismissChecklist}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    {completedCount} of {totalCount} completed
                  </span>
                  <span className="font-semibold text-primary">{checklistProgress}%</span>
                </div>
                <Progress value={checklistProgress} className="h-2" />
              </div>
            </CardHeader>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent className="space-y-2 pt-0">
                    {steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          'flex items-start gap-3 p-3 rounded-lg transition-colors',
                          step.completed
                            ? 'bg-green-50 dark:bg-green-950/20'
                            : 'bg-muted/50 hover:bg-muted'
                        )}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              'text-sm font-medium',
                              step.completed && 'line-through text-muted-foreground'
                            )}
                          >
                            {step.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Motivational message */}
                    {checklistProgress > 0 && checklistProgress < 100 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg mt-4"
                      >
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <p className="text-xs font-medium text-primary">
                          Great progress! Keep going to unlock the full potential.
                        </p>
                      </motion.div>
                    )}

                    {checklistProgress === 100 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg mt-4"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <p className="text-xs font-medium text-green-600 dark:text-green-400">
                          🎉 You're all set! You can now dismiss this checklist.
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
