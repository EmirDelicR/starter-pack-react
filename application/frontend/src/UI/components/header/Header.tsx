import { PropsWithChildren } from 'react';

import useAddAnimation from '@/hooks/useAddAnimation';
import { classNameHelper } from '@/utils';

import classes from './Header.module.scss';

interface Props extends PropsWithChildren {
  headline: string;
  subHeadline?: string | null;
  dataColor?: 'light' | '';
  hasFilter?: boolean;
}

export function Header({
  children,
  headline,
  subHeadline = null,
  dataColor = '',
  hasFilter = false
}: Props) {
  const { elementRef, animationClass } = useAddAnimation(classes);
  const filterClass = hasFilter ? classes.filter : '';

  return (
    <header
      ref={elementRef}
      className={classNameHelper(classes.header, filterClass)}
      data-color={dataColor}
    >
      <h1 className={classNameHelper(classes.headline, animationClass)}>
        {headline}
      </h1>
      {subHeadline ? (
        <p className={classes['sub-headline']}>{subHeadline}</p>
      ) : null}
      {children}
    </header>
  );
}
