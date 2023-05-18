import { vi } from 'vitest';

import {
  classNameHelper,
  createDynamicArray,
  localStorageHelper
} from './general';

describe('General utils test', () => {
  describe('classNameHelper utils function', () => {
    it('should return string from arguments array', () => {
      expect(classNameHelper('')).toEqual('');
      expect(classNameHelper(' ')).toEqual('');
      expect(classNameHelper()).toEqual('');
      expect(classNameHelper('test')).toEqual('test');
      expect(classNameHelper('test', 'test_1', 'test_2')).toEqual(
        'test test_1 test_2'
      );
      expect(classNameHelper('test', ' ', 'test_2')).toEqual('test test_2');
      expect(classNameHelper('test', '    ', '', 'test_2')).toEqual(
        'test test_2'
      );
      expect(classNameHelper('test', ' ', '', '  ', 'test_2   ', '')).toEqual(
        'test test_2'
      );
    });
  });

  describe('createDynamicArray utils function', () => {
    it('should return array with elements', () => {
      expect(createDynamicArray(-1)).toEqual([0]);
      expect(createDynamicArray(0)).toEqual([]);
      expect(createDynamicArray(3)).toEqual([0, 1, 2]);
    });
  });

  describe('localStorageHelper utils function', () => {
    const mockGetItem = vi.fn();
    const mockSetItem = vi.fn();
    const realLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem
      }
    });

    afterAll(() => {
      Object.defineProperty(window, 'localStorage', realLocalStorage);
    });

    it('should call localStorage functions', () => {
      const [setValue, getValue] = localStorageHelper('test');
      setValue(null);
      getValue('test');

      expect(mockSetItem).toBeCalledWith('test', 'null');
      expect(mockGetItem).toBeCalledWith('test');
    });
  });
});
