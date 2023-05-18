import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im';

import classes from './Rating.module.scss';

interface Props {
  value?: number;
}

const STAR_COUNT = 5;

function renderItems(value = 0) {
  return [...Array(STAR_COUNT)].map((_, index) => {
    const updatedIndex = index + 1;

    if (updatedIndex <= value) {
      return <ImStarFull key={`${updatedIndex}-star`} />;
    }

    if (updatedIndex > value && index < value) {
      return <ImStarHalf key={`${updatedIndex}-star`} />;
    }

    return <ImStarEmpty key={`${updatedIndex}-star`} />;
  });
}

export function Rating({ value = 0 }: Props) {
  return (
    <div className={classes.rating} data-testid="rating">
      {renderItems(value)}
    </div>
  );
}
