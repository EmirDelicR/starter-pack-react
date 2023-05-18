import { ReactNode } from 'react';

import classes from './Hero.module.scss';

interface Props {
  leftSideContent: ReactNode;
  rightSideContent: ReactNode;
}

export function Hero({ leftSideContent, rightSideContent }: Props) {
  return (
    <div className={classes.hero}>
      <div className={classes['content-left']}>{leftSideContent}</div>
      <div className={classes['content-right']}>{rightSideContent}</div>
    </div>
  );
}
