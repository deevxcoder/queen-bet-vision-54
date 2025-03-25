
import React from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, Check, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-queen-success" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-queen-warning" />;
      case "error":
        return <XCircle className="h-5 w-5 text-queen-error" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-queen-dark to-queen-dark/95 py-10 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-queen-text-secondary">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                : "You're all caught up!"}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button 
              variant="outline" 
              className="border-white/10 text-white hover:bg-white/10 hover:text-white"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
            <Button 
              variant="outline" 
              className="border-white/10 text-white hover:bg-white/10 hover:text-white"
              onClick={clearNotifications}
              disabled={notifications.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <Card className="bg-white/5 border-white/10 text-white">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-16 w-16 text-white/20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
              <p className="text-queen-text-secondary text-center max-w-md">
                You don't have any notifications at the moment. We'll notify you when there are updates on your account or games.
              </p>
              <Button asChild className="mt-6 bg-queen-gold text-queen-dark hover:bg-queen-gold/90">
                <Link to="/dashboard">Return to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`bg-white/5 border-white/10 text-white transition-colors ${!notification.read ? 'bg-white/10' : ''}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getIcon(notification.type)}
                      <CardTitle className="text-lg">{notification.title}</CardTitle>
                    </div>
                    <span className="text-xs text-queen-text-secondary">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-queen-text-secondary">{notification.message}</p>
                </CardContent>
                {!notification.read && (
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
