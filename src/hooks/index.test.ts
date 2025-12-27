import {renderHook} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import type {State, AppDispatch} from '../types/state';
import {useAppDispatch, useAppSelector} from './index';

const {useDispatchMock, useSelectorMock, dispatchMock} = vi.hoisted(() => {
  const mockState = {} as State;

  const dispatch = vi.fn() as AppDispatch;

  const useDispatch = vi.fn(() => dispatch);

  const useSelector = vi.fn(<T,>(selector: (state: State) => T) => selector(mockState));

  return {
    useDispatchMock: useDispatch,
    useSelectorMock: useSelector,
    dispatchMock: dispatch,
  };
});

vi.mock('react-redux', () => ({
  useDispatch: useDispatchMock,
  useSelector: useSelectorMock,
}));

describe('hooks: useAppDispatch/useAppSelector', () => {
  it('useAppDispatch should return dispatch from react-redux', () => {
    const {result} = renderHook(() => useAppDispatch());

    expect(useDispatchMock).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(dispatchMock);
  });

  it('useAppSelector should return selected value', () => {
    const expected = 'OK';

    const {result} = renderHook(() =>
      useAppSelector(() => expected)
    );

    expect(useSelectorMock).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(expected);
  });
});
