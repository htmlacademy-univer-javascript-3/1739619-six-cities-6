import {render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import ErrorMessage from './error-message';
import {State} from '../../types/state.ts';

const selectorMock = vi.fn(<TSelected,>(selector: (state: State) => TSelected) =>
  selector({} as State)
);

vi.mock('../../hooks', () => ({
  useAppSelector: <TSelected,>(selector: (state: State) => TSelected) =>
    selectorMock(selector),
}));

describe('Component: ErrorMessage', () => {
  it('should render error text when error exists', () => {
    selectorMock.mockReturnValue('Ошибка авторизации');

    render(<ErrorMessage />);

    expect(screen.getByText('Ошибка авторизации')).toBeInTheDocument();
  });

  it('should render nothing when no error', () => {
    selectorMock.mockReturnValue(null);

    const {container} = render(<ErrorMessage />);

    expect(container).toBeEmptyDOMElement();
  });
});
