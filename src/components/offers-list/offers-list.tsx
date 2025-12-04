import {memo} from 'react';
import PlaceCard from '../place-card/place-card.tsx';
import {OfferPreview} from '../../types/offers-preview.ts';

type OffersListProps = {
  offers?: OfferPreview[];
  variant: 'cities' | 'favorites' | 'near-places';
  setSelectedOfferId?: (id: OfferPreview['id'] | null) => void;
  onFavoriteToggle?: (offerId: OfferPreview['id'], isFavorite: boolean) => void;
};

const LIST_CLASS_MAP = {
  cities: 'cities__places-list places__list tabs__content',
  favorites: 'favorites__places',
  'near-places': 'near-places__list places__list',
} as const;

function OffersListInner({offers, variant, setSelectedOfferId, onFavoriteToggle}: OffersListProps) {
  if (!offers || offers.length === 0) {
    return <p>No places to stay available</p>;
  }

  return (
    <div className={LIST_CLASS_MAP[variant]}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={setSelectedOfferId ? () => setSelectedOfferId(offer.id) : undefined}
          onMouseLeave={setSelectedOfferId ? () => setSelectedOfferId(null) : undefined}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
}

const OffersList = memo(OffersListInner);
export default OffersList;
