import {Offer} from '../types/offer.ts';
import {OfferPreview} from '../types/offers-preview.ts';
import {Review} from '../types/review.ts';
import {UserData} from '../types/user-data.ts';
import {City} from '../types/city.ts';
import {Location} from '../types/location.ts';
import {User} from '../types/user.ts';

export const mockLocation: Location = {
  latitude: 52.370216,
  longitude: 4.895168,
  zoom: 13,
};

export const mockCity: City = {
  name: 'Amsterdam',
  location: mockLocation,
};

export const mockUser: User = {
  isPro: false,
  name: 'User',
  avatarUrl: 'avatar.jpg',
};

export const makeFakeOfferPreview = (id: string, isFavorite = false): OfferPreview => ({
  id,
  title: `Offer ${id}`,
  type: 'apartment',
  price: 100,
  previewImage: 'img.jpg',
  city: mockCity,
  location: mockLocation,
  goods: ['Wi-Fi'],
  isPremium: false,
  isFavorite,
  rating: 4,
});

export const makeFakeOffer = (id: string, isFavorite = false): Offer => ({
  ...makeFakeOfferPreview(id, isFavorite),
  description: 'Nice place',
  images: ['img-1.jpg'],
  host: {
    isPro: true,
    name: 'Host',
    avatarUrl: 'avatar.jpg',
  },
  bedrooms: 2,
  maxAdults: 4,
});

export const makeFakeReview = (id: string): Review => ({
  id,
  comment: `Review ${id}`,
  date: '2023-01-01',
  rating: 4,
  user: mockUser,
  offerId: '1',
});

export const makeFakeUserData = (): UserData => ({
  id: 1,
  email: 'test@test.com',
  token: 'token',
});
