import { useEffect, useState, useCallback } from 'react';
import { useRealtime } from '@/contexts/RealtimeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganization } from '@/contexts/OrganizationContext';

interface PresenceUser {
  user_id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  online_at: string;
  page?: string;
  [key: string]: any;
}

interface UsePresenceOptions {
  channelName?: string;
  metadata?: Record<string, any>;
  enabled?: boolean;
}

/**
 * Hook to track user presence in a channel
 *
 * @example
 * // Track presence in a project workspace
 * const { onlineUsers, isUserOnline } = usePresence({
 *   channelName: `project:${projectId}`,
 *   metadata: { page: 'workspace' }
 * });
 */
export function usePresence(options: UsePresenceOptions = {}) {
  const { user } = useAuth();
  const { currentOrganization } = useOrganization();
  const { trackPresence, untrackPresence, getOnlineUsers, subscribe } = useRealtime();

  const {
    channelName = currentOrganization ? `org:${currentOrganization.id}` : 'global',
    metadata = {},
    enabled = true,
  } = options;

  const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([]);

  // Track presence when component mounts
  useEffect(() => {
    if (!enabled || !user) return;

    // Subscribe to channel with presence enabled
    subscribe(channelName, { presence: true });

    // Track our presence
    const presenceMetadata = {
      full_name: user.email?.split('@')[0] || 'Anonymous',
      avatar_url: '',
      page: window.location.pathname,
      ...metadata,
    };

    trackPresence(channelName, presenceMetadata);

    // Update online users list periodically
    const interval = setInterval(() => {
      const users = getOnlineUsers(channelName);
      setOnlineUsers(users as PresenceUser[]);
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      untrackPresence(channelName);
    };
  }, [channelName, enabled, user, metadata]);

  // Check if a specific user is online
  const isUserOnline = useCallback(
    (userId: string): boolean => {
      return onlineUsers.some((u) => u.user_id === userId);
    },
    [onlineUsers]
  );

  // Get online user count
  const onlineCount = onlineUsers.length;

  // Get online users excluding current user
  const otherOnlineUsers = onlineUsers.filter((u) => u.user_id !== user?.id);

  return {
    onlineUsers,
    otherOnlineUsers,
    onlineCount,
    isUserOnline,
  };
}

/**
 * Hook to track presence in a specific project
 *
 * @example
 * const { onlineUsers, onlineCount } = useProjectPresence(projectId);
 */
export function useProjectPresence(projectId: string) {
  return usePresence({
    channelName: `project:${projectId}`,
    metadata: { page: 'project_workspace' },
  });
}

/**
 * Hook to track presence in a specific task
 *
 * @example
 * const { onlineUsers } = useTaskPresence(taskId);
 */
export function useTaskPresence(taskId: string) {
  return usePresence({
    channelName: `task:${taskId}`,
    metadata: { page: 'task_detail' },
  });
}
