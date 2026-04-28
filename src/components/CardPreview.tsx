import React from 'react';
import { CardData, isBusinessStyle, isHandoutStyle } from '@/types/card';
import { MonogramCard, WordmarkCard, FullBleedCard, EditorialCard, DarkCard } from './cards/BusinessCards';
import { ProfileCard, SplitCard, StackedCard } from './cards/VCardTemplates';
import { HandoutCard } from './cards/HandoutCard';
import { getDimensions, type Dimensions } from '@/lib/print';

interface CardPreviewProps {
  card: CardData;
  cardRef?: React.RefObject<HTMLDivElement>;
  showGuides?: boolean;
}

const templates: Record<string, React.FC<{ card: CardData; cardRef?: React.RefObject<HTMLDivElement>; dimensions?: Dimensions }>> = {
  modern: MonogramCard,
  clean: WordmarkCard,
  bold: FullBleedCard,
  minimal: EditorialCard,
  neon: DarkCard,
  profile: ProfileCard,
  split: SplitCard,
  stacked: StackedCard,
  handout: HandoutCard,
};

const PrintGuides: React.FC<{ dimensions: Dimensions }> = ({ dimensions }) => {
  const bleedPctW = (0.125 / dimensions.trimWIn) * 100;
  const bleedPctH = (0.125 / dimensions.trimHIn) * 100;
  const safePctW = (0.125 / dimensions.trimWIn) * 100;
  const safePctH = (0.125 / dimensions.trimHIn) * 100;

  return (
    <div className="no-print" aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      <div
        style={{
          position: 'absolute',
          left: `${safePctW}%`,
          right: `${safePctW}%`,
          top: `${safePctH}%`,
          bottom: `${safePctH}%`,
          border: '1px dashed rgba(34, 197, 94, 0.7)',
          borderRadius: 6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `-${bleedPctW}%`,
          right: `-${bleedPctW}%`,
          top: `-${bleedPctH}%`,
          bottom: `-${bleedPctH}%`,
          border: '1px dashed rgba(239, 68, 68, 0.55)',
          borderRadius: 8,
        }}
      />
    </div>
  );
};

const CardPreview: React.FC<CardPreviewProps> = ({ card, cardRef, showGuides }) => {
  const Template = templates[card.cardStyle] || MonogramCard;
  const dims = getDimensions(card.cardSize);
  const isBusiness = isBusinessStyle(card.cardStyle);
  const isHandout = isHandoutStyle(card.cardStyle);
  // Handout templates and business templates both want dimensions to drive
  // their aspect ratio. Contact templates are dimensionless.
  const passDims = isBusiness || isHandout;
  const guidesActive = !!showGuides && passDims && dims.showGuides;

  // Handouts: anchor by the longer dimension so different print sizes stay
  // proportional on screen (5×7 visibly larger than 4×6). Business cards keep
  // the legacy 400 cap.
  const handoutTargetLongPx = 540;
  const handoutWidthCap = isHandout
    ? Math.round(handoutTargetLongPx * (dims.trimWIn / Math.max(dims.trimWIn, dims.trimHIn)))
    : 400;
  const widthCap = isHandout ? handoutWidthCap : 400;
  const bleedPad = guidesActive ? 16 : 0;

  return (
    <div style={{ maxWidth: widthCap + bleedPad * 2, margin: '0 auto', width: '100%', padding: bleedPad, boxSizing: 'border-box' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <Template card={card} cardRef={cardRef} dimensions={passDims ? dims : undefined} />
        {guidesActive && <PrintGuides dimensions={dims} />}
      </div>
    </div>
  );
};

export default CardPreview;
