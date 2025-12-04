import { memo } from 'react';
import OffersList from '../offers-list/offers-list.tsx';
import { OfferPreview } from '../../types/offers-preview.ts';

type NearPlacesListProps = {
  offers: OfferPreview[];
};

function NearPlacesListComponentInner({ offers }: NearPlacesListProps) {
  return <OffersList offers={offers} variant="near-places" />;
}

const NearPlacesListComponent = memo(NearPlacesListComponentInner);
export default NearPlacesListComponent;
