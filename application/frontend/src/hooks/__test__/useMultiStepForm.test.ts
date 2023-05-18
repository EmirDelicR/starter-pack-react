import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useMultiStepForm from '@/hooks/useMultiStepForm';

describe('useMultiStepForm hook test', () => {
  const titles = {
    0: 'page-1',
    1: 'page-2'
  };

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Should return object with properties', () => {
    const { result } = renderHook(() => useMultiStepForm(titles));

    expect(result.current).toHaveProperty('page');
    expect(result.current).toHaveProperty('disableBack');
    expect(result.current).toHaveProperty('disableNext');
    expect(result.current).toHaveProperty('goNext');
    expect(result.current).toHaveProperty('goBack');
    expect(result.current).toHaveProperty('goToPage');
  });

  it('Should return initial values for properties', () => {
    const { result } = renderHook(() => useMultiStepForm(titles));

    expect(result.current.page).toEqual(0);
    expect(result.current.disableBack).toEqual(true);
    expect(result.current.disableNext).toEqual(false);
  });

  it('Should update the state and navigate to next page if goNext is called', () => {
    const { result } = renderHook(() => useMultiStepForm(titles));

    act(() => {
      result.current.goNext();
    });

    expect(result.current.page).toEqual(1);
    expect(result.current.disableBack).toEqual(false);
    expect(result.current.disableNext).toEqual(true);
  });

  it('Should return initial values for properties if first goNext is called and then goBack', () => {
    const { result } = renderHook(() => useMultiStepForm(titles));

    act(() => {
      result.current.goNext();
      result.current.goBack();
    });

    expect(result.current.page).toEqual(0);
    expect(result.current.disableBack).toEqual(true);
    expect(result.current.disableNext).toEqual(false);
  });

  it('Should update the state and navigate to page if goToPage is called', () => {
    const { result } = renderHook(() => useMultiStepForm(titles));

    act(() => {
      result.current.goToPage(1);
    });

    expect(result.current.page).toEqual(1);
    expect(result.current.disableBack).toEqual(false);
    expect(result.current.disableNext).toEqual(true);
  });
});
