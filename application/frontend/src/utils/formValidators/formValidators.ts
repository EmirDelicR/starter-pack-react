import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type InputData = { value: string; isValid: boolean };
type Validator = (value: string) => boolean;
type Setter = (data: InputData) => void;

export const emailValidator = (value: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/.test(
    value
  );

/**
 * Minimum eight (8) characters
 * At least one number (0-9)
 * Special character ( ! # $ % & ( ) * + , -  / : ; < = > ? )
 * @param value
 * @returns boolean
 */
export const passwordValidator = (value: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(?=.{8,})(?=.*?\d)(?=.*[\s!#$\%&\(\)\*\+\,\-\/\:;<=>?])(?=[a-zA-Z0-9]).*$/.test(
    value
  );

export const isNotEmptyString = (value: string) => {
  return value.trim().length !== 0;
};

export const onInputChange = (
  value: string,
  setter: Setter,
  validator: Validator = isNotEmptyString
) => {
  const isValid = validator(value);
  setter({ value, isValid });
};

export const normalizeError = (
  error:
    | Partial<FetchBaseQueryError>
    | SerializedError
    | { error: string }
    | undefined
) => {
  if (error === undefined) {
    return { id: '-1', message: 'Undefined Error occurred!' };
  }
  let message = '';

  if ('status' in error && typeof error.status === 'string') {
    message = `${error.status} | `;
  }

  if ('error' in error) {
    message += `${error.error} | `;
  }

  if ('data' in error && typeof error.data === 'string') {
    message += `${error.data}.`;
  }

  if (
    'data' in error &&
    typeof error.data === 'object' &&
    'message' in (error.data as { message: 'string' })
  ) {
    message += `${(error.data as { message: 'string' }).message}.`;
  }

  if (message.trim().length === 0) {
    message = 'Unknown Error Happen no additional data!';
  }

  return { id: crypto.randomUUID(), message: message.trim() };
};
