import { useState } from 'react';

type ReturnType = {
  page: number;
  disableBack: boolean;
  disableNext: boolean;
  goNext: () => void;
  goBack: () => void;
  goToPage: (pageIndex: number) => void;
};

/**
 * @description This hook give you utils to navigate through multi step form
 * @param titles - Object like {0: 'page-name'}
 */
export default function useMultiStepForm(titles: { [key: number]: string }): ReturnType {
  const [page, setPage] = useState(0);

  const goBack = () => setPage((pageIndex: number) => pageIndex - 1);
  const goNext = () => setPage((pageIndex: number) => pageIndex + 1);
  const goToPage = (pageIndex: number) => setPage(pageIndex);

  const disableBack = page === 0;
  const disableNext = page === Object.keys(titles).length - 1;

  return {
    page,
    disableBack,
    disableNext,
    goNext,
    goBack,
    goToPage
  };
}
