import PlaceCard from '../place-card/place-card.tsx';
import {OfferPreview} from '../../types/offers-preview.ts';

type OffersListProps = {
  offers: OfferPreview[];
};

export default function OffersList({offers}: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}
