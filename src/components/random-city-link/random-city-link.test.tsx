import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {vi} from 'vitest';
import RandomCityLink from './random-city-link';
import {withHistory} from '../../hocs';
import {CITIES, CITY_NAMES} from '../../const';
import {currentCity} from '../../store/city-data/city-data';
import {useDispatchMock} from '../../utils';

vi.mock('react-redux', async () => {
  const { mockReactRedux } = await import('../../utils/mocks');
  return mockReactRedux;
});

describe('Component: RandomCityLink', () => {
  it('should dispatch city change on click', async () => {
    const user = userEvent.setup();
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);
    const expectedCity = CITY_NAMES[0];
    const preparedComponent = withHistory(<RandomCityLink />);

    render(preparedComponent);

    await user.click(screen.getByText(expectedCity));

    expect(useDispatchMock).toHaveBeenCalledWith(currentCity(CITIES[expectedCity]));

    randomSpy.mockRestore();
  });
});
