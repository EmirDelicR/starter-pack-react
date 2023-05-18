import { Fragment, useCallback, useMemo } from 'react';
import { BsPatchCheck } from 'react-icons/bs';

import { classNameHelper, createDynamicArray } from '@/utils';

import classes from './Stepper.module.scss';

interface Props {
  numberOfStages: number;
  currentStep: number;
  onClickHandler: (index: number) => void;
}

export function Stepper({
  numberOfStages,
  currentStep,
  onClickHandler
}: Props) {
  const navigateTo = useCallback(
    (index: number) => () => {
      if (index >= currentStep) {
        return;
      }

      onClickHandler(index);
    },
    [currentStep]
  );

  const createSteps = useMemo(() => {
    return createDynamicArray(numberOfStages).map((index) => {
      const activeClass = currentStep > index ? classes.active : '';
      return (
        <Fragment key={crypto.randomUUID()}>
          <BsPatchCheck
            role="check-icon"
            className={classNameHelper(classes.icon, activeClass)}
            onClick={navigateTo(index)}
          />
          {index !== numberOfStages - 1 && (
            <div className={classes['line-wrapper']}>
              <span
                className={classNameHelper(classes.line, activeClass)}
              ></span>
            </div>
          )}
        </Fragment>
      );
    });
  }, [numberOfStages, currentStep]);

  return <div className={classes.stepper}>{createSteps}</div>;
}
