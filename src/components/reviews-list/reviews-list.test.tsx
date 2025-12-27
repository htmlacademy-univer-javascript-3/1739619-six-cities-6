import {render, screen} from '@testing-library/react';
import ReviewsList from './reviews-list';
import {makeFakeReview} from '../../utils/mocks';

describe('Component: ReviewsList', () => {
  it('should render reviews list', () => {
    const reviews = [makeFakeReview('1'), makeFakeReview('2')];

    render(<ReviewsList reviews={reviews} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(reviews.length);
    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(reviews[1].comment)).toBeInTheDocument();
  });
});
