import HttpError from 'src/util/errors/httpError';
import {
  validateEmail,
  validatePassword,
  validateProperty
} from 'src/util/validation';

describe('Validation utils', () => {
  describe('validateProperty', () => {
    it('should throw error if property is empty', () => {
      expect(() => validateProperty('  ', 'Password')).toThrow(HttpError);
      expect(() => validateProperty('', 'Password')).toThrow(HttpError);
      expect(() => validateProperty('', 'Password')).toThrow(
        'Password must be provided!'
      );
    });

    it('should not throw error if property is set', () => {
      expect(() => validateProperty('test', 'Password')).not.toThrow(HttpError);
    });
  });

  describe('validateEmail', () => {
    it('should throw error if email is empty', () => {
      expect(() => validateEmail('  ')).toThrow(HttpError);
      expect(() => validateEmail('')).toThrow(HttpError);
      expect(() => validateEmail('')).toThrow('Email must be provided!');
    });

    it('should throw error if email is not valid', () => {
      expect(() => validateEmail('t')).toThrow('Email address must be valid!');
      expect(() => validateEmail('t@x')).toThrow(
        'Email address must be valid!'
      );
      expect(() => validateEmail('t@x.c')).toThrow(
        'Email address must be valid!'
      );
    });

    it('should not throw error if property is set', () => {
      expect(() => validateEmail('test@test.com')).not.toThrow(HttpError);
    });
  });

  describe('validatePassword', () => {
    it('should throw error if email is empty', () => {
      expect(() => validatePassword('  ')).toThrow(HttpError);
      expect(() => validatePassword('')).toThrow(HttpError);
      expect(() => validatePassword('')).toThrow('Password must be provided!');
    });

    it('should throw error if password is not strong enough', () => {
      expect(() => validatePassword('t')).toThrow(
        'Password is not strong enough!(min 8 char | number | special char)'
      );
      expect(() => validatePassword('test')).toThrow(
        'Password is not strong enough!(min 8 char | number | special char)'
      );
      expect(() => validatePassword('testing_more_chars')).toThrow(
        'Password is not strong enough!(min 8 char | number | special char)'
      );
      expect(() => validatePassword('testing_more_chars_8')).toThrow(
        'Password is not strong enough!(min 8 char | number | special char)'
      );
      expect(() => validatePassword('testing_more_chars_!')).toThrow(
        'Password is not strong enough!(min 8 char | number | special char)'
      );
    });

    it('should not throw error if property is set', () => {
      expect(() => validatePassword('testing_more_chars_8_!')).not.toThrow(
        'Password is not strong enough!(min 8 char | number | special char)'
      );
    });
  });
});
