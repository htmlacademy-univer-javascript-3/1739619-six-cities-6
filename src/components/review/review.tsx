import {Review as ReviewType} from '../../types/review';
import {RATING_PERCENT_PER_STAR, USER_AVATAR_SIZE} from '../../const.ts';

type ReviewProps = {
  review: ReviewType;
};

export default function Review({review}: ReviewProps) {
  const {comment, date, rating, user} = review;
  const ratingWidth = `${Math.round(rating) * RATING_PERCENT_PER_STAR}%`;

  const reviewDate = new Date(date);
  const formattedDate = reviewDate.toLocaleString('en-US', {month: 'long', year: 'numeric'});
  const dateTimeValue = reviewDate.toISOString().split('T')[0];

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={USER_AVATAR_SIZE.width}
            height={USER_AVATAR_SIZE.height}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={dateTimeValue}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}
