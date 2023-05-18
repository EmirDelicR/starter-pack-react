import { ReactNode } from 'react';

import useAddAnimation from '@/hooks/useAddAnimation';
import { classNameHelper } from '@/utils';

import classes from './StatusCard.module.scss';

interface Props {
  headline: string;
  subHeadline: string;
  text: string;
  icon?: ReactNode | null;
}

export function StatusCard({
  headline,
  subHeadline,
  text,
  icon = null
}: Props) {
  const { elementRef, animationClass } = useAddAnimation(classes);

  return (
    <div
      ref={elementRef}
      className={classNameHelper(classes['status-card'], animationClass)}
    >
      <h1 className={classes.headline}>
        {icon}
        {headline}
      </h1>
      <span className={classes['sub-headline']}>{subHeadline}</span>
      <p className={classes.text}>{text}</p>
    </div>
  );
}
