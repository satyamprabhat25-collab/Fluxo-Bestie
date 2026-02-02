import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Repeat2, UserPlus, Loader2, Bell } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Notification, Profile } from '@/types';

export default function Notifications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;

      // Fetch actor profiles
      const actorIds = [...new Set(data?.map(n => n.actor_id) || [])];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .in('user_id', actorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));

      return data?.map(n => ({
        ...n,
        actor: profileMap.get(n.actor_id),
      })) as (Notification & { actor: Profile })[];
    },
    enabled: !!user,
  });

  // Mark notifications as read
  useEffect(() => {
    if (user && notifications?.some(n => !n.is_read)) {
      supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['notifications', user.id] });
        });
    }
  }, [user, notifications, queryClient]);

  if (!user) {
    return (
      <MainLayout>
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">Please sign in to view notifications.</p>
        </div>
      </MainLayout>
    );
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-primary fill-current" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-accent" />;
      case 'repost':
        return <Repeat2 className="h-5 w-5 text-success" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-primary" />;
    }
  };

  const getNotificationText = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'repost':
        return 'reposted your post';
      case 'follow':
        return 'followed you';
    }
  };

  return (
    <MainLayout>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="border-b border-border p-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h1 className="font-display font-bold text-xl">Notifications</h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : notifications && notifications.length > 0 ? (
          <div>
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                to={notification.type === 'follow' 
                  ? `/profile/${notification.actor?.username}` 
                  : `/post/${notification.post_id}`
                }
                className="flex items-start gap-3 p-4 border-b border-border hover:bg-secondary/30 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <Avatar size="sm">
                  <AvatarImage src={notification.actor?.avatar_url || undefined} />
                  <AvatarFallback>
                    {notification.actor?.display_name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p>
                    <span className="font-semibold">{notification.actor?.display_name}</span>
                    {' '}
                    <span className="text-muted-foreground">{getNotificationText(notification.type)}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
