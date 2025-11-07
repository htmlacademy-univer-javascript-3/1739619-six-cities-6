import PlaceCard from '../place-card/place-card.tsx';
import {OfferPreview} from '../../types/offers-preview.ts';

type OffersListProps = {
  offers?: OfferPreview[];
  setSelectedOfferId: (id: OfferPreview['id'] | null) => void;
};

export default function OffersList({offers, setSelectedOfferId}: OffersListProps) {
  if (!offers || offers.length === 0) {
    return <p>Нет доступных предложений</p>;
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setSelectedOfferId(offer.id)}
          onMouseLeave={() => setSelectedOfferId(null)}
        />
      ))}
    </div>
  );
}
