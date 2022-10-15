import { RefObject, useEffect } from 'react';

interface ValidRefTarget {
  contains(target: EventTarget | null): any;
}

const useOutsideElementClick = (ref: RefObject<ValidRefTarget>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOutsideElementClick;
