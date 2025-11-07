import {Review} from '../types/review.ts';

export const reviews: Review[] = [
  {
    id: '4f86f1cb-1375-4459-b2dd-90d5948b75be',
    comment: 'A quiet cozy and picturesque place that hides behind a river by the unique lightness of Amsterdam.',
    date: '2019-04-24T14:13:56.569Z',
    rating: 4,
    user: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/3.jpg'
    },
    offerId: '8f6a4dbd-6579-4da5-b0b4-67bdefda61d8'
  },
  {
    id: '5666fa0f-8728-40aa-8f88-37be0240bc33',
    comment: 'We loved it so much, the house, the view, the location just great. Highly recommended!',
    date: '2020-01-15T12:20:01.123Z',
    rating: 5,
    user: {
      isPro: true,
      name: 'Katarina',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/6.jpg'
    },
    offerId: '8f6a4dbd-6579-4da5-b0b4-67bdefda61d8'
  },
  {
    id: '42c4b8e2-2630-4ab9-a916-7d3a82444663',
    comment: 'Fantastic location and very friendly hosts. We will definitely come back next time.',
    date: '2021-05-11T09:45:12.000Z',
    rating: 3,
    user: {
      isPro: false,
      name: 'Sam',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/1.jpg'
    },
    offerId: '101cf67d-35bb-4d51-bec2-00658e49e710'
  }
];
