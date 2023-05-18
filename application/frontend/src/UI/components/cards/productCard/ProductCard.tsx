import { BsPersonLinesFill } from 'react-icons/bs';

import { Avatar, Button } from '@/UI/components';
import useAddAnimation from '@/hooks/useAddAnimation';
import { classNameHelper } from '@/utils';

import classes from './ProductCard.module.scss';

function Buyers({ size }: { size: number }) {
  return (
    <div className={classes.buyers}>
      <Avatar size={size} />
      <Avatar size={size} />
      <Avatar size={size} />
    </div>
  );
}

interface Props {
  name: string;
  rank: number;
  url: string;
}

export function ProductCard({ rank, url, name }: Props) {
  const { elementRef, animationClass } = useAddAnimation(classes);

  return (
    <div
      ref={elementRef}
      className={classNameHelper(classes.card, animationClass)}
    >
      <div className={classes.rank}>{rank}</div>

      <div className={classes.info}>
        <img
          loading="lazy"
          className={classes.cover}
          src={url}
          alt="product-card-image"
        />
        <h1 className={classes.name}>{name}</h1>
        <div className={classes.status}>
          <p className={classes.viewers}>
            <BsPersonLinesFill /> 539.9k
          </p>
          <Buyers size={1.5} />
        </div>
      </div>
      <div className={classes['more-info']}>
        <div className={classes['stream-info']}>
          <p className={classes.statistics}>
            559k<span>Lorem ipsum</span>
          </p>
          <p className={classes.statistics}>
            25.8k<span>Lorem ipsum</span>
          </p>
        </div>
        <Button size="medium">See more</Button>
        <Buyers size={3} />
      </div>
      <div className={classes.background}></div>
    </div>
  );
}
