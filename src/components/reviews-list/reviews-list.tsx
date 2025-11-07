import Review from '../review/review.tsx';
import {Review as ReviewType} from '../../types/review.ts';

type ReviewsListProps = {
  reviews: ReviewType[];
};

export default function ReviewsList({reviews}: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}
