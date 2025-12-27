import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CommentForm from './comment-form';
import { REVIEW_LENGTH, NameSpace } from '../../const';
import { postOfferReviewAction } from '../../store/api-actions';
import { errorReset } from '../../store/user-data/user-data';
import { mockState, useDispatchMock } from '../../utils/mocks';

vi.mock('react-redux', async () => {
  const { mockReactRedux } = await import('../../utils/mocks');
  return mockReactRedux;
});

vi.mock('../../store/api-actions', () => ({
  postOfferReviewAction: vi.fn(),
}));

vi.mock('../../store/user-data/user-data', () => ({
  errorReset: vi.fn(),
}));

describe('Component: CommentForm', () => {
  beforeEach(() => {
    useDispatchMock.mockReset();
    vi.mocked(postOfferReviewAction).mockReset();
    vi.mocked(errorReset).mockReset();
    mockState[NameSpace.Reviews].isPosting = false;
    mockState[NameSpace.Auth].error = null;
  });

  it('should submit review when form is valid', async () => {
    const user = userEvent.setup();

    const errorResetAction = { type: 'auth/errorReset' } as unknown as ReturnType<typeof errorReset>;

    const postThunk = (() => Promise.resolve([])) as unknown as ReturnType<
      typeof postOfferReviewAction
    >;

    const dispatchedResult = { unwrap: vi.fn().mockResolvedValue(undefined) };

    vi.mocked(postOfferReviewAction).mockReturnValue(postThunk);
    vi.mocked(errorReset).mockReturnValue(errorResetAction);

    useDispatchMock.mockImplementation((action) => {
      if (action === postThunk) {
        return dispatchedResult;
      }
      return undefined;
    });

    render(<CommentForm offerId="1" />);

    const radios = screen.getAllByRole('radio');
    await user.click(radios[0]);

    const reviewText = 'a'.repeat(REVIEW_LENGTH.min);
    await user.type(screen.getByRole('textbox'), reviewText);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(postOfferReviewAction).toHaveBeenCalledWith({
      offerId: '1',
      comment: reviewText,
      rating: 5,
    });

    expect(dispatchedResult.unwrap).toHaveBeenCalled();

    await waitFor(() => {
      expect(useDispatchMock).toHaveBeenCalledWith(errorResetAction);
    });
  });

  it('should show error message on invalid submit and reset error on change', async () => {
    const user = userEvent.setup();
    const errorResetAction = { type: 'auth/errorReset' } as unknown as ReturnType<typeof errorReset>;

    mockState[NameSpace.Auth].error = 'Ошибка отправки';

    vi.mocked(errorReset).mockReturnValue(errorResetAction);

    render(<CommentForm offerId="1" />);

    fireEvent.submit(
      screen.getByRole('button', { name: /submit/i }).closest('form') as HTMLFormElement
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Ошибка отправки');

    await user.type(screen.getByRole('textbox'), 'test');

    expect(useDispatchMock).toHaveBeenCalledWith(errorResetAction);
  });
});
