import React, { useState } from 'react';
import {
  REVIEW_LENGTH,
  RATING_VALUES,
  RATING_TITLES,
  RATING_STAR_SIZE,
  FORM_ERROR_MARGIN_TOP
} from '../../const.ts';
import { Offer } from '../../types/offer.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviewPostingStatus } from '../../store/reviews-data/selectors.ts';
import { postOfferReviewAction } from '../../store/api-actions.ts';
import { handleErrorMessage } from '../../services/handle-error-message.ts';
import { getError } from '../../store/user-data/selectors.ts';
import { errorReset } from '../../store/user-data/user-data.ts';

type CommentFormProps = {
  offerId: Offer['id'];
};

export default function CommentForm({ offerId }: CommentFormProps) {
  const dispatch = useAppDispatch();
  const isReviewPosting = useAppSelector(getReviewPostingStatus);

  const error = useAppSelector(getError);

  const [formState, setFormState] = useState({ rating: 0, review: '' });

  const [isTriedSubmit, setIsTriedSubmit] = useState(false);

  const handleReviewInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isTriedSubmit) {
      setIsTriedSubmit(false);
    }

    if (error) {
      dispatch(errorReset());
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
    reviewLength < REVIEW_LENGTH.min ||
    reviewLength > REVIEW_LENGTH.max;

  const handleReviewFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        dispatch(errorReset());
      })
      .catch(() => {
        handleErrorMessage('Не удалось отправить отзыв. Пожалуйста, попробуйте позже.');
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleReviewFormSubmit}>
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
              onChange={handleReviewInputChange}
              disabled={isReviewPosting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATING_TITLES[value]}
            >
              <svg className="form__star-image" width={RATING_STAR_SIZE.width} height={RATING_STAR_SIZE.height}>
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
        onChange={handleReviewInputChange}
        maxLength={REVIEW_LENGTH.max}
        disabled={isReviewPosting}
      />

      {isTriedSubmit && error && (
        <p className="form__error" role="alert" style={{ color: 'red', marginTop: FORM_ERROR_MARGIN_TOP }}>
          {error}
        </p>
      )}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with
          at least <b className="reviews__text-amount">{REVIEW_LENGTH.min} characters</b>{' '}
          (up to {REVIEW_LENGTH.max}).
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
