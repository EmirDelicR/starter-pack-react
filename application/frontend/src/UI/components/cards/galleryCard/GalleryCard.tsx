import { Fragment } from 'react';

import classes from './GalleryCard.module.scss';

interface Props {
  data: string[];
}

export function GalleryCard({ data }: Props) {
  return (
    <div className={classes['card-group']}>
      {data.map((imageSource, index) => (
        <Fragment key={index}>
          <div
            className={classes['little-card']}
            style={{ backgroundImage: `url(${imageSource})` }}
          ></div>
          <div
            className={classes['big-card']}
            style={{ backgroundImage: `url(${imageSource})` }}
          ></div>
        </Fragment>
      ))}
    </div>
  );
}
