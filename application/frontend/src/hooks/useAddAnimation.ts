import { useRef } from 'react';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';

type Classes = {
  readonly [key: string]: string;
};

/**
 * @description This hook attach ref to element and listen for
 *              intersection observer and add class animate if
 *              element is in view
 * @param classes - imported class from scss module
 *
 */
export default function useAddAnimation(classes: Classes) {
  const elementRef = useRef<HTMLDivElement>(null);
  const element = useIntersectionObserver(elementRef, {});
  const animationClass = `${element?.isIntersecting ? classes.animate : ''}`;

  return {
    elementRef,
    animationClass
  };
}
