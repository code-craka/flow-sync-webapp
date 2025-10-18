import React from 'react';
import { TrendingUp, Lock, Sparkles, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
  limitType?: 'projects' | 'members' | 'tasks' | 'storage';
  title?: string;
  description?: string;
}

export function UpgradePrompt({
  isOpen,
  onClose,
  feature,
  limitType,
  title,
  description,
}: UpgradePromptProps) {
  const navigate = useNavigate();
  const { subscription } = useSubscription();

  const handleUpgrade = () => {
    onClose();
    navigate('/pricing');
  };

  // Generate dynamic content based on limit type
  const getContent = () => {
    if (title && description) {
      return { title, description };
    }

    const limitMessages = {
      projects: {
        title: 'Project Limit Reached',
        description: "You've reached your limit of 3 projects on the Free plan. Upgrade to Pro for unlimited projects and advanced features.",
      },
      members: {
        title: 'Team Member Limit Reached',
        description: "You've reached your limit of 5 team members on the Free plan. Upgrade to Pro to add up to 25 members.",
      },
      tasks: {
        title: 'Task Limit Reached',
        description: "You've reached your limit of 100 tasks per project on the Free plan. Upgrade to Pro for unlimited tasks.",
      },
      storage: {
        title: 'Storage Limit Reached',
        description: "You've reached your 1GB storage limit on the Free plan. Upgrade to Pro for 50GB of storage.",
      },
    };

    if (limitType && limitMessages[limitType]) {
      return limitMessages[limitType];
    }

    return {
      title: feature ? `${feature} is a Pro Feature` : 'Upgrade to Pro',
      description: 'This feature is available on the Pro and Enterprise plans. Upgrade to unlock advanced capabilities.',
    };
  };

  const content = getContent();

  const proFeatures = [
    'Unlimited projects',
    'Unlimited tasks',
    '25 team members',
    '50GB storage',
    'Priority support',
    'Advanced analytics',
    'Custom fields & templates',
    'Real-time collaboration',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <Badge className="bg-primary">Pro Feature</Badge>
          </div>
          <DialogTitle className="text-2xl">{content.title}</DialogTitle>
          <DialogDescription className="text-base">{content.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Plan */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Plan</span>
              <Badge variant="secondary" className="capitalize">
                {subscription?.plan || 'Free'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              You're currently on the {subscription?.plan || 'Free'} plan with limited features.
            </p>
          </div>

          {/* Pro Features */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Unlock with Pro
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {proFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing Preview */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">Pro Plan</p>
                <p className="text-sm text-muted-foreground">Everything you need to scale</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">$15</p>
                <p className="text-sm text-muted-foreground">/month</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              💡 Save 20% with annual billing
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button onClick={handleUpgrade} className="gap-2">
            <TrendingUp className="h-4 w-4" />
            View Plans
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Inline upgrade prompt for contextual upgrades
 */
interface InlineUpgradePromptProps {
  feature?: string;
  limitType?: 'projects' | 'members' | 'tasks' | 'storage';
  onUpgrade?: () => void;
}

export function InlineUpgradePrompt({ feature, limitType, onUpgrade }: InlineUpgradePromptProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/pricing');
    }
  };

  const getMessage = () => {
    const messages = {
      projects: "You've reached your project limit.",
      members: "You've reached your team member limit.",
      tasks: "You've reached your task limit.",
      storage: "You've reached your storage limit.",
    };

    if (limitType) {
      return messages[limitType] || 'Upgrade to unlock more.';
    }

    return feature ? `${feature} is a Pro feature.` : 'Upgrade to unlock this feature.';
  };

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium text-sm mb-1">{getMessage()}</p>
          <p className="text-sm text-muted-foreground mb-3">
            Upgrade to Pro for unlimited access and advanced features.
          </p>
          <Button size="sm" onClick={handleUpgrade} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
