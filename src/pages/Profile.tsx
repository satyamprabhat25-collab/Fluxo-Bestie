import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, Edit2, Loader2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { MainLayout } from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/post/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile as ProfileType, Post } from '@/types';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle();
      if (error) throw error;
      return data as ProfileType | null;
    },
    enabled: !!username,
  });

  const { data: posts, isLoading: postsLoading, refetch: refetchPosts } = useQuery({
    queryKey: ['profile-posts', profile?.user_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', profile!.user_id)
        .order('created_at', { ascending: false });
      if (error) throw error;

      const postsWithCounts = await Promise.all(
        (data || []).map(async (post) => {
          const [likesResult, commentsResult, userLikeResult] = await Promise.all([
            supabase.from('likes').select('id', { count: 'exact', head: true }).eq('post_id', post.id),
            supabase.from('comments').select('id', { count: 'exact', head: true }).eq('post_id', post.id),
            user ? supabase.from('likes').select('id').eq('post_id', post.id).eq('user_id', user.id).maybeSingle() : null,
          ]);
          return {
            ...post,
            profiles: profile,
            likes_count: likesResult.count || 0,
            comments_count: commentsResult.count || 0,
            is_liked: !!userLikeResult?.data,
          } as Post;
        })
      );
      return postsWithCounts;
    },
    enabled: !!profile?.user_id,
  });

  const { data: stats } = useQuery({
    queryKey: ['profile-stats', profile?.user_id],
    queryFn: async () => {
      const [followersResult, followingResult] = await Promise.all([
        supabase.from('follows').select('id', { count: 'exact', head: true }).eq('following_id', profile!.user_id),
        supabase.from('follows').select('id', { count: 'exact', head: true }).eq('follower_id', profile!.user_id),
      ]);
      return { followers: followersResult.count || 0, following: followingResult.count || 0 };
    },
    enabled: !!profile?.user_id,
  });

  useEffect(() => {
    if (user && profile && user.id !== profile.user_id) {
      supabase.from('follows').select('id').eq('follower_id', user.id).eq('following_id', profile.user_id).maybeSingle()
        .then(({ data }) => setIsFollowing(!!data));
    }
  }, [user, profile]);

  const handleFollow = async () => {
    if (!user || !profile || followLoading) return;
    setFollowLoading(true);
    try {
      if (isFollowing) {
        await supabase.from('follows').delete().eq('follower_id', user.id).eq('following_id', profile.user_id);
        setIsFollowing(false);
        toast.success(`Unfollowed @${profile.username}`);
      } else {
        await supabase.from('follows').insert({ follower_id: user.id, following_id: profile.user_id });
        await supabase.from('notifications').insert({ user_id: profile.user_id, actor_id: user.id, type: 'follow' });
        setIsFollowing(true);
        toast.success(`Following @${profile.username}`);
      }
      queryClient.invalidateQueries({ queryKey: ['profile-stats', profile.user_id] });
    } catch { toast.error('Something went wrong'); }
    finally { setFollowLoading(false); }
  };

  const isOwnProfile = user?.id === profile?.user_id;

  if (profileLoading) {
    return <MainLayout><div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></MainLayout>;
  }

  if (!profile) {
    return <MainLayout><div className="bg-card border border-border rounded-2xl p-8 text-center"><h1 className="font-display font-bold text-2xl mb-2">User not found</h1><p className="text-muted-foreground mb-4">This account doesn't exist.</p><Link to="/"><Button variant="secondary">Go home</Button></Link></div></MainLayout>;
  }

  return (
    <MainLayout>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="relative">
          <div className="h-32 md:h-48 gradient-primary" />
          <Link to="/" className="absolute top-4 left-4"><Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <div className="absolute -bottom-16 left-6"><Avatar size="2xl" className="border-4 border-card"><AvatarImage src={profile.avatar_url || undefined} /><AvatarFallback className="text-3xl">{profile.display_name.charAt(0).toUpperCase()}</AvatarFallback></Avatar></div>
        </div>
        <div className="pt-20 px-6 pb-6">
          <div className="flex items-start justify-between mb-4">
            <div><h1 className="font-display font-bold text-2xl">{profile.display_name}</h1><p className="text-muted-foreground">@{profile.username}</p></div>
            {isOwnProfile ? <Link to="/settings"><Button variant="outline" size="sm"><Edit2 className="h-4 w-4 mr-2" />Edit profile</Button></Link> : user && <Button variant={isFollowing ? 'outline' : 'default'} size="sm" onClick={handleFollow} disabled={followLoading}>{isFollowing ? 'Following' : 'Follow'}</Button>}
          </div>
          {profile.bio && <p className="mb-4">{profile.bio}</p>}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4"><div className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /><span>Joined {format(new Date(profile.created_at), 'MMMM yyyy')}</span></div></div>
          <div className="flex gap-4 text-sm"><span><span className="font-bold">{stats?.following || 0}</span><span className="text-muted-foreground ml-1">Following</span></span><span><span className="font-bold">{stats?.followers || 0}</span><span className="text-muted-foreground ml-1">Followers</span></span></div>
        </div>
        <div className="border-t border-border">
          <div className="p-4 border-b border-border"><h2 className="font-display font-semibold">Posts</h2></div>
          {postsLoading ? <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : posts && posts.length > 0 ? <div>{posts.map((post) => <PostCard key={post.id} post={post} onDelete={() => refetchPosts()} onLike={() => refetchPosts()} />)}</div> : <div className="py-12 text-center"><p className="text-muted-foreground">No posts yet</p></div>}
        </div>
      </div>
    </MainLayout>
  );
}
