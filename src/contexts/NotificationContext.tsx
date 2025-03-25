
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

// Initial mock notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Deposit Approved",
    message: "Your deposit of ₹5000 has been approved.",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    title: "Game Result",
    message: "Mumbai Matka results are out now!",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    title: "New Bonus",
    message: "You received a welcome bonus of ₹500!",
    type: "success",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    // Load notifications from localStorage or use initial notifications
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      setNotifications(initialNotifications);
    }
  }, []);

  useEffect(() => {
    // Save notifications to localStorage whenever they change
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const addNotification = (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications([newNotification, ...notifications]);
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      addNotification,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
