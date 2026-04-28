export type CardStyle = 'modern' | 'clean' | 'bold' | 'minimal' | 'neon' | 'profile' | 'split' | 'stacked' | 'handout';

export type CardSize = 'us-business' | 'eu-business' | 'square' | 'handout-4x6' | 'handout-5x7';

export type HandoutVariant = 'hero' | 'side' | 'corner';

/** Background treatment for the handout: 'light' = white card, 'dark' = accent gradient. */
export type HandoutTheme = 'light' | 'dark';

export type HandoutLogoSize = 'sm' | 'md' | 'lg';

export interface CardData {
  fullName: string;
  title: string;
  businessName: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  tiktok: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
  threads: string;
  address: string;
  photo: string;
  accentColor: string;
  cardStyle: CardStyle;
  showInitials: boolean;
  cardSize: CardSize;
  showPrintGuides: boolean;

  // Handout-only promo content. Optional so the existing CardData payloads
  // (business + contact cards) keep validating untouched.
  headline: string;
  subheadline: string;
  blurb: string;
  ctaLabel: string;
  ctaUrl: string;
  handoutVariant: HandoutVariant;
  handoutTheme: HandoutTheme;
  handoutLogoSize: HandoutLogoSize;
  /** Optional override for the headline + body text color. Empty = theme default. */
  headlineColor: string;
  /** Optional override for the QR code color. Empty = accent. */
  qrColor: string;
}

export const emptyCard: CardData = {
  fullName: '',
  title: '',
  businessName: '',
  phone: '',
  email: '',
  website: '',
  instagram: '',
  facebook: '',
  linkedin: '',
  tiktok: '',
  twitter: '',
  youtube: '',
  whatsapp: '',
  threads: '',
  address: '',
  photo: '',
  accentColor: '#2D3748',
  cardStyle: 'modern',
  showInitials: true,
  cardSize: 'us-business',
  showPrintGuides: false,
  headline: '',
  subheadline: '',
  blurb: '',
  ctaLabel: '',
  ctaUrl: '',
  handoutVariant: 'hero',
  handoutTheme: 'light',
  handoutLogoSize: 'md',
  headlineColor: '',
  qrColor: '',
};

export const demoCard: CardData = {
  fullName: 'Jordan Rivera',
  title: 'Owner & Lead Stylist',
  businessName: 'Glow Studio',
  phone: '+1 (555) 234-5678',
  email: 'jordan@glowstudio.com',
  website: 'https://glowstudio.com',
  instagram: '@glowstudio',
  facebook: 'https://facebook.com/glowstudio',
  linkedin: 'https://linkedin.com/in/jordanrivera',
  tiktok: '@glowstudio',
  twitter: '',
  youtube: '',
  whatsapp: '',
  threads: '',
  address: '742 Elm Street, Suite 3, Portland, OR 97205',
  photo: '',
  accentColor: '#4A6741',
  cardStyle: 'modern',
  showInitials: true,
  cardSize: 'us-business',
  showPrintGuides: false,
  headline: '',
  subheadline: '',
  blurb: '',
  ctaLabel: '',
  ctaUrl: '',
  handoutVariant: 'hero',
  handoutTheme: 'light',
  handoutLogoSize: 'md',
  headlineColor: '',
  qrColor: '',
};

export const demoHandout: Partial<CardData> = {
  cardStyle: 'handout',
  cardSize: 'handout-4x6',
  handoutVariant: 'hero',
  handoutTheme: 'light',
  headline: 'Find your style',
  subheadline: 'New client offer',
  blurb: '<p>20% off your first cut. Scan to book.</p>',
  ctaLabel: 'Book online',
  ctaUrl: 'https://opsette.io',
  fullName: 'Glow Studio',
  businessName: '',
  accentColor: '#4A6741',
};

export const BUSINESS_STYLES: CardStyle[] = ['modern', 'clean', 'bold', 'minimal', 'neon'];
export const CONTACT_STYLES: CardStyle[] = ['profile', 'split', 'stacked'];
export const HANDOUT_STYLES: CardStyle[] = ['handout'];

export const isBusinessStyle = (s: CardStyle) => BUSINESS_STYLES.includes(s);
export const isContactStyle = (s: CardStyle) => CONTACT_STYLES.includes(s);
export const isHandoutStyle = (s: CardStyle) => HANDOUT_STYLES.includes(s);
