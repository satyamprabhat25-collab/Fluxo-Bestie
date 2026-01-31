import { Link } from 'react-router-dom';
import { Crown, Calendar, CreditCard, ArrowLeft, Globe, Settings, Shield, Zap, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/hooks/usePremium';
import { format, differenceInDays } from 'date-fns';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { isPremium, subscription, isLoading } = usePremium();

  const daysRemaining = subscription?.expires_at 
    ? differenceInDays(new Date(subscription.expires_at), new Date())
    : 0;

  const totalDays = subscription?.plan === 'yearly' ? 365 : subscription?.plan === 'quarterly' ? 90 : 30;
  const progressPercent = subscription ? Math.max(0, Math.min(100, (daysRemaining / totalDays) * 100)) : 0;

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'monthly': return 'Monthly Plan';
      case 'quarterly': return 'Quarterly Plan';
      case 'yearly': return 'Yearly Plan';
      default: return plan;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <CardTitle>Sign in Required</CardTitle>
            <CardDescription>Please sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/auth">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Fluxo</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">
            Welcome back, {profile?.display_name || 'User'}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your subscription and account settings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Subscription Status Card */}
          <div className="lg:col-span-2">
            <Card className={`overflow-hidden ${isPremium ? 'border-amber-500/50' : ''}`}>
              {isPremium && (
                <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${isPremium ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-secondary'}`}>
                      <Crown className={`h-7 w-7 ${isPremium ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {isPremium ? 'Premium Member' : 'Free Account'}
                      </CardTitle>
                      <CardDescription>
                        {isPremium ? subscription?.plan && getPlanLabel(subscription.plan) : 'Upgrade to unlock all features'}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={isPremium ? 'default' : 'secondary'} className={isPremium ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-0' : ''}>
                    {isPremium ? 'Active' : 'Free'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isPremium && subscription ? (
                  <>
                    {/* Subscription Timeline */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subscription Progress</span>
                        <span className="font-medium">{daysRemaining} days remaining</span>
                      </div>
                      <Progress value={progressPercent} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Started: {format(new Date(subscription.starts_at), 'MMM d, yyyy')}</span>
                        <span>Expires: {format(new Date(subscription.expires_at), 'MMM d, yyyy')}</span>
                      </div>
                    </div>

                    {/* Subscription Details */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/50 rounded-xl">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">Next Billing</span>
                        </div>
                        <p className="font-semibold">{format(new Date(subscription.expires_at), 'MMMM d, yyyy')}</p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-xl">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <CreditCard className="h-4 w-4" />
                          <span className="text-sm">Plan Amount</span>
                        </div>
                        <p className="font-semibold">${subscription.amount} {subscription.currency}</p>
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-medium text-green-700 dark:text-green-400">All Premium Features Unlocked</p>
                        <p className="text-sm text-muted-foreground">Enjoy unlimited access to all premium content</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Upgrade Prompt */}
                    <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                      <h3 className="font-semibold text-lg mb-2">Unlock Premium Features</h3>
                      <p className="text-muted-foreground mb-4">
                        Get access to exclusive AI tools, NASA content, Discord, Figma, and 50+ premium websites.
                      </p>
                      <Link to="/premium">
                        <Button className="gap-2">
                          <Crown className="h-4 w-4" />
                          Upgrade Now - Starting at $5/month
                        </Button>
                      </Link>
                    </div>

                    {/* What You're Missing */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">What you're missing:</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {['NASA Space Tools', 'Advanced AI Generators', 'Discord & Figma Access', 'Premium Games', 'Professional Software', 'Notion Workspace'].map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/premium">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Crown className="h-5 w-5 text-amber-500" />
                    {isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}
                  </Button>
                </Link>
                <Link to={`/profile/${profile?.username}`}>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Settings className="h-5 w-5" />
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Shield className="h-5 w-5" />
                    Account Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Benefits Card */}
            {isPremium && (
              <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    Your Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {['Unlimited AI Tools', 'All Premium Links', 'Ad-Free Experience', 'Priority Support', 'Early Access'].map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Premium Content Preview */}
        <div className="mt-8">
          <h2 className="font-display font-bold text-2xl mb-6">
            {isPremium ? 'Your Premium Access' : 'Premium Content Preview'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'NASA Eyes', icon: '🚀', desc: 'Explore the universe' },
              { name: 'Midjourney AI', icon: '🎨', desc: 'AI image generation' },
              { name: 'Discord', icon: '💬', desc: 'Community platform' },
              { name: 'Figma', icon: '✏️', desc: 'Design tool' },
              { name: 'Notion', icon: '📝', desc: 'All-in-one workspace' },
              { name: 'RuneScape', icon: '⚔️', desc: 'Free MMORPG' },
              { name: 'ChatGPT', icon: '🤖', desc: 'AI assistant' },
              { name: 'Blender', icon: '🎬', desc: '3D creation suite' },
            ].map((item) => (
              <div
                key={item.name}
                className={`p-4 rounded-xl border ${isPremium ? 'bg-card hover:border-primary/50 cursor-pointer' : 'bg-secondary/30 opacity-70'} transition-all`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {!isPremium && (
                  <Badge variant="outline" className="mt-2 text-xs">Premium Only</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
