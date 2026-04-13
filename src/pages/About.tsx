import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from '@/components/AppLogo';

const About: React.FC = () => {
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

        <h1 className="text-xl font-bold tracking-tight text-foreground mb-4">How to Use</h1>

        <div className="space-y-5 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-semibold text-foreground mb-1.5">1. Choose a style</h2>
            <p>Pick from <strong>Business Card</strong> layouts (landscape, great for image export and printing) or <strong>Contact Card</strong> layouts (portrait, designed for sharing links digitally).</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">2. Fill in your details</h2>
            <p>Enter your name, title, business, and contact info. Add social profiles under "more socials." Upload a photo or logo if you'd like.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">3. Customize</h2>
            <p>Pick an accent color from the palette or use the custom picker. Toggle initials on or off with the switch.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">4. Save your card</h2>
            <p>Tap <strong>Save Card</strong> to store your card locally. It'll be here next time you open the app — no account needed.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">5. Share it</h2>
            <p>You have several ways to share:</p>
            <ul className="mt-1.5 space-y-1 pl-4">
              <li className="flex items-start gap-2"><span className="text-muted-foreground shrink-0">Link</span> <span>— copies a shareable URL that shows your card in the browser</span></li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground shrink-0">Image</span> <span>— downloads a PNG of your card for social media or printing</span></li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground shrink-0">QR</span> <span>— generates a QR code that links to your card</span></li>
              <li className="flex items-start gap-2"><span className="text-muted-foreground shrink-0">vCard</span> <span>— downloads a .vcf file that adds your info (including photo) directly to someone's contacts</span></li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-1.5">Your data stays local</h2>
            <p>Everything is stored in your browser. Nothing is sent to any server. Shared links encode your card data directly in the URL — no backend required.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
