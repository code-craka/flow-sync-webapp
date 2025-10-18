import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

interface UseRealtimeSubscriptionOptions<T = any> {
  table: string;
  filter?: string; // e.g., "project_id=eq.123"
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  onInsert?: (record: T) => void;
  onUpdate?: (record: T, old: Partial<T>) => void;
  onDelete?: (record: T) => void;
  onChange?: (payload: RealtimePostgresChangesPayload<T>) => void;
  enabled?: boolean;
}

/**
 * Hook to subscribe to real-time database changes
 *
 * @example
 * // Subscribe to all task changes for a project
 * useRealtimeSubscription({
 *   table: 'tasks',
 *   filter: `project_id=eq.${projectId}`,
 *   onInsert: (task) => setTasks(prev => [...prev, task]),
 *   onUpdate: (task) => setTasks(prev => prev.map(t => t.id === task.id ? task : t)),
 *   onDelete: (task) => setTasks(prev => prev.filter(t => t.id !== task.id)),
 * });
 */
export function useRealtimeSubscription<T = any>(
  options: UseRealtimeSubscriptionOptions<T>
) {
  const {
    table,
    filter,
    event = '*',
    onInsert,
    onUpdate,
    onDelete,
    onChange,
    enabled = true,
  } = options;

  const channelRef = useRef<RealtimeChannel | null>(null);

  const handleChange = useCallback(
    (payload: RealtimePostgresChangesPayload<T>) => {
      console.log(`[Realtime] ${table} change:`, payload);

      // Call the generic onChange handler if provided
      if (onChange) {
        onChange(payload);
      }

      // Call specific event handlers
      switch (payload.eventType) {
        case 'INSERT':
          if (onInsert && payload.new) {
            onInsert(payload.new as T);
          }
          break;
        case 'UPDATE':
          if (onUpdate && payload.new) {
            onUpdate(payload.new as T, payload.old as Partial<T>);
          }
          break;
        case 'DELETE':
          if (onDelete && payload.old) {
            onDelete(payload.old as T);
          }
          break;
      }
    },
    [table, onChange, onInsert, onUpdate, onDelete]
  );

  useEffect(() => {
    if (!enabled) return;

    // Create unique channel name
    const channelName = `db-changes-${table}-${filter || 'all'}-${Date.now()}`;

    console.log(`[Realtime] Subscribing to ${table} changes`, { filter, event });

    // Create channel
    const channel = supabase.channel(channelName);

    // Subscribe to postgres changes
    const subscription = channel.on(
      'postgres_changes',
      {
        event,
        schema: 'public',
        table,
        filter,
      },
      handleChange
    );

    // Subscribe to the channel
    subscription.subscribe((status) => {
      console.log(`[Realtime] Subscription status for ${table}:`, status);
    });

    channelRef.current = channel;

    // Cleanup on unmount
    return () => {
      console.log(`[Realtime] Unsubscribing from ${table} changes`);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [table, filter, event, enabled, handleChange]);

  return null;
}

/**
 * Hook to subscribe to multiple tables at once
 *
 * @example
 * useRealtimeSubscriptions([
 *   { table: 'tasks', filter: `project_id=eq.${projectId}`, onInsert: handleTaskInsert },
 *   { table: 'comments', filter: `task_id=eq.${taskId}`, onInsert: handleCommentInsert },
 * ]);
 */
export function useRealtimeSubscriptions(
  subscriptions: UseRealtimeSubscriptionOptions[]
) {
  subscriptions.forEach((sub) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRealtimeSubscription(sub);
  });
}
