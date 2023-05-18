import { PropsWithChildren } from 'react';
import { BsFillChatQuoteFill } from 'react-icons/bs';

import { Rating } from '@/UI/components';

import classes from './Feedback.module.scss';

const DUMMY_TEXT = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

interface Props extends PropsWithChildren {
  name: string;
  rating: number;
  quote?: string;
}

export function Feedback({
  name,
  rating,
  quote = DUMMY_TEXT,
  children
}: Props) {
  return (
    <div className={classes.feedback}>
      <blockquote>
        <p className={classes.text}>
          <BsFillChatQuoteFill />
          {quote}
        </p>
      </blockquote>
      <small>{name}</small>
      <Rating value={rating} />
      {children}
    </div>
  );
}
