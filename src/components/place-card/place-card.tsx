import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {OfferPreview} from '../../types/offers-preview.ts';

type PlaceCardProps = {
  offer: OfferPreview;
  variant?: 'cities' | 'favorites' | 'near-places';
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const CARD_CLASS_MAP = {
  cities: 'cities__card place-card',
  favorites: 'favorites__card place-card',
  'near-places': 'near-places__card place-card',
} as const;

const IMAGE_WRAPPER_CLASS_MAP = {
  cities: 'cities__image-wrapper place-card__image-wrapper',
  favorites: 'favorites__image-wrapper place-card__image-wrapper',
  'near-places': 'near-places__image-wrapper place-card__image-wrapper',
} as const;

const INFO_CLASS_MAP = {
  cities: 'place-card__info',
  favorites: 'favorites__card-info place-card__info',
  'near-places': 'place-card__info',
} as const;

const IMAGE_SIZE_MAP = {
  cities: {width: 260, height: 200},
  favorites: {width: 150, height: 110},
  'near-places': {width: 260, height: 200},
} as const;

export default function PlaceCard({
  offer,
  variant = 'cities',
  isActive = false,
  onMouseEnter,
  onMouseLeave,
}: PlaceCardProps) {
  const {id, previewImage, title, price, type, rating, isPremium, isFavorite} = offer;

  const ratingWidth = `${rating * 20}%`;
  const bookmarkButtonClassName = `place-card__bookmark-button button${isFavorite ? ' place-card__bookmark-button--active' : ''}`;
  const bookmarkButtonText = isFavorite ? 'In bookmarks' : 'To bookmarks';

  return (
    <article
      className={`${CARD_CLASS_MAP[variant]}${isActive ? ' place-card--active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
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
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={bookmarkButtonClassName}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{bookmarkButtonText}</span>
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


