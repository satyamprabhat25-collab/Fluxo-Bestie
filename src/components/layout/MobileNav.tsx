import { Link, useLocation } from 'react-router-dom';
import { Bell, Home, PenSquare, Search, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const { user, profile } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/explore', icon: Search, label: 'Explore' },
    { href: '/compose', icon: PenSquare, label: 'Post', special: true },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
    { href: `/profile/${profile?.username}`, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          if (item.special) {
            return (
              <Link key={item.href} to={item.href}>
                <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center shadow-md">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
