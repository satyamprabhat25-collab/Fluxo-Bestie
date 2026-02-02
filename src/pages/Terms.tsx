import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container max-w-3xl mx-auto flex items-center gap-4 h-16 px-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-display font-bold text-lg">Terms of Service</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto py-8 px-4">
        <div className="bg-card border border-border rounded-2xl p-8">
          <h1 className="font-display font-bold text-3xl mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-4">Last updated: December 2024</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="font-display font-semibold text-xl mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using Lapi, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these 
                terms, you are prohibited from using this service.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">2. User Accounts</h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account and 
                password. You agree to accept responsibility for all activities that occur 
                under your account.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">3. User Content</h2>
              <p className="text-muted-foreground">
                You retain ownership of content you post on Lapi. By posting content, you 
                grant us a non-exclusive license to use, display, and distribute your content 
                on our platform.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">4. Prohibited Conduct</h2>
              <p className="text-muted-foreground">
                You agree not to post content that is illegal, harmful, threatening, abusive, 
                harassing, defamatory, or otherwise objectionable. We reserve the right to 
                remove content and suspend accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">5. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account at any time, without prior notice 
                or liability, for any reason, including if you breach these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Lapi shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">7. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users 
                of significant changes. Your continued use of Lapi after changes constitutes 
                acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
