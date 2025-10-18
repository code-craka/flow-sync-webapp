import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getInvitationByToken, acceptInvitation, declineInvitation } from '@/lib/supabase/queries';
import type { Invitation } from '@/types';

export default function AcceptInvitationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const { toast } = useToast();

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    loadInvitation();
  }, [token]);

  const loadInvitation = async () => {
    if (!token) {
      setError('Invalid invitation link. No token provided.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const inv = await getInvitationByToken(token);

      // Check if invitation is valid
      if (inv.status !== 'pending') {
        setError('This invitation has already been ' + inv.status + '.');
        setLoading(false);
        return;
      }

      // Check if expired
      const expiresAt = new Date(inv.expires_at);
      if (expiresAt < new Date()) {
        setError('This invitation has expired.');
        setLoading(false);
        return;
      }

      setInvitation(inv);
      setLoading(false);
    } catch (err: any) {
      console.error('Failed to load invitation:', err);
      setError(err.message || 'Failed to load invitation. The link may be invalid.');
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!invitation || !user) {
      if (!user) {
        // Redirect to sign up with return URL
        navigate(`/auth/signup?redirect=/accept-invitation?token=${token}`);
        return;
      }
      return;
    }

    setAccepting(true);

    try {
      await acceptInvitation(invitation.id, user.id);

      toast({
        title: 'Invitation Accepted',
        description: 'You have successfully joined the organization!',
        variant: 'success',
      });

      // Redirect to dashboard
      setTimeout(() => {
        navigate('/app/dashboard');
      }, 1500);
    } catch (err: any) {
      console.error('Failed to accept invitation:', err);

      toast({
        title: 'Failed to Accept',
        description: err.message || 'Failed to accept invitation. Please try again.',
        variant: 'destructive',
      });

      setAccepting(false);
    }
  };

  const handleDecline = async () => {
    if (!invitation) return;

    setDeclining(true);

    try {
      await declineInvitation(invitation.id);

      toast({
        title: 'Invitation Declined',
        description: 'You have declined the invitation.',
      });

      // Redirect to home
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      console.error('Failed to decline invitation:', err);

      toast({
        title: 'Failed to Decline',
        description: err.message || 'Failed to decline invitation. Please try again.',
        variant: 'destructive',
      });

      setDeclining(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md border-destructive">
            <CardContent className="pt-6 flex flex-col items-center gap-4">
              <AlertTriangle className="h-12 w-12 text-destructive" />
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Invalid Invitation</h2>
                <p className="text-muted-foreground">{error}</p>
              </div>
              <Button onClick={() => navigate('/')} className="mt-4">
                Go to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">You've Been Invited!</CardTitle>
            <CardDescription>
              You have been invited to join an organization on FlowSync
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Invitation Details */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Organization</p>
                    <p className="font-semibold">
                      {/* TODO: Fetch organization name from ID */}
                      Organization Name
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-semibold capitalize">{invitation.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Invited Email</p>
                    <p className="font-mono text-sm">{invitation.email}</p>
                  </div>
                </div>
              </div>

              {/* User Status */}
              {!session && (
                <div className="p-4 border border-primary/50 rounded-lg bg-primary/5">
                  <p className="text-sm">
                    You need to sign in or create an account to accept this invitation.
                  </p>
                </div>
              )}

              {session && user?.email !== invitation.email && (
                <div className="p-4 border border-amber-500/50 rounded-lg bg-amber-500/5">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    <strong>Note:</strong> You are currently signed in as{' '}
                    <span className="font-mono">{user?.email}</span>, but this invitation was
                    sent to <span className="font-mono">{invitation.email}</span>.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleAccept}
                disabled={accepting || declining}
                className="w-full"
                size="lg"
              >
                {accepting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {session ? 'Accept Invitation' : 'Sign Up & Accept'}
                  </>
                )}
              </Button>

              <Button
                onClick={handleDecline}
                disabled={accepting || declining}
                variant="outline"
                className="w-full"
                size="lg"
              >
                {declining ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Declining...
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Decline
                  </>
                )}
              </Button>
            </div>

            {/* Expiration Notice */}
            <p className="text-xs text-muted-foreground text-center">
              This invitation expires on{' '}
              {new Date(invitation.expires_at).toLocaleDateString()} at{' '}
              {new Date(invitation.expires_at).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
