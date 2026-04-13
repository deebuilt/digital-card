import React from 'react';
import { CardData } from '@/types/card';
import { MonogramCard, WordmarkCard, FullBleedCard, EditorialCard, DarkCard } from './cards/BusinessCards';
import { ProfileCard, SplitCard, StackedCard } from './cards/VCardTemplates';

interface CardPreviewProps {
  card: CardData;
  cardRef?: React.RefObject<HTMLDivElement>;
}

const templates: Record<string, React.FC<{ card: CardData; cardRef?: React.RefObject<HTMLDivElement> }>> = {
  modern: MonogramCard,
  clean: WordmarkCard,
  bold: FullBleedCard,
  minimal: EditorialCard,
  neon: DarkCard,
  profile: ProfileCard,
  split: SplitCard,
  stacked: StackedCard,
};

const CardPreview: React.FC<CardPreviewProps> = ({ card, cardRef }) => {
  const Template = templates[card.cardStyle] || MonogramCard;
  return <Template card={card} cardRef={cardRef} />;
};

export default CardPreview;
