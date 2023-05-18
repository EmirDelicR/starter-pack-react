import { RefObject } from 'react';

export const endTransitionHandler = (
  element: HTMLElement,
  callback: () => void
) => {
  const onEndCallbackFn = (event: TransitionEvent) => {
    if (event.target != element) return;
    element.removeEventListener('transitionend', onEndCallbackFn);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  element.addEventListener('transitionend', onEndCallbackFn);
};

export const getStackOfPages = (
  currentPageIndex: number,
  numberOfPages: number,
  indexToExclude: number | null = null
) => {
  const firstPage =
    currentPageIndex + 1 < numberOfPages ? currentPageIndex + 1 : 0;
  const secondPage =
    currentPageIndex + 2 < numberOfPages ? currentPageIndex + 2 : 1;

  const pageIndexes = [];

  if (indexToExclude != currentPageIndex) {
    pageIndexes.push(currentPageIndex);
  }

  if (indexToExclude != firstPage) {
    pageIndexes.push(firstPage);
  }

  if (indexToExclude != secondPage) {
    pageIndexes.push(secondPage);
  }

  return pageIndexes;
};

export const updatePageStack = (
  pageIndex: number,
  numberOfPages: number,
  pages: HTMLElement[]
) => {
  const stackPages = getStackOfPages(pageIndex, numberOfPages);
  stackPages.forEach((pageIndex, index) => {
    const page = pages[pageIndex];
    const translationValue = parseInt(String(-1 * 200 - 50 * index));
    page.style.transform = `translate3d(0, 75%, ${translationValue}px)`;
  });
};

export const buildPageStack = (
  pageIndex: number,
  numberOfPages: number,
  pages: HTMLElement[]
) => {
  const stackOfPages = getStackOfPages(pageIndex, numberOfPages);
  /**
   * set z-index, opacity, initial transforms to pages
   * and add class page--inactive to all except the current one
   * */
  for (let i = 0; i < numberOfPages; ++i) {
    const page = pages[i];
    const position = stackOfPages.indexOf(i);

    if (pageIndex !== i) {
      page.classList.add('page--inactive');
      page.style.transform = getTransformValue(position);
    } else {
      page.classList.remove('page--inactive');
    }
    const zIndex =
      i < pageIndex ? pageIndex - i : numberOfPages + pageIndex - i;
    page.style.zIndex = String(zIndex);

    page.style.opacity = String(getOpacityValue(position));
  }
};

export const toggleClasses = (
  menuRef: RefObject<HTMLButtonElement>,
  navRef: RefObject<HTMLDivElement>
) => {
  menuRef.current!.classList.toggle('menu-button--open');
  navRef.current!.classList.toggle('nav--open');
};

const getTransformValue = (position: number) => {
  return position !== -1
    ? 'translate3d(0,100%,0)'
    : 'translate3d(0,75%,-300px)';
};

const getOpacityValue = (position: number) => {
  return position !== -1 ? parseFloat(String(1 - 0.1 * position)) : 0;
};
