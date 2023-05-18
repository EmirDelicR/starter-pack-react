export const updateOpeningPage = (
  pageToOpen: HTMLElement,
  stackOfPages: number[],
  allPages: HTMLElement[]
) => {
  pageToOpen.style.transform = 'translate3d(0, 0, 0)';
  pageToOpen.style.opacity = '1';

  stackOfPages.forEach((pageIndex) => {
    const page = allPages[pageIndex];
    page.style.transform = 'translate3d(0,100%,0)';
  });
};

export const classNameHelper = (...args: string[]): string => {
  const classes = args.filter((entry) => entry && entry.trim() !== '');
  return classes.toString().replaceAll(',', ' ').trim();
};
