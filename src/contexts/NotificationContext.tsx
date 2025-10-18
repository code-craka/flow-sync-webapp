import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useOrganization } from './OrganizationContext';
import { useRealtime } from './RealtimeContext';
import { useToast } from '@/components/ui/use-toast';
import type { Notification } from '@/types';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'created_at'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { currentOrganization } = useOrganization();
  const { listen, broadcast } = useRealtime();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem(`flowsync-notifications-${user.id}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotifications(parsed);
      } catch (error) {
        console.error('Failed to parse notifications:', error);
      }
    }
  }, [user]);

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (!user || notifications.length === 0) return;

    localStorage.setItem(
      `flowsync-notifications-${user.id}`,
      JSON.stringify(notifications)
    );
  }, [user, notifications]);

  // Listen for real-time notifications
  useEffect(() => {
    if (!user || !currentOrganization) return;

    const channelName = `notifications:${user.id}`;

    const unsubscribe = listen(channelName, 'notification', (payload) => {
      const notification: Notification = {
        id: `notif-${Date.now()}-${Math.random()}`,
        read: false,
        created_at: new Date().toISOString(),
        ...payload,
      };

      // Add to notifications list
      setNotifications((prev) => [notification, ...prev]);

      // Show toast notification
      toast({
        title: notification.title,
        description: notification.message,
        duration: 5000,
      });
    });

    return unsubscribe;
  }, [user, currentOrganization, listen, toast]);

  // Add a new notification
  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'read' | 'created_at'>) => {
      const newNotification: Notification = {
        id: `notif-${Date.now()}-${Math.random()}`,
        read: false,
        created_at: new Date().toISOString(),
        ...notification,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Show toast
      toast({
        title: newNotification.title,
        description: newNotification.message,
        duration: 5000,
      });
    },
    [toast]
  );

  // Mark a notification as read
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    if (user) {
      localStorage.removeItem(`flowsync-notifications-${user.id}`);
    }
  }, [user]);

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
