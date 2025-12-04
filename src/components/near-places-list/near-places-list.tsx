import { memo } from 'react';
import OffersList from '../offers-list/offers-list.tsx';
import { OfferPreview } from '../../types/offers-preview.ts';

type NearPlacesListProps = {
  offers: OfferPreview[];
  onFavoriteToggle: (offerId: OfferPreview['id'], isFavorite: boolean) => void;
};

function NearPlacesListComponentInner({ offers, onFavoriteToggle }: NearPlacesListProps) {
  return <OffersList offers={offers} variant="near-places" onFavoriteToggle={onFavoriteToggle} />;
}

const NearPlacesListComponent = memo(NearPlacesListComponentInner);
export default NearPlacesListComponent;
