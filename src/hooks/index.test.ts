import {renderHook} from '@testing-library/react';
import {vi} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../const';
import {useAppDispatch, useAppSelector} from './index';
import {makeFakeStore} from '../utils/mocks';
import {State} from '../types/state';

const {useDispatchMock, useSelectorMock} = vi.hoisted((): {
  useDispatchMock: ReturnType<typeof vi.fn>;
  useSelectorMock: ReturnType<typeof vi.fn>;
} => ({
  useDispatchMock: vi.fn(),
  useSelectorMock: vi.fn(),
}));

const mockState = makeFakeStore(AuthorizationStatus.Auth) as State;

const mockReactRedux = vi.hoisted(() => ({
  useDispatch: vi.fn(() => useDispatchMock),
  useSelector: vi.fn((selector: (state: State) => unknown) => {
    useSelectorMock(selector);
    return selector(mockState);
  }),
}));

vi.mock('react-redux', () => mockReactRedux);

describe('Hooks: useAppDispatch/useAppSelector', () => {
  it('should return react-redux dispatch', () => {
    const {result} = renderHook(() => useAppDispatch());

    expect(result.current).toBe(useDispatchMock);
    expect(mockReactRedux.useDispatch).toHaveBeenCalledTimes(1);
  });

  it('should return selected state from react-redux', () => {
    const {result} = renderHook(() =>
      useAppSelector((state) => state[NameSpace.Auth].status)
    );

    expect(result.current).toBe(AuthorizationStatus.Auth);
    expect(mockReactRedux.useSelector).toHaveBeenCalledTimes(1);
    expect(useSelectorMock).toHaveBeenCalledTimes(1);
  });
});
