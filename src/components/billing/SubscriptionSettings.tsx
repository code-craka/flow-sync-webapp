import React, { useState } from 'react';
import { CreditCard, AlertTriangle, CheckCircle, XCircle, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

export function SubscriptionSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    subscription,
    loading,
    isActive,
    isPastDue,
    isCanceled,
    willCancelAtPeriodEnd,
    cancelSubscription,
    reactivateSubscription,
  } = useSubscription();

  const [canceling, setCanceling] = useState(false);
  const [reactivating, setReactivating] = useState(false);

  const handleCancelSubscription = async () => {
    setCanceling(true);

    try {
      await cancelSubscription();

      toast({
        title: 'Subscription Canceled',
        description: 'Your subscription will remain active until the end of the current billing period.',
      });
    } catch (error: any) {
      console.error('Failed to cancel subscription:', error);

      toast({
        title: 'Failed to Cancel',
        description: error.message || 'Could not cancel subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setCanceling(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setReactivating(true);

    try {
      await reactivateSubscription();

      toast({
        title: 'Subscription Reactivated',
        description: 'Your subscription has been reactivated and will continue normally.',
      });
    } catch (error: any) {
      console.error('Failed to reactivate subscription:', error);

      toast({
        title: 'Failed to Reactivate',
        description: error.message || 'Could not reactivate subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setReactivating(false);
    }
  };

  const getStatusBadge = () => {
    if (!subscription) {
      return <Badge variant="secondary">Free Plan</Badge>;
    }

    if (isActive && !willCancelAtPeriodEnd) {
      return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Active</Badge>;
    }

    if (willCancelAtPeriodEnd) {
      return <Badge variant="destructive"><AlertTriangle className="mr-1 h-3 w-3" /> Canceling</Badge>;
    }

    if (isPastDue) {
      return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Past Due</Badge>;
    }

    if (isCanceled) {
      return <Badge variant="secondary"><XCircle className="mr-1 h-3 w-3" /> Canceled</Badge>;
    }

    return <Badge variant="secondary">{subscription.status}</Badge>;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!subscription || subscription.plan === 'free') {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription
              </CardTitle>
              <CardDescription>You are currently on the Free plan</CardDescription>
            </div>
            <Badge variant="secondary">Free Plan</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upgrade to unlock unlimited projects, advanced features, and priority support.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm">Current Limits:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 3 projects</li>
              <li>• 5 team members</li>
              <li>• 100 tasks per project</li>
              <li>• 1GB storage</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={() => navigate('/pricing')} className="w-full">
            Upgrade to Pro
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription
            </CardTitle>
            <CardDescription>Manage your FlowSync subscription</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Plan Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Plan</span>
            <span className="text-sm capitalize">{subscription.plan}</span>
          </div>

          <Separator />

          {subscription.current_period_end && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {willCancelAtPeriodEnd ? 'Active Until' : 'Next Billing Date'}
                </span>
                <span className="text-sm">{formatDate(subscription.current_period_end)}</span>
              </div>
              <Separator />
            </>
          )}

          {subscription.stripe_customer_id && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Customer ID</span>
                <span className="text-sm font-mono text-muted-foreground">
                  {subscription.stripe_customer_id.slice(0, 20)}...
                </span>
              </div>
              <Separator />
            </>
          )}
        </div>

        {/* Warning Messages */}
        {willCancelAtPeriodEnd && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">Subscription Canceling</p>
                <p className="text-sm text-muted-foreground">
                  Your subscription will end on {formatDate(subscription.current_period_end)}.
                  You can reactivate it at any time before then.
                </p>
              </div>
            </div>
          </div>
        )}

        {isPastDue && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">Payment Failed</p>
                <p className="text-sm text-muted-foreground">
                  Your last payment failed. Please update your payment method to continue using FlowSync.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-3">
        {/* Change Plan */}
        <Button variant="outline" onClick={() => navigate('/pricing')} className="flex-1">
          Change Plan
        </Button>

        {/* Manage Billing (Polar Customer Portal) */}
        <Button variant="outline" asChild className="flex-1">
          <a href="https://polar.sh/dashboard" target="_blank" rel="noopener noreferrer">
            Manage Billing
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>

        {/* Cancel/Reactivate */}
        {isActive && !willCancelAtPeriodEnd && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-1">
                Cancel Subscription
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your subscription will remain active until {formatDate(subscription.current_period_end)}.
                  After that, you'll be downgraded to the Free plan. You can reactivate anytime before then.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancelSubscription}
                  disabled={canceling}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  {canceling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Canceling...
                    </>
                  ) : (
                    'Cancel Subscription'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {willCancelAtPeriodEnd && (
          <Button
            onClick={handleReactivateSubscription}
            disabled={reactivating}
            className="flex-1"
          >
            {reactivating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reactivating...
              </>
            ) : (
              'Reactivate Subscription'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
