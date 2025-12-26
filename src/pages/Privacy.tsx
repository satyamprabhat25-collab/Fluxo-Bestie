import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container max-w-3xl mx-auto flex items-center gap-4 h-16 px-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-display font-bold text-lg">Privacy Policy</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto py-8 px-4">
        <div className="bg-card border border-border rounded-2xl p-8">
          <h1 className="font-display font-bold text-3xl mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-4">Last updated: December 2024</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="font-display font-semibold text-xl mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, 
                post content, or communicate with us. This includes your email address, username, 
                display name, profile picture, and any content you share.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, 
                to communicate with you, and to personalize your experience on Lapi.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share your information with third 
                parties only as described in this policy or with your consent.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">4. Data Security</h2>
              <p className="text-muted-foreground">
                We take reasonable measures to help protect your personal information from loss, 
                theft, misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">5. Your Rights</h2>
              <p className="text-muted-foreground">
                You may access, update, or delete your account information at any time through 
                your account settings. You can also contact us to exercise your data protection rights.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl mb-3">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
