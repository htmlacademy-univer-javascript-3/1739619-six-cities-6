import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {vi} from 'vitest';
import CitiesList from './cities-list';
import {CITY_NAMES} from '../../const';
import {withHistory} from '../../hocs';

describe('Component: CitiesList', () => {
  it('should highlight active city and notify about change', async () => {
    const user = userEvent.setup();
    const onCityChange = vi.fn();
    const activeCity = CITY_NAMES[0];
    const nextCity = CITY_NAMES[1];

    const preparedComponent = withHistory(
      <CitiesList cities={CITY_NAMES} activeCity={activeCity} onCityChange={onCityChange} />,
    );

    render(preparedComponent);

    expect(screen.getByText(activeCity).closest('a')).toHaveClass('tabs__item--active');

    await user.click(screen.getByText(nextCity));

    expect(onCityChange).toHaveBeenCalledWith(nextCity);
  });

  it('should not call onCityChange when active city clicked', async () => {
    const user = userEvent.setup();
    const onCityChange = vi.fn();
    const activeCity = CITY_NAMES[0];
    const preparedComponent = withHistory(
      <CitiesList cities={CITY_NAMES} activeCity={activeCity} onCityChange={onCityChange} />,
    );

    render(preparedComponent);

    await user.click(screen.getByText(activeCity));

    expect(onCityChange).not.toHaveBeenCalled();
  });
});
