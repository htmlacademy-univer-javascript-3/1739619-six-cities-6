import {describe, expect, it} from 'vitest';
import {reviewsData} from './reviews-data.ts';
import {fetchOfferReviewsAction, postOfferReviewAction} from '../api-actions.ts';
import {makeFakeReview} from '../../utils/mocks.ts';

describe('reviewsData slice', () => {
  const mockPostReviewData = {
    offerId: '1',
    comment: 'ok',
    rating: 5,
  };

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      items: [],
      isPosting: false,
    };

    const result = reviewsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return current state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      items: [makeFakeReview('1')],
      isPosting: true,
    };

    const result = reviewsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "items" to array with reviews with "fetchOfferReviewsAction.fulfilled"', () => {
    const mockReviews = [makeFakeReview('1'), makeFakeReview('2')];
    const expectedState = {
      items: mockReviews,
      isPosting: false,
    };

    const result = reviewsData.reducer(
      undefined,
      fetchOfferReviewsAction.fulfilled(mockReviews, '', '1'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "items" to empty array with "fetchOfferReviewsAction.rejected"', () => {
    const prevState = {
      items: [makeFakeReview('1')],
      isPosting: false
    };
    const expectedState = {
      items: [],
      isPosting: false
    };

    const result = reviewsData.reducer(
      prevState,
      fetchOfferReviewsAction.rejected(null, '', '1'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isPosting" to "true" with "postOfferReviewAction.pending"', () => {
    const expectedState = {
      items: [],
      isPosting: true
    };

    const result = reviewsData.reducer(
      undefined,
      postOfferReviewAction.pending('', mockPostReviewData),
    );

    expect(result).toEqual(expectedState);
  });

  it('should prepend review to "items" and set "isPosting" to "false" when "postOfferReviewAction.fulfilled" returns single item', () => {
    const prevState = {
      items: [makeFakeReview('1')],
      isPosting: true
    };
    const newReview = makeFakeReview('2');
    const expectedState = {
      items: [newReview, makeFakeReview('1')],
      isPosting: false
    };

    const result = reviewsData.reducer(
      prevState,
      postOfferReviewAction.fulfilled([newReview], '', mockPostReviewData),
    );

    expect(result).toEqual(expectedState);
  });

  it('should replace "items" and set "isPosting" to "false" when "postOfferReviewAction.fulfilled" returns collection', () => {
    const mockReviews = [makeFakeReview('2'), makeFakeReview('3')];
    const expectedState = {
      items: mockReviews,
      isPosting: false
    };

    const result = reviewsData.reducer(
      undefined,
      postOfferReviewAction.fulfilled(mockReviews, '', mockPostReviewData),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isPosting" to "false" with "postOfferReviewAction.rejected"', () => {
    const prevState = {
      items: [makeFakeReview('1')],
      isPosting: true
    };
    const expectedState = {
      items: [makeFakeReview('1')],
      isPosting: false
    };

    const result = reviewsData.reducer(
      prevState,
      postOfferReviewAction.rejected(null, '', mockPostReviewData),
    );

    expect(result).toEqual(expectedState);
  });
});
