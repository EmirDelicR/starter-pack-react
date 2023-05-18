import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { vi } from 'vitest';

import {
  emailValidator,
  isNotEmptyString,
  normalizeError,
  onInputChange,
  passwordValidator
} from './formValidators';

describe('Form Validators utils test', () => {
  Object.defineProperty(window, 'crypto', {
    value: { randomUUID: () => 'xxxx' }
  });

  describe('emailValidator utils function', () => {
    it('should validate email', () => {
      expect(emailValidator('test')).toEqual(false);
      expect(emailValidator('test@x')).toEqual(false);
      expect(emailValidator('test@x.c')).toEqual(false);
      expect(emailValidator('test@x.co')).toEqual(true);
      expect(emailValidator('test@x.com')).toEqual(true);
      expect(emailValidator('test@x.comc')).toEqual(true);
      expect(emailValidator('test@x.comcs')).toEqual(false);
      expect(emailValidator('test@!wx.com')).toEqual(false);
      expect(emailValidator('test@%wx.com')).toEqual(false);
      expect(emailValidator('test@2wx.com')).toEqual(true);
    });
  });

  describe('passwordValidator utils function', () => {
    it('should validate password', () => {
      expect(passwordValidator('t')).toEqual(false);
      expect(passwordValidator('testing')).toEqual(false);
      expect(passwordValidator('testingLength')).toEqual(false);
      expect(passwordValidator('TestUppercaseWithNumber8')).toEqual(false);
      expect(passwordValidator('testing_lowercase_with_number8')).toEqual(
        false
      );
      expect(passwordValidator('testing_special%_with_out_number')).toEqual(
        false
      );
      expect(passwordValidator('spec%_8')).toEqual(false);
      expect(passwordValidator('%_test_start_with_special_char_8')).toEqual(
        false
      );
      expect(passwordValidator('test_%_valid_8')).toEqual(true);
    });
  });

  describe('isNotEmptyString utils function', () => {
    it('should return true if is not empty string', () => {
      expect(isNotEmptyString('   ')).toEqual(false);
      expect(isNotEmptyString('')).toEqual(false);
      expect(isNotEmptyString('t')).toEqual(true);
      expect(isNotEmptyString('test ing string')).toEqual(true);
    });
  });

  describe('onInputChange utils function', () => {
    const setterMock = vi.fn();
    const validatorMock = vi.fn();

    afterEach(() => {
      vi.resetAllMocks();
    });

    it('should call setter with value and validate filed to false if empty string', () => {
      onInputChange(' ', setterMock);
      expect(setterMock).toBeCalledWith({ value: ' ', isValid: false });
    });

    it('should call setter with value and validate filed to true if value is set', () => {
      onInputChange('Test', setterMock);
      expect(setterMock).toBeCalledWith({ value: 'Test', isValid: true });
    });

    it('should call setter with value and validate filed', () => {
      validatorMock.mockReturnValue(true);
      onInputChange('Test', setterMock, validatorMock);

      expect(setterMock).toBeCalledWith({ value: 'Test', isValid: true });
      expect(validatorMock).toBeCalledTimes(1);
    });

    it('should call setter with value and validate filed', () => {
      validatorMock.mockReturnValue(false);
      onInputChange('Test', setterMock, validatorMock);

      expect(setterMock).toBeCalledWith({ value: 'Test', isValid: false });
      expect(validatorMock).toBeCalledTimes(1);
    });
  });

  describe('normalizeError utils function', () => {
    const errorMock: Partial<FetchBaseQueryError> = {
      status: 'CUSTOM_ERROR',
      data: { message: 'Some data' },
      error: 'Some error'
    };

    it('should return default error message if error is undefined', () => {
      expect(normalizeError(undefined)).toEqual({
        id: '-1',
        message: 'Undefined Error occurred!'
      });
    });

    it('should return all the data from error', () => {
      expect(normalizeError(errorMock)).toEqual({
        id: 'xxxx',
        message: 'CUSTOM_ERROR | Some error | Some data.'
      });
    });

    it('should remove Some data. from error message', () => {
      delete errorMock.data;
      expect(normalizeError(errorMock)).toEqual({
        id: 'xxxx',
        message: 'CUSTOM_ERROR | Some error |'
      });
    });

    it('should remove Some error from error message', () => {
      delete errorMock.error;
      expect(normalizeError(errorMock)).toEqual({
        id: 'xxxx',
        message: 'CUSTOM_ERROR |'
      });
    });

    it('should return general message if ', () => {
      delete errorMock.status;
      expect(normalizeError(errorMock)).toEqual({
        id: 'xxxx',
        message: 'Unknown Error Happen no additional data!'
      });
    });
  });
});
