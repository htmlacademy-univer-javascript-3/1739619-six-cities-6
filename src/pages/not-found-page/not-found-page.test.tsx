import {render, screen} from '@testing-library/react';
import NotFound from './not-found-page';
import {withHistory} from '../../hocs';
import {AppRoute} from '../../const';

describe('Page: NotFound', () => {
  it('should render not found message and link to main', () => {
    render(withHistory(<NotFound />));

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /вернуться на главную страницу/i})).toHaveAttribute(
      'href',
      AppRoute.Main,
    );
  });
});
