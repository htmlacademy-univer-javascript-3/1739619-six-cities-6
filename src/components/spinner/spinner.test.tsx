import {render, screen} from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const expectedLabel = 'Loading';

    render(<Spinner />);

    expect(screen.getByLabelText(expectedLabel)).toBeInTheDocument();
  });
});
