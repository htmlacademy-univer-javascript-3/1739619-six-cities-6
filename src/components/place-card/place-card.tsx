import { memo } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, RATING_PERCENT_PER_STAR } from '../../const';
import { OfferPreview } from '../../types/offers-preview';

import {
  CARD_CLASS_MAP,
  IMAGE_WRAPPER_CLASS_MAP,
  INFO_CLASS_MAP,
  IMAGE_SIZE_MAP,
  BOOKMARK_TEXT,
  PREMIUM_LABEL,
  BOOKMARK_ICON_SIZE,
} from './place-card.const';

type PlaceCardProps = {
  offer: OfferPreview;
  variant: 'cities' | 'favorites' | 'near-places';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFavoriteToggle?: (
    offerId: OfferPreview['id'],
    isFavorite: boolean
  ) => void;
};

function PlaceCardInner({
  offer,
  variant,
  onMouseEnter,
  onMouseLeave,
  onFavoriteToggle,
}: PlaceCardProps) {
  const {
    id,
    previewImage,
    title,
    price,
    type,
    rating,
    isPremium,
    isFavorite,
  } = offer;

  const ratingWidth = `${Math.round(rating) * RATING_PERCENT_PER_STAR}%`;

  const bookmarkButtonClassName =
    `place-card__bookmark-button button${
      isFavorite ? ' place-card__bookmark-button--active' : ''
    }`;

  const bookmarkButtonText = isFavorite
    ? BOOKMARK_TEXT.active
    : BOOKMARK_TEXT.inactive;

  return (
    <article
      className={CARD_CLASS_MAP[variant]}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>{PREMIUM_LABEL}</span>
        </div>
      )}

      <div className={IMAGE_WRAPPER_CLASS_MAP[variant]}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={IMAGE_SIZE_MAP[variant].width}
            height={IMAGE_SIZE_MAP[variant].height}
            alt="Place image"
          />
        </Link>
      </div>

      <div className={INFO_CLASS_MAP[variant]}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">
              /&nbsp;night
            </span>
          </div>

          <button
            className={bookmarkButtonClassName}
            type="button"
            onClick={() => onFavoriteToggle?.(id, isFavorite)}
          >
            <svg
              className="place-card__bookmark-icon"
              width={BOOKMARK_ICON_SIZE.width}
              height={BOOKMARK_ICON_SIZE.height}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {bookmarkButtonText}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>
            {title}
          </Link>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const PlaceCard = memo(
  PlaceCardInner,
  (prevProps, nextProps) =>
    prevProps.offer === nextProps.offer &&
    prevProps.onFavoriteToggle === nextProps.onFavoriteToggle
);

export default PlaceCard;
