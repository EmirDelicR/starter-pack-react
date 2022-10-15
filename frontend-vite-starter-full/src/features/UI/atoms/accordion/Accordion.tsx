import { FunctionComponent, useState } from 'react';

import styles from './Accordion.module.scss';

interface Props {
  data: {
    content: string;
    heading: string;
  }[];
}

export const Accordion: FunctionComponent<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const onClickHandler = (index: number) => {
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
    <div className={styles.accordion}>
      {data.map(({ heading, content }, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={`${heading}-${index}`} className={styles['accordion-item']}>
            <div className={styles['accordion-toggle']} onClick={() => onClickHandler(index)}>
              <h3>{heading}</h3>
              <span>{isActive ? '-' : '+'}</span>
            </div>
            {
              <div className={`${styles['accordion-content']} ${isActive && styles.active}`}>
                {content}
              </div>
            }
          </div>
        );
      })}
    </div>
  );
};
