import { useCallback, useEffect, useState } from 'react';

const AUTO_PLAY_TIME = 5000;

type Item = {
  url: string;
  name: string;
  rating?: number;
};

export interface SliderProps {
  items: Item[];
  autoPlay?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  isTestimonial?: boolean;
}

export default function useSlider({ items, autoPlay }: { items: Item[]; autoPlay: boolean }) {
  const [slide, setSlide] = useState<number>(0);

  const changeSlide = useCallback(
    (index = 1) => {
      let slideNumber = 0;

      if (slide + index < 0) {
        slideNumber = items.length - 1;
      } else {
        slideNumber = (slide + index) % items.length;
      }

      setSlide(slideNumber);
    },
    [slide, items.length]
  );

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide(1);
    }, AUTO_PLAY_TIME);

    return () => {
      clearInterval(interval);
    };
  }, [changeSlide, autoPlay]);

  return {
    slide,
    setSlide,
    changeSlide
  };
}
