import {Link, useParams} from 'react-router-dom';
import {AppRoute, NEARBY_OFFERS_LIMIT} from '../../const.ts';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import ReviewsList from '../../components/reviews-list/reviews-list.tsx';
import {reviews} from '../../mocks/reviews.ts';
import Map from '../../components/map/map.tsx';
import NearPlacesList from '../../components/near-places-list/near-places-list.tsx';
import {useAppSelector} from '../../hooks';
import {selectOffers} from '../../store/selectors.ts';

export default function OfferScreen() {
  const offers = useAppSelector(selectOffers);
  const offerId = useParams<{offerId: string}>();
  const currentOffer = offers.find((offer) => offer.id === String(offerId.offerId));

  if (!currentOffer) {
    return (
      <h1>Такого предложения нет</h1>
    );
  }

  const favoriteOffersCount = offers.filter((offer) => offer.isFavorite).length;
  const nearbyOffers = offers
    .filter((offer) => offer.id !== currentOffer.id && offer.city.name === currentOffer.city.name)
    .slice(0, NEARBY_OFFERS_LIMIT);
  const offerReviews = reviews.filter((review) => review.offerId === currentOffer.id);
  const reviewsCount = offerReviews.length;
  const mapOffers = [currentOffer, ...nearbyOffers];
  const ratingWidth = `${Math.round(currentOffer.rating) * 20}%`;
  const bookmarkButtonClassName = `offer__bookmark-button button${currentOffer.isFavorite ? ' offer__bookmark-button--active' : ''}`;
  const bookmarkButtonText = currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks';
  const offerType = `${currentOffer.type.charAt(0).toUpperCase()}${currentOffer.type.slice(1)}`;
  const bedroomsText = `${currentOffer.bedrooms} Bedroom${currentOffer.bedrooms !== 1 ? 's' : ''}`;
  const adultsText = `Max ${currentOffer.maxAdults} adult${currentOffer.maxAdults !== 1 ? 's' : ''}`;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link">
                <img
                  className="header__logo"
                  src="../../../markup/img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">{favoriteOffersCount}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo ${currentOffer.title}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={bookmarkButtonClassName} type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">{bookmarkButtonText}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating.toFixed(1)}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offerType}</li>
                <li className="offer__feature offer__feature--bedrooms">{bedroomsText}</li>
                <li className="offer__feature offer__feature--adults">{adultsText}</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">{'What\'s inside'}</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper${currentOffer.host.isPro ? ' offer__avatar-wrapper--pro' : ''}`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviewsCount}</span>
                </h2>
                <ReviewsList reviews={offerReviews}/>
                <CommentForm/>
              </section>
            </div>
          </div>
          {nearbyOffers.length > 0 ? (
            <Map
              city={currentOffer.city}
              offers={mapOffers}
              selectedOfferId={currentOffer.id}
              className="offer__map map"
            />
          ) : (
            <section className="offer__map map" />
          )}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearPlacesList offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}
