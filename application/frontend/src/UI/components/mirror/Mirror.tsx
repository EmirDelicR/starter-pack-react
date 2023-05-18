import { useRef } from 'react';

import classes from './Mirror.module.scss';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NAME = 'SOME DATA';
let interval: ReturnType<typeof setInterval> | undefined = undefined;

export function Mirror() {
  const nameRef = useRef<HTMLSpanElement>(null);

  const onMouseEnterHandler = () => {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      nameRef.current!.innerText = NAME.split('')
        .map((_, index) => {
          if (index < iteration) {
            return NAME[index];
          }

          return LETTERS[Math.floor(Math.random() * 26)];
        })
        .join('');

      if (iteration >= NAME.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <div className={classes.mirror} onMouseEnter={onMouseEnterHandler}>
      <div className={classes.content}>
        <span ref={nameRef} className={classes.name}>
          {NAME}
        </span>
      </div>
    </div>
  );
}
