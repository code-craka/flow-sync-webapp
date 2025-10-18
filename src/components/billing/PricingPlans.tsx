import React, { useState } from 'react';
import { Check, Zap, Sparkles, Crown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganization } from '@/contexts/OrganizationContext';
import { createCheckoutSession } from '@/lib/polarClient';

// Define subscription plans
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for personal projects and small teams',
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    features: [
      '3 projects',
      '5 team members',
      '100 tasks per project',
      '1GB storage',
      'Basic task management',
      'Email support',
    ],
    limits: {
      projects: 3,
      members: 5,
      tasks: 100,
      storage: 1024, // MB
    },
    cta: 'Current Plan',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams that need more power',
    icon: Sparkles,
    price: { monthly: 15, yearly: 144 }, // $12/mo when billed yearly
    polarProductId: 'prod_pro_plan', // Replace with actual Polar product ID
    features: [
      'Unlimited projects',
      '25 team members',
      'Unlimited tasks',
      '50GB storage',
      'Advanced task management',
      'Real-time collaboration',
      'Priority email support',
      'Custom fields & templates',
    ],
    limits: {
      projects: -1, // unlimited
      members: 25,
      tasks: -1,
      storage: 51200, // 50GB in MB
    },
    cta: 'Upgrade to Pro',
    popular: true,
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    icon: Crown,
    price: { monthly: 49, yearly: 468 }, // $39/mo when billed yearly
    polarProductId: 'prod_enterprise_plan', // Replace with actual Polar product ID
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Unlimited storage',
      'Advanced security & compliance',
      'SSO & SAML',
      'Dedicated account manager',
      '99.9% SLA uptime',
      'Custom integrations',
      'Advanced analytics',
    ],
    limits: {
      projects: -1,
      members: -1,
      tasks: -1,
      storage: -1,
    },
    cta: 'Contact Sales',
    popular: false,
  },
];

interface PricingPlansProps {
  showCurrentPlan?: boolean;
}

export function PricingPlans({ showCurrentPlan = true }: PricingPlansProps) {
  const { user } = useAuth();
  const { currentOrganization } = useOrganization();
  const { toast } = useToast();

  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleUpgrade = async (plan: typeof PLANS[0]) => {
    if (!user || !currentOrganization) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to upgrade your plan.',
        variant: 'destructive',
      });
      return;
    }

    if (plan.id === 'free') {
      toast({
        title: 'Already on Free Plan',
        description: 'You are currently on the Free plan.',
      });
      return;
    }

    if (plan.id === 'enterprise') {
      // Redirect to contact sales
      window.location.href = '/company/contact?subject=Enterprise%20Plan';
      return;
    }

    if (!plan.polarProductId) {
      toast({
        title: 'Coming Soon',
        description: 'This plan will be available soon.',
        variant: 'destructive',
      });
      return;
    }

    setLoadingPlan(plan.id);

    try {
      // Create checkout session with Polar
      const checkoutSession = await createCheckoutSession({
        productId: plan.polarProductId,
        priceId: billingInterval === 'monthly' ? 'price_monthly' : 'price_yearly', // Replace with actual price IDs
        customerEmail: user.email,
        successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          organization_id: currentOrganization.id,
          user_id: user.id,
          plan: plan.id,
        },
      });

      // Redirect to Polar checkout
      window.location.href = checkoutSession.url;
    } catch (error: any) {
      console.error('Failed to create checkout session:', error);
      toast({
        title: 'Checkout Failed',
        description: error.message || 'Failed to start checkout process. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const calculateSavings = (plan: typeof PLANS[0]) => {
    if (billingInterval === 'monthly' || plan.price.monthly === 0) return null;

    const monthlyCost = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    const savings = monthlyCost - yearlyCost;
    const savingsPercent = Math.round((savings / monthlyCost) * 100);

    return { amount: savings, percent: savingsPercent };
  };

  return (
    <div className="space-y-8">
      {/* Billing Interval Toggle */}
      <div className="flex items-center justify-center gap-4">
        <Label htmlFor="billing-interval" className={billingInterval === 'monthly' ? 'font-semibold' : ''}>
          Monthly
        </Label>
        <Switch
          id="billing-interval"
          checked={billingInterval === 'yearly'}
          onCheckedChange={(checked) => setBillingInterval(checked ? 'yearly' : 'monthly')}
        />
        <Label htmlFor="billing-interval" className={billingInterval === 'yearly' ? 'font-semibold' : ''}>
          Yearly
        </Label>
        {billingInterval === 'yearly' && (
          <Badge variant="secondary" className="ml-2">
            Save up to 20%
          </Badge>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan, index) => {
          const Icon = plan.icon;
          const price = billingInterval === 'monthly' ? plan.price.monthly : plan.price.yearly / 12;
          const savings = calculateSavings(plan);
          const isLoading = loadingPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative ${plan.recommended ? 'border-primary shadow-lg' : ''}`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Most Popular</Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-8 w-8 ${plan.recommended ? 'text-primary' : 'text-muted-foreground'}`} />
                    {savings && (
                      <Badge variant="secondary" className="text-xs">
                        Save ${savings.amount}/year
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${price}</span>
                      {plan.price.monthly > 0 && <span className="text-muted-foreground">/month</span>}
                    </div>
                    {billingInterval === 'yearly' && plan.price.monthly > 0 && (
                      <p className="text-sm text-muted-foreground">
                        ${plan.price.yearly} billed annually
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.recommended ? 'default' : 'outline'}
                    onClick={() => handleUpgrade(plan)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Indicators */}
      <div className="text-center space-y-2 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          ✓ Cancel anytime • No hidden fees • 14-day money-back guarantee
        </p>
        <p className="text-xs text-muted-foreground">
          Secure payments powered by Polar
        </p>
      </div>
    </div>
  );
}
