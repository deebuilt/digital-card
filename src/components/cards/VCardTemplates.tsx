import React from 'react';
import { CardTemplateProps, getInitials, withAlpha, darken, lighten, buildContacts, buildSocials, Icons, ContactEntry } from './shared';

const ContactPill = ({ entry, accent }: { entry: ContactEntry; accent: string }) => {
  const Icon = entry.icon;
  const inner = (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <span style={{ color: accent }}><Icon size={14} /></span>
      <span className="text-[11px] text-gray-600 truncate">{entry.label}</span>
    </div>
  );
  if (entry.href) return <a href={entry.href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return inner;
};

const SocialCircle = ({ entry, accent }: { entry: ContactEntry; accent: string }) => {
  const Icon = entry.icon;
  const el = (
    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all" style={{ color: accent }}>
      <Icon size={14} />
    </div>
  );
  if (entry.href) return <a href={entry.href} target="_blank" rel="noopener noreferrer">{el}</a>;
  return el;
};

/** Centered profile card */
export const ProfileCard: React.FC<CardTemplateProps> = ({ card, cardRef }) => {
  const { fullName, title, businessName, photo, accentColor, showInitials } = card;
  const accent = accentColor || '#2D3748';
  const initials = getInitials(fullName || 'Your Name');
  const si = showInitials !== false;
  const showAvatar = photo || si;
  const contacts = buildContacts(card).filter(e => e.icon !== Icons.pin && e.icon !== Icons.instagram && e.icon !== Icons.facebook && e.icon !== Icons.linkedin && e.icon !== Icons.tiktok && e.icon !== Icons.twitter && e.icon !== Icons.youtube && e.icon !== Icons.whatsapp && e.icon !== Icons.threads);
  const socials = buildSocials(card);

  return (
    <div ref={cardRef} className="w-full overflow-hidden rounded-xl bg-white transition-all duration-300" style={{ maxWidth: 400, boxShadow: '0 2px 16px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)' }}>
      {/* Accent header band */}
      <div className="relative" style={{ height: showAvatar ? 80 : 6, background: `linear-gradient(135deg, ${accent}, ${darken(accent, 0.2)})` }}>
        {showAvatar && <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 0%, rgba(255,255,255,0.1), transparent 60%)' }} />}
      </div>
      {/* Profile photo / initials overlapping the band */}
      {showAvatar && (
        <div className="flex justify-center -mt-10 relative z-10">
          {photo ? (
            <img src={photo} alt="" className="w-20 h-20 rounded-full object-cover bg-white" style={{ border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-[24px] font-semibold tracking-wider bg-white" style={{ color: accent, border: `2.5px solid ${withAlpha(accent, 0.15)}`, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              {initials}
            </div>
          )}
        </div>
      )}
      {/* Name / title / business */}
      <div className="text-center px-5 pt-3 pb-1">
        <h2 className="text-[18px] font-semibold tracking-tight" style={{ color: '#1a1a1a' }}>{fullName || 'Your Name'}</h2>
        {title && <p className="mt-1 text-[10px] font-medium tracking-[0.15em] uppercase" style={{ color: accent }}>{title}</p>}
        {businessName && <p className="mt-0.5 text-[12px] font-medium text-gray-500">{businessName}</p>}
      </div>
      {/* Contact pills */}
      {contacts.length > 0 && (
        <div className="px-5 pt-2 pb-1 grid grid-cols-2 gap-2">
          {contacts.slice(0, 6).map(e => <ContactPill key={e.label} entry={e} accent={accent} />)}
        </div>
      )}
      {/* Address */}
      {card.address && (
        <div className="px-5 pt-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50">
            <span style={{ color: accent }}><Icons.pin size={14} /></span>
            <span className="text-[11px] text-gray-600">{card.address}</span>
          </div>
        </div>
      )}
      {/* Social icons row */}
      {socials.length > 0 && (
        <div className="px-5 pt-3 pb-1">
          <p className="text-[9px] text-gray-400 text-center mb-2 tracking-wide uppercase">Connect</p>
          <div className="flex justify-center gap-2">
            {socials.slice(0, 8).map(e => <SocialCircle key={e.label} entry={e} accent={accent} />)}
          </div>
        </div>
      )}
      <div className="h-4" />
    </div>
  );
};

/** Split card — accent panel left, content right */
export const SplitCard: React.FC<CardTemplateProps> = ({ card, cardRef }) => {
  const { fullName, title, businessName, photo, accentColor, showInitials } = card;
  const accent = accentColor || '#2D3748';
  const initials = getInitials(fullName || 'Your Name');
  const si = showInitials !== false;
  const contacts = buildContacts(card).filter(e => e.icon !== Icons.instagram && e.icon !== Icons.facebook && e.icon !== Icons.linkedin && e.icon !== Icons.tiktok && e.icon !== Icons.twitter && e.icon !== Icons.youtube && e.icon !== Icons.whatsapp && e.icon !== Icons.threads);
  const socials = buildSocials(card);

  return (
    <div ref={cardRef} className="w-full overflow-hidden rounded-xl bg-white transition-all duration-300" style={{ maxWidth: 400, boxShadow: '0 4px 20px -6px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)' }}>
      <div className="grid" style={{ gridTemplateColumns: '100px 1fr' }}>
        {/* Left accent panel */}
        <div className="flex flex-col items-center justify-between py-6 px-3 min-h-[280px]" style={{ background: `linear-gradient(180deg, ${accent}, ${darken(accent, 0.25)})` }}>
          {photo ? (
            <img src={photo} alt="" className="w-16 h-16 rounded-full object-cover" style={{ border: '2px solid rgba(255,255,255,0.2)' }} />
          ) : si ? (
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-[20px] font-semibold tracking-wider" style={{ color: 'rgba(255,255,255,0.9)', border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)' }}>
              {initials}
            </div>
          ) : <div />}
          {businessName && (
            <div className="text-center mt-3">
              <p className="text-[10px] font-medium leading-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>{businessName}</p>
            </div>
          )}
          {socials.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mt-auto pt-3">
              {socials.slice(0, 6).map(e => {
                const Icon = e.icon;
                const el = <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}><Icon size={11} /></div>;
                return e.href ? <a key={e.label} href={e.href} target="_blank" rel="noopener noreferrer">{el}</a> : <span key={e.label}>{el}</span>;
              })}
            </div>
          )}
        </div>
        {/* Right content */}
        <div className="flex flex-col justify-center px-4 py-5">
          <h2 className="text-[20px] font-bold tracking-tight" style={{ color: '#1a1a1a' }}>{fullName || 'Your Name'}</h2>
          {title && <p className="mt-1 text-[10px] font-medium tracking-[0.12em] uppercase" style={{ color: accent }}>{title}</p>}
          <div className="h-px w-10 my-3" style={{ background: withAlpha(accent, 0.2) }} />
          {contacts.length > 0 && (
            <div className="space-y-2">
              {contacts.slice(0, 6).map(e => {
                const Icon = e.icon;
                const inner = (
                  <div className="flex items-center gap-2">
                    <span style={{ color: accent }}><Icon size={13} /></span>
                    <span className="text-[11px] text-gray-600 truncate">{e.label}</span>
                  </div>
                );
                return e.href ? <a key={e.label} href={e.href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">{inner}</a> : <div key={e.label}>{inner}</div>;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/** Minimal stacked card */
export const StackedCard: React.FC<CardTemplateProps> = ({ card, cardRef }) => {
  const { fullName, title, businessName, photo, accentColor, showInitials } = card;
  const accent = accentColor || '#2D3748';
  const initials = getInitials(fullName || 'Your Name');
  const si = showInitials !== false;
  const showAvatar = photo || si;
  const contacts = buildContacts(card).filter(e => e.icon !== Icons.instagram && e.icon !== Icons.facebook && e.icon !== Icons.linkedin && e.icon !== Icons.tiktok && e.icon !== Icons.twitter && e.icon !== Icons.youtube && e.icon !== Icons.whatsapp && e.icon !== Icons.threads);
  const socials = buildSocials(card);

  return (
    <div ref={cardRef} className="w-full overflow-hidden rounded-xl bg-white transition-all duration-300" style={{ maxWidth: 400, boxShadow: `0 0 0 1px ${withAlpha(accent, 0.08)}, 0 4px 20px -8px rgba(0,0,0,0.08)` }}>
      <div className="flex flex-col items-center px-6 pt-8 pb-6">
        {/* Photo / initials */}
        {showAvatar && (
          photo ? (
            <img src={photo} alt="" className="w-[72px] h-[72px] rounded-full object-cover" style={{ border: `2.5px solid ${withAlpha(accent, 0.15)}`, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
          ) : (
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[22px] font-semibold tracking-wider" style={{ background: withAlpha(accent, 0.08), color: accent }}>
              {initials}
            </div>
          )
        )}
        {/* Name block */}
        <h2 className={`text-[20px] font-semibold tracking-tight text-center ${showAvatar ? 'mt-4' : ''}`} style={{ color: '#1a1a1a' }}>{fullName || 'Your Name'}</h2>
        {title && <p className="mt-1 text-[10px] font-medium tracking-[0.15em] uppercase text-center" style={{ color: accent }}>{title}</p>}
        {businessName && <p className="mt-0.5 text-[12px] text-gray-500 text-center">{businessName}</p>}
        {/* Divider */}
        <div className="w-10 h-px my-4" style={{ background: withAlpha(accent, 0.15) }} />
        {/* Contact rows */}
        {contacts.length > 0 && (
          <div className="w-full space-y-1.5">
            {contacts.slice(0, 6).map(e => {
              const Icon = e.icon;
              const inner = (
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: withAlpha(accent, 0.07) }}>
                    <span style={{ color: accent }}><Icon size={13} /></span>
                  </div>
                  <span className="text-[12px] text-gray-700 truncate">{e.label}</span>
                </div>
              );
              return e.href ? <a key={e.label} href={e.href} target="_blank" rel="noopener noreferrer">{inner}</a> : <div key={e.label}>{inner}</div>;
            })}
          </div>
        )}
        {/* Address */}
        {card.address && (
          <div className="w-full mt-1.5">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: withAlpha(accent, 0.07) }}>
                <span style={{ color: accent }}><Icons.pin size={13} /></span>
              </div>
              <span className="text-[12px] text-gray-700">{card.address}</span>
            </div>
          </div>
        )}
        {/* Social row */}
        {socials.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-center gap-2">
              {socials.slice(0, 8).map(e => <SocialCircle key={e.label} entry={e} accent={accent} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
