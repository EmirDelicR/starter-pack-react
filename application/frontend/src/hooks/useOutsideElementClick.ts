import { RefObject, useEffect } from 'react';

interface ValidRefTarget {
  contains(target: EventTarget | null): unknown;
}

export default function useOutsideElementClick(
  ref: RefObject<ValidRefTarget>,
  handler: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}
