
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const updateUserProfile = async (user) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
        updated_at: new Date(),
      }, { onConflict: 'id' });

    if (error) {
      console.error('Error updating user profile:', error);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await updateUserProfile(session.user);
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (_event === 'SIGNED_IN' || _event === 'USER_UPDATED') {
        await updateUserProfile(session.user);
      }
      if (_event === 'INITIAL_SESSION') {
        setLoading(false);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    loading,
    signIn: (options) => supabase.auth.signInWithPassword(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => supabase.auth.signOut(),
    signInWithOAuth: (options) => supabase.auth.signInWithOAuth(options),
    signInWithOtp: (options) => supabase.auth.signInWithOtp(options),
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
