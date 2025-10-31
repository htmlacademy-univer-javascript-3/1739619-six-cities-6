import React, { useState } from 'react';
import {MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH, RATING_VALUES, RATING_TITLES} from '../../const.ts';

export default function CommentForm() {
  const [formState, setFormState] = useState({ rating: 0, review: '' });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  return (
    <form className="reviews__form form" action="#" method="post">
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
      />

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
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
