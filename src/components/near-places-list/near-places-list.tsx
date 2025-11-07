import OffersList from '../offers-list/offers-list.tsx';
import {OfferPreview} from '../../types/offers-preview.ts';

type NearPlacesListProps = {
  offers: OfferPreview[];
};

export default function NearPlacesList({offers}: NearPlacesListProps) {
  return <OffersList offers={offers} variant="near-places" />;
}
