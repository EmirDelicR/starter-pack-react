import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren
} from 'react';

import { classNameHelper } from '@/utils';

import classes from './Button.module.scss';

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  className?: string;
  classType?: 'primary' | 'secondary';
  onClick?: MouseEventHandler;
  size?: 'icon' | 'small' | 'medium' | 'large';
  type?: 'submit' | 'button';
  isDisabled?: boolean;
}

export function Button({
  children,
  onClick,
  className = '',
  classType = 'primary',
  isDisabled = false,
  type = 'button',
  size = 'medium',
  ...rest
}: PropsWithChildren<Props>) {
  const elementClass = classNameHelper(
    classes.btn,
    classes[classType],
    classes[size],
    className
  );

  return (
    <button
      type={type}
      className={elementClass}
      onClick={onClick}
      disabled={isDisabled}
      {...rest}
    >
      {children}
    </button>
  );
}
