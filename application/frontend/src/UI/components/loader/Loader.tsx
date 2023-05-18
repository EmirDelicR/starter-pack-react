import { CSSProperties } from 'react';
import { GiTimeTrap } from 'react-icons/gi';

import classes from './Loader.module.scss';

interface Props {
  size?: number;
}

function LoaderContent({ size = 10 }: Props) {
  if (size >= 3) {
    return (
      <div className={classes['clock-wrapper']}>
        <GiTimeTrap className={classes.clock} />
        <span className={classes.text}>Loading...</span>
      </div>
    );
  }
  return null;
}

export function Loader({ size = 10 }: Props) {
  let innerSize = size;

  if (size < 1) {
    innerSize = 1;
  }

  if (size > 10) {
    innerSize = 10;
  }

  return (
    <div
      className={classes.loader}
      role="loader"
      style={{ '--size': `${innerSize}em` } as CSSProperties}>
      <div className={classes.rotate}></div>
      <LoaderContent size={size} />
    </div>
  );
}
