import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useMediaQuery from '@/hooks/useMediaQuery';

describe('useMediaQuery hook test', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Match Media is not in window', () => {
    it('Should return initial value', () => {
      const { result } = renderHook(() =>
        useMediaQuery('(max-width: 740px)', true)
      );

      expect(result.current).toEqual(true);
    });

    it('Should return false if initial value is undefined and useInitialValue is false', () => {
      const { result } = renderHook(() =>
        useMediaQuery('(max-width: 740px)', undefined, false)
      );

      expect(result.current).toEqual(false);
    });

    it('Should return false if initial value is undefined', () => {
      const { result } = renderHook(() =>
        useMediaQuery('(max-width: 740px)', undefined)
      );

      expect(result.current).toEqual(false);
    });
  });

  describe('MatchMedia is in window', () => {
    let mockMatches = false;

    beforeAll(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => {
          return {
            matches: mockMatches,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn()
          };
        }
      });
    });

    beforeEach(() => {
      mockMatches = false;
    });

    it('Should return false if matchMedia matches is false', () => {
      const { result } = renderHook(() => useMediaQuery());

      expect(result.current).toEqual(false);
    });

    it('Should return true if matchMedia matches is true', () => {
      mockMatches = true;
      const { result } = renderHook(() => useMediaQuery());

      expect(result.current).toEqual(true);
    });
  });
});
