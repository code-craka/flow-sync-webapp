import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Zap, Mail, Lock, User, Eye, EyeOff, Github } from 'lucide-react'; // Added Github, Eye, EyeOff
import { motion } from 'framer-motion';

// Reusable Google Icon component (same as SignInPage)
const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp, signInWithOAuth } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null); // 'google', 'github'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", description: "Please ensure both passwords are identical.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Password must be at least 6 characters long.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await signUp({ 
        email, 
        password, 
        options: { 
          data: { full_name: fullName || email.split('@')[0] },
          emailRedirectTo: `${window.location.origin}/auth/callback` // Or directly to /app/dashboard
        } 
      });
      if (error) throw error;
      toast({ 
        title: "Account created!", 
        description: "Please check your email to verify your account before signing in.",
        duration: 7000,
        className: "bg-card text-card-foreground rounded-xl shadow-lg",
      });
      // If email confirmation is not required by Supabase settings, this could be a direct navigation.
      // For now, assume email verification is needed.
      navigate('/auth/signin'); 
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error.message || "Could not create your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider) => {
    setOauthLoading(provider);
    try {
      const { error } = await signInWithOAuth({ 
        provider,
        options: {
          redirectTo: `${window.location.origin}/app/dashboard`,
          // Optionally add data if needed, though profile creation might handle it
          // data: { full_name: 'New User from OAuth' } // Example
        }
      });
      if (error) throw error;
      // Supabase handles redirection
    } catch (error) {
      toast({
        title: `Sign up with ${provider.charAt(0).toUpperCase() + provider.slice(1)} failed`,
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setOauthLoading(null);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="w-full shadow-2xl rounded-2xl border-border overflow-hidden">
        <CardHeader className="text-center p-6 sm:p-8 bg-muted/30">
          <Link to="/" className="inline-block mb-4">
            <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto" />
          </Link>
          <CardTitle className="text-2xl sm:text-3xl font-bold gradient-text">Create Your Account</CardTitle>
          <CardDescription className="text-muted-foreground text-sm sm:text-base">Join FlowSync AI and boost your productivity.</CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-8 py-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name (Optional)</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 h-11 sm:h-12 text-base rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-11 sm:h-12 text-base rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••• (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pl-10 pr-10 h-11 sm:h-12 text-base rounded-lg"
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-11 sm:h-12 text-base rounded-lg"
                />
                 <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full h-11 sm:h-12 text-base rounded-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
           <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <Button 
              variant="outline" 
              className="w-full h-11 sm:h-12 text-base rounded-lg border-border hover:bg-muted/80" 
              onClick={() => handleOAuthSignUp('google')}
              disabled={oauthLoading === 'google' || loading}
            >
              {oauthLoading === 'google' ? <Zap className="mr-2 h-5 w-5 animate-spin" /> : <GoogleIcon />}
              Continue with Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-11 sm:h-12 text-base rounded-lg border-border hover:bg-muted/80" 
              onClick={() => handleOAuthSignUp('github')}
              disabled={oauthLoading === 'github' || loading}
            >
              {oauthLoading === 'github' ? <Zap className="mr-2 h-5 w-5 animate-spin" /> : <Github className="mr-2 h-5 w-5" />}
              Continue with GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="px-6 sm:px-8 py-4 sm:py-6 text-center bg-muted/30 border-t">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/auth/signin" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SignUpPage;