import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './AuthContext';
import { useOrganization } from './OrganizationContext';
import type { RealtimeContextType, PresenceState } from '@/types';

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { currentOrganization } = useOrganization();
  const [channels, setChannels] = useState<Map<string, RealtimeChannel>>(new Map());
  const [presenceState, setPresenceState] = useState<Record<string, PresenceState>>({});
  const [connected, setConnected] = useState(false);

  // Subscribe to a channel with automatic cleanup
  const subscribe = useCallback(
    (channelName: string, config?: { broadcast?: boolean; presence?: boolean }) => {
      // Check if channel already exists
      if (channels.has(channelName)) {
        return channels.get(channelName)!;
      }

      console.log(`[Realtime] Subscribing to channel: ${channelName}`);

      // Create new channel
      const channel = supabase.channel(channelName, {
        config: {
          broadcast: config?.broadcast !== false ? { self: true } : undefined,
          presence: config?.presence !== false ? { key: user?.id || '' } : undefined,
        },
      });

      // Track presence changes if enabled
      if (config?.presence !== false) {
        channel.on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState();
          setPresenceState((prev) => ({
            ...prev,
            [channelName]: state as PresenceState,
          }));
        });

        channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
          console.log('[Realtime] User joined:', key, newPresences);
        });

        channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          console.log('[Realtime] User left:', key, leftPresences);
        });
      }

      // Subscribe to the channel
      channel.subscribe((status) => {
        console.log(`[Realtime] Channel ${channelName} status:`, status);
        setConnected(status === 'SUBSCRIBED');
      });

      // Store channel reference
      setChannels((prev) => new Map(prev).set(channelName, channel));

      return channel;
    },
    [channels, user?.id]
  );

  // Unsubscribe from a channel
  const unsubscribe = useCallback(
    async (channelName: string) => {
      const channel = channels.get(channelName);
      if (channel) {
        console.log(`[Realtime] Unsubscribing from channel: ${channelName}`);
        await supabase.removeChannel(channel);
        setChannels((prev) => {
          const newMap = new Map(prev);
          newMap.delete(channelName);
          return newMap;
        });
        setPresenceState((prev) => {
          const newState = { ...prev };
          delete newState[channelName];
          return newState;
        });
      }
    },
    [channels]
  );

  // Track presence in a channel
  const trackPresence = useCallback(
    async (channelName: string, metadata: Record<string, any> = {}) => {
      if (!user) return;

      const channel = channels.get(channelName) || subscribe(channelName, { presence: true });

      await channel.track({
        user_id: user.id,
        email: user.email,
        online_at: new Date().toISOString(),
        ...metadata,
      });
    },
    [user, channels, subscribe]
  );

  // Stop tracking presence in a channel
  const untrackPresence = useCallback(
    async (channelName: string) => {
      const channel = channels.get(channelName);
      if (channel) {
        await channel.untrack();
      }
    },
    [channels]
  );

  // Send a broadcast message
  const broadcast = useCallback(
    async (channelName: string, event: string, payload: any) => {
      const channel = channels.get(channelName) || subscribe(channelName, { broadcast: true });
      await channel.send({
        type: 'broadcast',
        event,
        payload,
      });
    },
    [channels, subscribe]
  );

  // Listen to broadcast messages
  const listen = useCallback(
    (channelName: string, event: string, callback: (payload: any) => void) => {
      const channel = channels.get(channelName) || subscribe(channelName, { broadcast: true });
      channel.on('broadcast', { event }, (payload) => {
        callback(payload.payload);
      });
      return () => {
        channel.off('broadcast', { event });
      };
    },
    [channels, subscribe]
  );

  // Get presence state for a channel
  const getPresence = useCallback(
    (channelName: string): PresenceState | undefined => {
      return presenceState[channelName];
    },
    [presenceState]
  );

  // Get list of online users in a channel
  const getOnlineUsers = useCallback(
    (channelName: string): any[] => {
      const presence = presenceState[channelName];
      if (!presence) return [];

      return Object.values(presence).flat();
    },
    [presenceState]
  );

  // Cleanup all channels on unmount or when organization changes
  useEffect(() => {
    return () => {
      channels.forEach(async (channel) => {
        await supabase.removeChannel(channel);
      });
      setChannels(new Map());
      setPresenceState({});
    };
  }, [currentOrganization?.id]);

  const value: RealtimeContextType = {
    connected,
    channels: Array.from(channels.keys()),
    subscribe,
    unsubscribe,
    trackPresence,
    untrackPresence,
    broadcast,
    listen,
    getPresence,
    getOnlineUsers,
  };

  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>;
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}
