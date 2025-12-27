import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {vi} from 'vitest';
import PlaceCard from './place-card';
import {makeFakeOfferPreview} from '../../utils/mocks';
import {withHistory} from '../../utils/mock-component';
import {PREMIUM_LABEL} from './place-card.const';

describe('Component: PlaceCard', () => {
  it('should render premium label and call favorite toggle', async () => {
    const offer = makeFakeOfferPreview('1');
    const onFavoriteToggle = vi.fn();
    const user = userEvent.setup();
    const preparedComponent = withHistory(
      <PlaceCard offer={{...offer, isPremium: true}} variant="cities" onFavoriteToggle={onFavoriteToggle} />,
    );

    render(preparedComponent);

    expect(screen.getByText(PREMIUM_LABEL)).toBeInTheDocument();

    await user.click(screen.getByRole('button'));

    expect(onFavoriteToggle).toHaveBeenCalledWith(offer.id, offer.isFavorite);
  });
});
