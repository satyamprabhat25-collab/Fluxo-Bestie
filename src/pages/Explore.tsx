import { useState } from 'react';
import { Search, Loader2, TrendingUp } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostCard } from '@/components/post/PostCard';
import { Input } from '@/components/ui/input';
import { usePosts } from '@/hooks/usePosts';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: posts, isLoading, refresh } = usePosts('explore');
  const { user } = useAuth();

  const { data: suggestedUsers } = useQuery({
    queryKey: ['suggested-users', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .neq('user_id', user?.id || '')
        .limit(5);
      return data as Profile[];
    },
    enabled: !!user,
  });

  const filteredPosts = posts?.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.profiles?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.profiles?.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-4">
        {/* Search */}
        <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search posts, people, or hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Posts */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="border-b border-border p-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-lg">Explore</h2>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : filteredPosts && filteredPosts.length > 0 ? (
                <div>
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} onDelete={refresh} onLike={refresh} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No results found' : 'No posts yet. Be the first!'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Suggested Users */}
          {user && suggestedUsers && suggestedUsers.length > 0 && (
            <div className="hidden lg:block">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-sm sticky top-20">
                <h3 className="font-display font-semibold text-lg mb-4">Who to follow</h3>
                <div className="space-y-4">
                  {suggestedUsers.map((profile) => (
                    <Link
                      key={profile.id}
                      to={`/profile/${profile.username}`}
                      className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <Avatar size="md">
                        <AvatarImage src={profile.avatar_url || undefined} />
                        <AvatarFallback>
                          {profile.display_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{profile.display_name}</p>
                        <p className="text-sm text-muted-foreground truncate">@{profile.username}</p>
                      </div>
                      <Button variant="soft" size="sm">Follow</Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
