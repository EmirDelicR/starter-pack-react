import { Dispatch, SetStateAction } from 'react';
import {
  MdFirstPage,
  MdLastPage,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext
} from 'react-icons/md';

import { Button } from '@/UI/components';
import { classNameHelper, createDynamicArray } from '@/utils/general/general';

import classes from './Pagination.module.scss';

function createPaginationClasses(page: number, index: number) {
  const activeClass = page === index ? classes.active : '';

  if (page < index - 2 || page > index + 2) {
    return classNameHelper(classes.numbers, activeClass, classes.doted);
  }

  return classNameHelper(classes.numbers, activeClass);
}

interface Props {
  currentPage: number;
  numberOfPages: number;
  pageSetter: Dispatch<SetStateAction<number>>;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  isMobile?: boolean;
}

export function Pagination({
  currentPage,
  isNextDisabled,
  isPreviousDisabled,
  numberOfPages,
  pageSetter,
  isMobile = false
}: Props) {
  if (numberOfPages === 0) {
    return null;
  }

  const onBack = () =>
    pageSetter((prev) => {
      if (prev > 0) {
        return prev - 1;
      }

      return prev;
    });

  const onNext = () =>
    pageSetter((prev) => {
      if (prev > numberOfPages - 1) {
        return prev;
      }
      return prev + 1;
    });

  const onPageClick = (pageToGo: number) => () => pageSetter(pageToGo);

  if (isMobile) {
    return (
      <Button isDisabled={currentPage === numberOfPages} onClick={onNext}>
        Load more
      </Button>
    );
  }

  return (
    <div className={classes.pagination}>
      <div className={classes.navigation}>
        <button onClick={() => pageSetter(0)} disabled={isPreviousDisabled}>
          <MdFirstPage />
        </button>
        <button onClick={onBack} disabled={isPreviousDisabled}>
          <MdOutlineNavigateBefore />
        </button>
        <div className={classes['navigation-numbers']}>
          {createDynamicArray(numberOfPages).map((index) => {
            return (
              <span
                role="pagination-page"
                key={crypto.randomUUID()}
                className={createPaginationClasses(currentPage, index)}
                onClick={onPageClick(index)}
              >
                {index + 1}
              </span>
            );
          })}
        </div>
        <button onClick={onNext} disabled={isNextDisabled}>
          <MdOutlineNavigateNext />
        </button>
        <button
          onClick={() => pageSetter(numberOfPages - 1)}
          disabled={isNextDisabled}
        >
          <MdLastPage />
        </button>
      </div>
    </div>
  );
}
