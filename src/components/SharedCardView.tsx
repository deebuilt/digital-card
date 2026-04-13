import React, { useState } from 'react';
import { CardData } from '@/types/card';
import CardPreview from './CardPreview';
import QrModal from './QrModal';
import AppLogo from './AppLogo';
import { downloadVCard } from '@/lib/vcard';
import { toast } from 'sonner';

interface SharedCardViewProps {
  card: CardData;
}

const SharedCardView: React.FC<SharedCardViewProps> = ({ card }) => {
  const [qrOpen, setQrOpen] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied');
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Minimal header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-[480px] mx-auto flex items-center gap-2.5 px-4 py-3">
          <AppLogo size={24} />
          <span className="text-sm font-bold tracking-tight text-foreground">CardCraft</span>
        </div>
      </header>

      <main className="max-w-[480px] mx-auto px-4 py-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="animate-scale-in">
          <CardPreview card={card} />
        </div>

        <div className="mt-4 bg-card rounded-xl p-3 border border-border/60 animate-fade-in-up" style={{ animationDelay: '0.1s', boxShadow: '0 2px 6px -1px rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.04)' }}>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { downloadVCard(card); toast.success('Contact saved'); }}
              className="flex items-center justify-center gap-1.5 text-xs font-medium h-10 rounded-lg bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all col-span-2"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 2h3v12H3V2h3M6 2a2 2 0 114 0M6 8h4M6 10.5h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Save Contact
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="flex items-center justify-center gap-1.5 text-xs font-medium h-10 rounded-lg border border-border hover:bg-accent active:scale-[0.98] transition-all text-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="2" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="9" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2"/><rect x="10" y="10" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/></svg>
              QR
            </button>
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-1.5 text-xs font-medium h-10 rounded-lg border border-border hover:bg-accent active:scale-[0.98] transition-all text-foreground col-span-3"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6.5 9.5l3-3M9 6a2.5 2.5 0 013.5 3.5l-2 2A2.5 2.5 0 017 8M7 10a2.5 2.5 0 01-3.5-3.5l2-2A2.5 2.5 0 019 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Copy Link
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Made with CardCraft
        </p>
      </main>

      <QrModal card={card} open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  );
};

export default SharedCardView;
