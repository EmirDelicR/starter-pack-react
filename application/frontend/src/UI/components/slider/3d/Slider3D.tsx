import useSlider, { SliderProps } from '@/UI/components/slider/useSlider';

import './Slider3D.scss';

export function Slider3D({ items, autoPlay = true }: SliderProps) {
  const { slide, setSlide } = useSlider({ items, autoPlay });

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="slider3d">
      {items.map((item, index) => (
        <input
          className="dot"
          key={item.name}
          checked={slide === index}
          onChange={() => setSlide(index)}
          type="radio"
          name={`slider-${index + 1}`}
          aria-label={`slider-${index + 1}`}
          id={`s${index + 1}`}
        />
      ))}
      {items.map((item, index) => (
        <img
          key={item.name}
          id={`slide${index + 1}`}
          loading="lazy"
          src={item.url}
          alt={item.name}
        />
      ))}
    </div>
  );
}
