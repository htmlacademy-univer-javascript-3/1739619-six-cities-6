import {render, screen} from '@testing-library/react';
import NoOffers from './no-offers';
import {CityName} from '../../const';

describe('Component: NoOffers', () => {
  it('should render message with city name', () => {
    const cityName: CityName = 'Amsterdam';

    render(<NoOffers cityName={cityName} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(`We could not find any property available at the moment in ${cityName}`)
    ).toBeInTheDocument();
  });
});
