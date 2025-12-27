import axios, {AxiosInstance} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {vi} from 'vitest';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const.ts';
import {State} from '../types/state.ts';
import {
  changeFavoriteStatusAction,
  checkAuthAction,
  clearErrorAction,
  fetchFavoritesAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOfferReviewsAction,
  fetchOffersAction,
  postOfferReviewAction,
} from './api-actions.ts';
import {
  extractActionsTypes,
  makeFakeOffer,
  makeFakeOfferPreview,
  makeFakeReview,
  makeFakeUserData,
} from '../utils/mocks.ts';
import {FavoritesStatusData} from '../types/favorites-status-data.ts';
import {ReviewData} from '../types/review-data.ts';
import {errorReset} from './user-data/user-data.ts';

type DispatchExts = ThunkDispatch<State, AxiosInstance, Action<string>>;

describe('Async actions', () => {
  const api = axios.create();
  const mockApi = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator =
    configureMockStore<State, Action<string>, DispatchExts>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({} as State);
  });

  it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
    const mockOffers = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
    mockApi.onGet(APIRoute.Offers).reply(200, mockOffers);

    await store.dispatch(fetchOffersAction());

    const emittedActions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);
    const fetchOffersFulfilled =
      emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
    expect(fetchOffersFulfilled.payload).toEqual(mockOffers);
  });

  it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async () => {
    mockApi.onGet(APIRoute.Offers).reply(400, []);

    await store.dispatch(fetchOffersAction());

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.rejected.type,
    ]);
  });

  it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" when server response 200', async () => {
    const mockOffer = makeFakeOffer('1');
    mockApi.onGet(`${APIRoute.Offers}/1`).reply(200, mockOffer);

    await store.dispatch(fetchOfferAction('1'));

    const actions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(actions);
    const fetchOfferFulfilled =
      actions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type,
    ]);
    expect(fetchOfferFulfilled.payload).toEqual(mockOffer);
  });

  it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.fulfilled" when server response 200', async () => {
    const mockOffers = [
      makeFakeOfferPreview('2'),
      makeFakeOfferPreview('3'),
    ];
    mockApi.onGet(`${APIRoute.Offers}/1/nearby`).reply(200, mockOffers);

    await store.dispatch(fetchNearbyOffersAction('1'));

    const actions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(actions);
    const fetchNearbyFulfilled =
      actions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      fetchNearbyOffersAction.pending.type,
      fetchNearbyOffersAction.fulfilled.type,
    ]);
    expect(fetchNearbyFulfilled.payload).toEqual(mockOffers);
  });

  it('should dispatch "fetchOfferReviewsAction.pending" and "fetchOfferReviewsAction.fulfilled" when server response 200', async () => {
    const mockReviews = [makeFakeReview('1'), makeFakeReview('2')];
    mockApi.onGet(`${APIRoute.Comments}/1`).reply(200, mockReviews);

    await store.dispatch(fetchOfferReviewsAction('1'));

    const actions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(actions);
    const fetchReviewsFulfilled =
      actions.at(1) as ReturnType<typeof fetchOfferReviewsAction.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      fetchOfferReviewsAction.pending.type,
      fetchOfferReviewsAction.fulfilled.type,
    ]);
    expect(fetchReviewsFulfilled.payload).toEqual(mockReviews);
  });

  it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" when server response 200', async () => {
    const mockFavorites = [makeFakeOfferPreview('1', true)];
    mockApi.onGet(APIRoute.Favorite).reply(200, mockFavorites);

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(actions);
    const fetchFavoritesFulfilled =
      actions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type,
    ]);
    expect(fetchFavoritesFulfilled.payload).toEqual(mockFavorites);
  });

  it('should dispatch "checkAuthAction.pending", trigger "fetchFavoritesAction", and dispatch "checkAuthAction.fulfilled" when authorized', async () => {
    const mockUser = makeFakeUserData();
    const mockFavorites = [makeFakeOfferPreview('1', true)];
    mockApi.onGet(APIRoute.Login).reply(200, mockUser);
    mockApi.onGet(APIRoute.Favorite).reply(200, mockFavorites);

    await store.dispatch(checkAuthAction());

    const actionTypes = extractActionsTypes(store.getActions());
    const checkAuthFulfilled = store
      .getActions()
      .find(({type}) => type === checkAuthAction.fulfilled.type) as
      | ReturnType<typeof checkAuthAction.fulfilled>
      | undefined;

    expect(actionTypes).toEqual(
      expect.arrayContaining([
        checkAuthAction.pending.type,
        fetchFavoritesAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]),
    );
    expect(checkAuthFulfilled?.payload).toEqual(mockUser);
  });

  it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
    mockApi.onGet(APIRoute.Login).reply(400);

    await store.dispatch(checkAuthAction());

    const actionTypes = extractActionsTypes(store.getActions());

    expect(actionTypes).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type,
    ]);
  });

  it('should dispatch "changeFavoriteStatusAction.pending" and "changeFavoriteStatusAction.fulfilled" when server response 200', async () => {
    const updatedOffer = makeFakeOffer('1', true);
    const mockStatusData: FavoritesStatusData = {offerId: '1', status: 1};

    mockApi
      .onPost(
        `${APIRoute.Favorite}/${mockStatusData.offerId}/${mockStatusData.status}`,
      )
      .reply(200, updatedOffer);

    await store.dispatch(changeFavoriteStatusAction(mockStatusData));

    const actions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(actions);
    const fulfilled =
      actions.at(1) as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      changeFavoriteStatusAction.pending.type,
      changeFavoriteStatusAction.fulfilled.type,
    ]);
    expect(fulfilled.payload).toEqual(updatedOffer);
  });

  it('should dispatch "postOfferReviewAction.pending" and "postOfferReviewAction.fulfilled" and wrap single review', async () => {
    const mockReview = makeFakeReview('1');
    const mockReviewData: ReviewData = {
      offerId: '1',
      comment: 'Nice',
      rating: 5,
    };
    mockApi
      .onPost(`${APIRoute.Comments}/${mockReviewData.offerId}`)
      .reply(200, mockReview);

    await store.dispatch(postOfferReviewAction(mockReviewData));

    const actions = store.getActions();
    const extractedActionsTypes = extractActionsTypes(actions);
    const fulfilled =
      actions.at(1) as ReturnType<typeof postOfferReviewAction.fulfilled>;

    expect(extractedActionsTypes).toEqual([
      postOfferReviewAction.pending.type,
      postOfferReviewAction.fulfilled.type,
    ]);
    expect(fulfilled.payload).toEqual([mockReview]);
  });

  it('should dispatch "postOfferReviewAction.pending" and "postOfferReviewAction.rejected" when server response 400', async () => {
    const mockReviewData: ReviewData = {
      offerId: '1',
      comment: 'Nice',
      rating: 5,
    };
    mockApi
      .onPost(`${APIRoute.Comments}/${mockReviewData.offerId}`)
      .reply(400);

    await store.dispatch(postOfferReviewAction(mockReviewData));

    const actionTypes = extractActionsTypes(store.getActions());

    expect(actionTypes).toEqual([
      postOfferReviewAction.pending.type,
      postOfferReviewAction.rejected.type,
    ]);
  });

  it('should dispatch "errorReset" after timeout in clearErrorAction', async () => {
    vi.useFakeTimers();

    const actionPromise = store.dispatch(clearErrorAction());
    await vi.advanceTimersByTimeAsync(TIMEOUT_SHOW_ERROR);
    await actionPromise;

    const actions = store.getActions();
    expect(actions[0].type).toBe(errorReset.type);

    vi.useRealTimers();
  });
});
