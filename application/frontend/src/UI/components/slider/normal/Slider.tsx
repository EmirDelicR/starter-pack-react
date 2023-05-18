import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos
} from 'react-icons/md';

import { Avatar, Feedback } from '@/UI/components';
import useSlider, { SliderProps } from '@/UI/components/slider/useSlider';
import { classNameHelper } from '@/utils';

import classes from './Slider.module.scss';

interface SlideProps {
  url: string;
  name: string;
  isTestimonial: boolean;
  rating?: number;
}

function Slide({ url, name, isTestimonial, rating = 0 }: SlideProps) {
  let content = (
    <img
      loading="lazy"
      src={url}
      alt={name}
      className={classes['slide-image']}
    />
  );

  if (isTestimonial) {
    content = <Feedback name={name} rating={rating} />;
  }

  return <div className={classes.slide}>{content}</div>;
}

interface ArrowsProps {
  changeSlide: (index: number) => void;
  show: boolean;
}

function Arrows({ changeSlide, show }: ArrowsProps) {
  if (!show) {
    return null;
  }

  return (
    <div className={classes.arrows}>
      <MdOutlineArrowBackIos
        role="arrow-back"
        className={classes.arrow}
        onClick={() => changeSlide(-1)}
      />
      <MdOutlineArrowForwardIos
        role="arrow-forward"
        className={classes.arrow}
        onClick={() => changeSlide(1)}
      />
    </div>
  );
}

interface DotsProps {
  slidesCount: number;
  currentSlide: number;
  goToSlide: (index: number) => void;
  show: boolean;
  isTestimonial: boolean;
}

function Dots({
  show,
  slidesCount,
  currentSlide,
  goToSlide,
  isTestimonial
}: DotsProps) {
  if (!show) {
    return null;
  }

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < slidesCount; i++) {
      const mainClass = isTestimonial ? classes.testimonial : classes.dot;
      const selectedClass = currentSlide === i ? classes.selected : '';
      const onDotClickHandler = (index: number) => () => goToSlide(index);

      dots.push(
        <div
          key={`dot-${i}`}
          className={classNameHelper(mainClass, selectedClass)}
          onClick={onDotClickHandler(i)}
        >
          {isTestimonial ? <Avatar size={2.5} /> : null}
        </div>
      );
    }

    return dots;
  };

  return (
    <div className={classes.dots} data-testid="dots">
      {renderDots()}
    </div>
  );
}

export function Slider({
  items,
  autoPlay = true,
  showArrows = true,
  showDots = true,
  isTestimonial = false
}: SliderProps) {
  const { slide, setSlide, changeSlide } = useSlider({ items, autoPlay });

  if (items.length === 0) {
    return null;
  }

  const goToSlide = (index: number) => {
    setSlide(index % items.length);
  };

  return (
    <div className={classes.slider} data-testid="slider">
      <Arrows changeSlide={changeSlide} show={showArrows} />
      <div
        className={classes['slide-list']}
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        {items.map((item) => (
          <Slide key={item.name} {...item} isTestimonial={isTestimonial} />
        ))}
      </div>
      <Dots
        isTestimonial={isTestimonial}
        currentSlide={slide}
        slidesCount={items.length}
        goToSlide={goToSlide}
        show={showDots}
      />
    </div>
  );
}
