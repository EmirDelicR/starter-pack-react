import { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

import { classNameHelper } from '@/utils';

import classes from './Accordion.module.scss';

interface Props {
  data: {
    content: string;
    heading: string;
    imageSrc: string;
  }[];
}

export function Accordion({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const onClickHandler = (index: number) => () => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className={classes.accordion} data-cy="accordion">
      {data.map(({ heading, content, imageSrc }, index) => {
        const isActive = activeIndex === index;
        const activeClass = isActive ? classes.active : '';

        return (
          <div
            key={`${heading}-${index}`}
            className={classNameHelper(classes['accordion-panel'], activeClass)}
          >
            <h2 id={`panel-${index}-heading`}>
              <button
                className={classes['accordion-button']}
                aria-controls={`panel-${index}-content`}
                aria-expanded={isActive}
                onClick={onClickHandler(index)}
              >
                <span className={classes['accordion-headline']}>{heading}</span>
                <span aria-hidden={true} className={classes['accordion-icon']}>
                  {isActive ? (
                    <MdOutlineVisibility />
                  ) : (
                    <MdOutlineVisibilityOff />
                  )}
                </span>
              </button>
            </h2>
            <div
              className={classes['accordion-content']}
              id={`panel-${index}-content`}
              aria-labelledby={`panel-${index}-heading`}
              aria-hidden={!isActive}
              role="region"
            >
              <p className={classes['accordion-text']}>{content}</p>
              <img
                className={classes['accordion-image']}
                alt="Accordion background image"
                src={imageSrc}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// export function Accordion({ data }: Props) {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const onClickHandler = (index: number) => () => {
//     if (activeIndex === index) {
//       setActiveIndex(null);
//     } else {
//       setActiveIndex(index);
//     }
//   };

//   if (data.length === 0) {
//     return null;
//   }

//   return (
//     <div className={classes.accordion} data-cy="accordion">
//       {data.map(({ heading, content }, index) => {
//         const isActive = activeIndex === index;
//         const activeClass = isActive ? classes.active : '';

//         return (
//           <div
//             key={`${heading}-${index}`}
//             className={classes['accordion-item']}
//           >
//             <div
//               className={classes['accordion-toggle']}
//               onClick={onClickHandler(index)}
//             >
//               <h3>{heading}</h3>
//               <span>{isActive ? '-' : '+'}</span>
//             </div>
//             <div
//               className={classNameHelper(
//                 classes['accordion-content'],
//                 activeClass
//               )}
//             >
//               {content}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
