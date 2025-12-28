import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {vi} from 'vitest';
import NearPlacesList from './near-places-list';
import {makeFakeOfferPreview} from '../../utils';
import {withHistory} from '../../hocs';

describe('Component: NearPlacesList', () => {
  it('should render offers and handle favorite toggle', async () => {
    const user = userEvent.setup();
    const offers = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
    const onFavoriteToggle = vi.fn();
    const preparedComponent = withHistory(
      <NearPlacesList offers={offers} onFavoriteToggle={onFavoriteToggle} />,
    );

    render(preparedComponent);

    await user.click(screen.getAllByRole('button')[0]);

    expect(onFavoriteToggle).toHaveBeenCalledWith(offers[0].id, offers[0].isFavorite);
  });
});
