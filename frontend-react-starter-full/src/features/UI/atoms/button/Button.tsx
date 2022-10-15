import React, { FunctionComponent, PropsWithChildren } from 'react';

import styles from './Button.module.scss';

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends PropsWithChildren {
  className?: string;
  classType?: 'primary' | 'secondary';
  onClickHandler?: () => void;
  size?: 'icon' | 'small' | 'medium' | 'large';
  isSubmitButton?: boolean;
  isDisabled?: boolean;
}

export const Button: FunctionComponent<ButtonType & Props> = ({
  children,
  onClickHandler,
  className = '',
  classType = 'primary',
  isDisabled = false,
  isSubmitButton = false,
  size = 'medium',
  ...rest
}) => {
  const elementClass = `${styles.btn} ${styles[classType]} ${styles[size]} ${className}`;
  const buttonType = isSubmitButton ? 'submit' : 'button';

  return (
    <button
      {...rest}
      type={buttonType}
      className={elementClass}
      onClick={onClickHandler}
      disabled={isDisabled}>
      {children}
    </button>
  );
};
