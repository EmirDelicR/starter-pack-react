import HttpError from 'src/util/errors/httpError';

// eslint-disable-next-line operator-linebreak
const EMAIL_REGEX =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const isEmailValid = (email: string) => {
  if (email.length > 254) return false;
  if (!EMAIL_REGEX.test(email)) return false;

  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) return false;

  return true;
};

/**
 * @description - It will throw exception if property is empty string
 * @param property - item from the object
 * @param name - property name that will be added in error message
 */
export const validateProperty = (property: string, name: string) => {
  if (!property?.trim()) {
    throw new HttpError({
      message: `${name} must be provided!`,
      status: 400
    });
  }
};

export const validateEmail = (email: string) => {
  validateProperty(email, 'Email');

  if (!isEmailValid(email)) {
    throw new HttpError({
      message: 'Email address must be valid!',
      status: 400
    });
  }
};

/**
 * Minimum eight (8) characters
 * At least one number (0-9)
 * Special character ( ! # $ % & ( ) * + , -  / : ; < = > ? )
 * @param value - string
 * @returns boolean
 */
const passwordValidator = (value: string) =>
  // eslint-disable-next-line no-useless-escape, implicit-arrow-linebreak
  /^(?=.{8,})(?=.*?\d)(?=.*[\s!#$\%&\(\)\*\+\,\-\/\:;<=>?])(?=[a-zA-Z0-9]).*$/.test(
    value
  );

export const validatePassword = (password: string) => {
  validateProperty(password, 'Password');

  if (!passwordValidator(password)) {
    throw new HttpError({
      message:
        'Password is not strong enough!(min 8 char | number | special char)',
      status: 400
    });
  }
};
