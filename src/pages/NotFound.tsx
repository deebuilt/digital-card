import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from '@/components/AppLogo';

const NotFound: React.FC = () => {
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

      <main className="max-w-[480px] mx-auto px-4 py-16 text-center">
        <p className="text-5xl font-light text-muted-foreground/30 mb-3">404</p>
        <p className="text-sm text-muted-foreground mb-6">This page doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="text-xs font-medium px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all"
        >
          Go home
        </button>
      </main>
    </div>
  );
};

export default NotFound;
