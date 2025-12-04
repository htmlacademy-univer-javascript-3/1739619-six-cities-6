import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';
import {Review} from '../../types/review.ts';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].items;
export const getReviewPostingStatus = (state: State): boolean => state[NameSpace.Reviews].isPosting;
