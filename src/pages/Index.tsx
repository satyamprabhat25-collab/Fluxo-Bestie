import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostCard } from '@/components/post/PostCard';
import { PostComposer } from '@/components/post/PostComposer';
import { usePosts } from '@/hooks/usePosts';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Index() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: posts, isLoading, refresh } = usePosts(user ? 'home' : 'explore');

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <MainLayout>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="border-b border-border p-4">
          <h1 className="font-display font-bold text-xl">Home</h1>
        </div>

        <PostComposer onSuccess={refresh} />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={refresh} onLike={refresh} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No posts yet. Start following people!</p>
            <Link to="/explore" className="mt-4 inline-block">
              <Button variant="soft">Explore</Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen gradient-warm">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-display font-bold text-xl">L</span>
            </div>
            <span className="font-display font-bold text-2xl">Lapi</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button>Join Lapi</Button>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <div className="animate-slide-up">
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
              Share your
              <span className="gradient-primary bg-clip-text text-transparent"> thoughts</span>
              <br />with the world
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Join Lapi, the friendly place to connect, share ideas, and discover what's happening around you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?mode=signup">
                <Button size="xl" className="w-full sm:w-auto">
                  Get started — it's free
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Explore posts
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50" />
            <div className="relative bg-card border border-border rounded-2xl shadow-lg p-6 animate-scale-in">
              <div className="flex gap-3 mb-4">
                <div className="h-12 w-12 rounded-full gradient-primary" />
                <div className="flex-1">
                  <div className="h-4 w-32 bg-muted rounded mb-2" />
                  <div className="h-3 w-24 bg-muted rounded" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Footer links */}
        <footer className="mt-16 pt-8 border-t border-border flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <span>© 2024 Lapi</span>
        </footer>
      </div>
    </div>
  );
}
