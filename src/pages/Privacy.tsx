import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from '@/components/AppLogo';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-[480px] mx-auto flex items-center gap-2.5 px-4 py-3">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
            <AppLogo size={28} />
            <span className="text-lg font-bold tracking-tight text-foreground">CardCraft</span>
          </button>
        </div>
      </header>

      <main className="max-w-[480px] mx-auto px-4 py-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <button onClick={() => navigate('/')} className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-4">
          <span className="mr-1">&larr;</span> Back
        </button>

        <h1 className="text-xl font-bold tracking-tight text-foreground mb-4">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground mb-6">Last updated: April 13, 2026</p>

        <div className="space-y-5 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-semibold text-foreground mb-1.5">No data collection</h2>
            <p>CardCraft does not collect, transmit, or store any personal information on external servers. All card data you enter stays entirely on your device in your browser's local storage.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">Local storage only</h2>
            <p>Your card information is saved to your browser's localStorage so it persists between sessions. This data never leaves your device. Clearing your browser data will remove it.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">Sharing</h2>
            <p>When you share a card via link, the card data (excluding photos) is encoded directly in the URL. No server is involved — the recipient's browser decodes the data from the URL itself. Photos are included in vCard (.vcf) file exports but are not transmitted to any server.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">No cookies or tracking</h2>
            <p>CardCraft does not use cookies, analytics, or any third-party tracking services. There are no ads and no account creation required.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">No account required</h2>
            <p>You do not need to create an account or provide any credentials to use CardCraft. The app works entirely offline after the initial page load.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">Contact</h2>
            <p>If you have questions about this privacy policy, you can reach out via the project's GitHub repository.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
