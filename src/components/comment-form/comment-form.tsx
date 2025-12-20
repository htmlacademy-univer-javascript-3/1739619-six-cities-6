import React, { useState } from 'react';
import { MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH, RATING_VALUES, RATING_TITLES } from '../../const.ts';
import { Offer } from '../../types/offer.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviewPostingStatus } from '../../store/reviews-data/selectors.ts';
import { postOfferReviewAction } from '../../store/api-actions.ts';
import { handleErrorMessage } from '../../services/handle-error-message.ts';
import { setError } from '../../store/user-data/user-data.ts';

type CommentFormProps = {
  offerId: Offer['id'];
};

export default function CommentForm({ offerId }: CommentFormProps) {
  const dispatch = useAppDispatch();
  const isReviewPosting = useAppSelector(getReviewPostingStatus);

  const error = useAppSelector((state) => state.auth.error);

  const [formState, setFormState] = useState({ rating: 0, review: '' });

  const [isTriedSubmit, setIsTriedSubmit] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isTriedSubmit) {
      setIsTriedSubmit(false);
    }

    if (error) {
      dispatch(setError(null));
    }

    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const reviewLength = formState.review.trim().length;

  const isSubmitDisabled =
    formState.rating === 0 ||
    reviewLength < MIN_REVIEW_LENGTH ||
    reviewLength > MAX_REVIEW_LENGTH;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTriedSubmit(true);

    if (isSubmitDisabled || isReviewPosting) {
      return;
    }

    void dispatch(
      postOfferReviewAction({
        offerId,
        comment: formState.review.trim(),
        rating: formState.rating,
      })
    )
      .unwrap()
      .then(() => {
        setFormState({ rating: 0, review: '' });
        setIsTriedSubmit(false);
        dispatch(setError(null));
      })
      .catch(() => {
        handleErrorMessage('Не удалось отправить отзыв. Пожалуйста, попробуйте позже.');
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((value) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formState.rating === value}
              onChange={handleChange}
              disabled={isReviewPosting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATING_TITLES[value]}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.review}
        onChange={handleChange}
        maxLength={MAX_REVIEW_LENGTH}
        disabled={isReviewPosting}
      />

      {isTriedSubmit && error && (
        <p className="form__error" role="alert" style={{ color: 'red', marginTop: 5 }}>
          {error}
        </p>
      )}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with
          at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>{' '}
          (up to {MAX_REVIEW_LENGTH}).
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isReviewPosting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
