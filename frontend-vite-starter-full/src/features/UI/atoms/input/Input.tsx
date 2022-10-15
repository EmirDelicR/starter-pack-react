import React, { CSSProperties, ChangeEvent, FunctionComponent } from 'react';

import styles from './Input.module.scss';

type InputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const EMAIL_PATTERN = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
const PASSWORD_PATTERN = '.{8,}';
const NOT_EMPTY_PATTERN = '.{1,}';

interface Props {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email';
}

export const Input: FunctionComponent<InputType & Props> = ({
  label,
  onChange,
  type = 'text',
  ...rest
}) => {
  const renderLabel = () => {
    const labelCharacters = Array.from(label);
    return labelCharacters.map((item, index) => {
      return (
        <span
          key={`${item}-${index}`}
          aria-hidden="true"
          style={{ '--index': index } as CSSProperties}>
          {item === ' ' ? '\u00A0' : item}
        </span>
      );
    });
  };

  const getPattern = () => {
    if (type === 'email') {
      return EMAIL_PATTERN;
    }

    if (type === 'password') {
      return PASSWORD_PATTERN;
    }

    return NOT_EMPTY_PATTERN;
  };

  return (
    <div className={styles.input}>
      <input
        {...rest}
        required
        type={type}
        className={styles.field}
        pattern={getPattern()}
        placeholder="Enter data"
      />
      <label htmlFor="email" className={styles.label}>
        {renderLabel()}
        <span className={styles['sr-only']}>{label}</span>
      </label>
    </div>
  );
};
