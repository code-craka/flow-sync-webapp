import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getCheckoutSession } from '@/lib/polarClient';
import { useOrganization } from '@/contexts/OrganizationContext';
import { updateSubscription } from '@/lib/supabase/queries';
import type { PolarCheckoutSession } from '@/types';

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentOrganization } = useOrganization();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutSession, setCheckoutSession] = useState<PolarCheckoutSession | null>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setError('No checkout session ID provided');
      setLoading(false);
      return;
    }

    verifyCheckout();
  }, [sessionId]);

  const verifyCheckout = async () => {
    try {
      setLoading(true);

      // Fetch checkout session from Polar
      const session = await getCheckoutSession(sessionId!);

      if (session.status !== 'confirmed') {
        setError('Checkout session is not confirmed. Please contact support.');
        return;
      }

      setCheckoutSession(session);

      // Update organization subscription in database
      if (currentOrganization && session.customer_metadata) {
        await updateSubscription(currentOrganization.id, {
          status: 'active',
          plan: session.customer_metadata.plan as any,
          polar_subscription_id: session.id,
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        });
      }

      setLoading(false);
    } catch (err: any) {
      console.error('Failed to verify checkout:', err);
      setError(err.message || 'Failed to verify checkout. Please contact support.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Verifying your payment...</p>
            <p className="text-sm text-muted-foreground mt-2">This will only take a moment</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <Card className="w-full max-w-md border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Payment Verification Failed</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/pricing')}>
              Back to Pricing
            </Button>
            <Button onClick={() => navigate('/app/settings')}>
              Contact Support
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <CheckCircle2 className="h-24 w-24 text-primary relative" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-4xl mb-3">
                Payment Successful! 🎉
              </CardTitle>
              <CardDescription className="text-lg">
                Welcome to FlowSync Pro. Your subscription is now active.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Success Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 rounded-lg p-6 space-y-4"
            >
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                What's Next?
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Your organization has been upgraded</p>
                    <p className="text-muted-foreground">All new features are now available</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Confirmation email sent</p>
                    <p className="text-muted-foreground">Check your inbox for receipt and details</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Manage your subscription</p>
                    <p className="text-muted-foreground">Visit settings to update billing or cancel anytime</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* New Features Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/10 border border-primary/20 rounded-lg p-6"
            >
              <h3 className="font-semibold text-lg mb-3">🚀 You now have access to:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Unlimited projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>25 team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Unlimited tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>50GB storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Advanced features</span>
                </div>
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="flex gap-3 pt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/app/settings')}
              className="flex-1"
            >
              Manage Subscription
            </Button>
            <Button
              onClick={() => navigate('/app/dashboard')}
              className="flex-1"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
