import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import OffersList from './offers-list';
import {makeFakeOfferPreview} from '../../utils/mocks';
import {withHistory} from '../../utils/mock-component';

describe('Component: OffersList', () => {
  it('should render fallback when no offers', () => {
    render(<OffersList variant="cities" />);

    expect(screen.getByText(/no places to stay available/i)).toBeInTheDocument();
  });

  it('should render offers and handle hover selection', () => {
    const offers = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
    const onSelectedOfferIdChange = vi.fn();
    const preparedComponent = withHistory(
      <OffersList
        offers={offers}
        variant="cities"
        onSelectedOfferIdChange={onSelectedOfferIdChange}
      />,
    );

    render(preparedComponent);

    const firstOfferTitle = screen.getByText(offers[0].title);
    const card = firstOfferTitle.closest('article');

    expect(card).not.toBeNull();

    if (card) {
      fireEvent.mouseEnter(card);
      fireEvent.mouseLeave(card);
    }

    expect(onSelectedOfferIdChange).toHaveBeenCalledWith(offers[0].id);
    expect(onSelectedOfferIdChange).toHaveBeenCalledWith(null);
  });
});
