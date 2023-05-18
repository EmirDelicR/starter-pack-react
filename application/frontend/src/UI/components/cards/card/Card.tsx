import { ReactNode } from 'react';

import useAddAnimation from '@/hooks/useAddAnimation';
import { classNameHelper } from '@/utils';

import classes from './Card.module.scss';

interface Props {
  headline: string;
  text: string;
  icon: ReactNode;
  withEffect?: boolean;
}

export function Card({ headline, text, icon, withEffect = false }: Props) {
  const { elementRef, animationClass } = useAddAnimation(classes);
  const effectClass = withEffect ? classes.effect : '';

  return (
    <div
      ref={elementRef}
      className={classNameHelper(classes.card, animationClass, effectClass)}
    >
      {icon}
      <h1 className={classes.headline}>{headline}</h1>
      <p className={classes.text}>{text}</p>
    </div>
  );
}
