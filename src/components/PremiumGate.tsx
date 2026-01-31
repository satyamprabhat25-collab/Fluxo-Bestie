import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Lock, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/hooks/usePremium';

interface PremiumGateProps {
  children: React.ReactNode;
  isPremiumContent: boolean;
  title?: string;
}

export function PremiumGate({ children, isPremiumContent, title }: PremiumGateProps) {
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isPremiumContent && !isPremium) {
      e.preventDefault();
      e.stopPropagation();
      setShowModal(true);
    }
  };

  return (
    <>
      <div onClick={handleClick} className="contents">
        {children}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Premium Content
            </DialogTitle>
            <DialogDescription className="text-center">
              {title ? (
                <span className="font-medium text-foreground">{title}</span>
              ) : (
                'This content'
              )}{' '}
              is only available for premium members.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4 text-amber-500" />
                <span>Access to all premium links</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4 text-amber-500" />
                <span>AI tools & image generators</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4 text-amber-500" />
                <span>Exclusive content & features</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {!user ? (
                <>
                  <Link to="/auth" onClick={() => setShowModal(false)}>
                    <Button className="w-full" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setShowModal(false)}>
                    <Button className="w-full gap-2">
                      <Sparkles className="h-4 w-4" />
                      Sign Up Free
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/premium" onClick={() => setShowModal(false)}>
                  <Button className="w-full gap-2">
                    <Crown className="h-4 w-4" />
                    Get Premium - Starting at $5/month
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
