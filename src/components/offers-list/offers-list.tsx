import {useState} from 'react';
import PlaceCard from '../place-card/place-card.tsx';
import {OfferPreview} from '../../types/offers-preview.ts';

type OffersListProps = {
  offers: OfferPreview[];
};

export default function OffersList({offers}: OffersListProps) {
  const [activeOffer, setActiveOffer] = useState<OfferPreview | null>(null);

  const handleCardMouseEnter = (offer: OfferPreview) => {
    setActiveOffer(offer);
  };

  const handleCardMouseLeave = () => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          isActive={activeOffer?.id === offer.id}
          onMouseEnter={() => handleCardMouseEnter(offer)}
          onMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}
