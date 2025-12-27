import {describe, expect, it} from 'vitest';
import {getReviewPostingStatus, getReviews} from './selectors';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeReview, makeFakeStore} from '../../utils/mocks';
import {State} from '../../types/state';

describe('Reviews selectors', () => {
  it('should return reviews and posting status', () => {
    const reviews = [makeFakeReview('1'), makeFakeReview('2')];
    const state = makeFakeStore(AuthorizationStatus.NoAuth, {
      [NameSpace.Reviews]: {
        items: reviews,
        isPosting: true,
      },
    }) as State;

    expect(getReviews(state)).toEqual(reviews);
    expect(getReviewPostingStatus(state)).toBe(true);
  });
});
