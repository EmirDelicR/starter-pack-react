import { useCallback, useEffect, useRef, useState } from 'react';

import useOutsideElementClick from '@/hooks/useOutsideElementClick';

function useSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const outsideClickHandler = useCallback(() => setIsOpen(false), []);
  useOutsideElementClick(containerRef, outsideClickHandler);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  const onContainerClick = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    highlightedIndex,
    containerRef,
    setIsOpen,
    setHighlightedIndex,
    onContainerClick
  };
}

export default useSelect;
