import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Pagination } from './Pagination';

describe('<Pagination />', () => {
  const pageSetterMock = vi.fn();
  Object.defineProperty(window, 'crypto', {
    value: { randomUUID: () => Math.random() }
  });

  beforeEach(() => {
    pageSetterMock.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should not render pagination if number of pages is 0', () => {
    render(
      <Pagination
        numberOfPages={0}
        currentPage={1}
        pageSetter={pageSetterMock}
        isNextDisabled={false}
        isPreviousDisabled={false}
      />
    );

    expect(screen.queryAllByRole('pagination-page').length).toEqual(0);
  });

  it('should render number of pages depending on numberOfPages', () => {
    render(
      <Pagination
        numberOfPages={5}
        currentPage={0}
        pageSetter={pageSetterMock}
        isNextDisabled={false}
        isPreviousDisabled={false}
      />
    );

    expect(screen.queryAllByRole('pagination-page').length).toEqual(5);
  });

  it('should go on specific page on item click', async () => {
    render(
      <Pagination
        numberOfPages={5}
        currentPage={1}
        pageSetter={pageSetterMock}
        isNextDisabled={false}
        isPreviousDisabled={false}
      />
    );

    const pageItems = screen.queryAllByRole('pagination-page');
    await userEvent.click(pageItems[3]);

    expect(pageSetterMock).toBeCalledWith(3);
  });

  it('should render button to load more data if is mobile view', () => {
    render(
      <Pagination
        numberOfPages={5}
        currentPage={1}
        pageSetter={pageSetterMock}
        isMobile={true}
        isNextDisabled={false}
        isPreviousDisabled={false}
      />
    );

    expect(screen.getByText('Load more')).toBeInTheDocument();
    expect(screen.queryAllByRole('pagination-page').length).toEqual(0);
  });
});
