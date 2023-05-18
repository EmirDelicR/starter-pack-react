import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useAddAnimation from '@/hooks/useAddAnimation';

const element = {
  isIntersecting: false
};

vi.mock('@/hooks/useIntersectionObserver', () => ({
  default: () => element
}));

describe('useAddAnimation hook test', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Should return object with properties elementRef and animationClass', () => {
    const { result } = renderHook(() =>
      useAddAnimation({ animate: 'animate' })
    );

    expect(result.current).toHaveProperty('elementRef');
    expect(result.current).toHaveProperty('animationClass');
    expect(result.current.animationClass).toEqual('');
  });

  it('Should return animate class if element is intersecting', () => {
    element.isIntersecting = true;
    const { result } = renderHook(() =>
      useAddAnimation({ animate: 'animate' })
    );

    expect(result.current.animationClass).toEqual('animate');
  });
});
