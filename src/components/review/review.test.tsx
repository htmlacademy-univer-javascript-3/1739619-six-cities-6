import {render, screen} from '@testing-library/react';
import Review from './review';
import {makeFakeReview} from '../../utils/mocks';
import {RATING_PERCENT_PER_STAR} from '../../const';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const review = makeFakeReview('1');
    const ratingWidth = `${Math.round(review.rating) * RATING_PERCENT_PER_STAR}%`;
    const expectedDate = 'January 2023';

    render(
      <ul>
        <Review review={review} />
      </ul>
    );

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();

    const rating = screen.getByText('Rating').previousSibling as HTMLElement;
    expect(rating).toHaveStyle({width: ratingWidth});

    const reviewTime = screen.getByText(expectedDate);
    expect(reviewTime).toHaveAttribute('dateTime', '2023-01-01');
  });
});
