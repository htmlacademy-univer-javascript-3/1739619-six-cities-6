import {render, screen} from '@testing-library/react';
import HeaderLogo from './header-logo';
import {AppRoute, HEADER_LOGO_SIZE} from '../../const';
import {withHistory} from '../../utils/mock-component';

describe('Component: HeaderLogo', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';
    const preparedComponent = withHistory(<HeaderLogo />);

    render(preparedComponent);

    const link = screen.getByRole('link');
    const logo = screen.getByAltText(expectedAltText);

    expect(link).toHaveAttribute('href', AppRoute.Main);
    expect(logo).toHaveAttribute('src', '../../../markup/img/logo.svg');
    expect(logo).toHaveAttribute('width', `${HEADER_LOGO_SIZE.width}`);
    expect(logo).toHaveAttribute('height', `${HEADER_LOGO_SIZE.height}`);
  });
});
