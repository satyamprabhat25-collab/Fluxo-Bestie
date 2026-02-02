import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostComposer } from '@/components/post/PostComposer';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function Compose() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container max-w-2xl mx-auto flex items-center gap-4 h-16 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-display font-bold text-lg">New Post</h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto">
        <div className="bg-card border-x border-border min-h-[calc(100vh-4rem)]">
          <PostComposer onSuccess={() => navigate('/')} placeholder="What's on your mind?" />
        </div>
      </main>
    </div>
  );
}
