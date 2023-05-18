import { useMemo, useState } from 'react';

import {
  PaginationState,
  SortingState,
  Updater,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import {
  DebouncedInput,
  Select,
  SelectOption,
  Table,
  URL_TABLE_COLUMN
} from '@/UI/components';
import { Pagination } from '@/UI/elements';
import { ITEMS_PER_PAGE } from '@/constants/api';
import { createPaginationShowList } from '@/utils';

import classes from './EmailsTableData.module.scss';
import { IMessage, useGetPaginatedEmailsQuery } from './EmailsTableDataStore';

const columnHelper = createColumnHelper<IMessage>();

const columns = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: (info) => info.getValue(),
    enableGlobalFilter: false
  }),
  columnHelper.accessor('from', {
    header: () => 'From',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('date', {
    header: () => 'Date',
    cell: (info) => info.getValue(),
    enableGlobalFilter: false
  }),
  columnHelper.accessor('message', {
    header: () => 'Message',
    cell: (info) => info.getValue(),
    enableSorting: false
  }),
  columnHelper.accessor(URL_TABLE_COLUMN, {
    header: () => 'URL',
    cell: (info) => info.getValue(),
    enableSorting: false,
    enableGlobalFilter: false
  })
];

export default function EmailsTableData() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectValue, setSelectValue] = useState<SelectOption>({
    label: `Show ${ITEMS_PER_PAGE}`,
    value: ITEMS_PER_PAGE
  });
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE
  });
  const { data, isLoading, isError, error } = useGetPaginatedEmailsQuery({
    id: sorting[0]?.id || '',
    currentPage: pageIndex,
    pageSize: pageSize,
    desc: sorting[0]?.desc || false,
    filter: globalFilter
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );

  const onSortingChangeHandler = (sortOptions: Updater<SortingState>) => {
    setPagination({
      pageIndex: 0,
      pageSize: pageSize
    });

    setSorting(sortOptions);
  };

  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    pageCount: data?.numberOfPages ?? -1,
    state: {
      pagination,
      sorting,
      globalFilter
    },
    onSortingChange: onSortingChangeHandler,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true
  });

  const totalPages = table.getPageCount();

  const selectValues = useMemo(
    () => createPaginationShowList(totalPages),
    [totalPages]
  );
  const onSelectChange = (item: SelectOption) => {
    setSelectValue(item);
    table.setPageSize(Number(item?.value));
  };

  return (
    <div className={classes['table-wrapper']}>
      <div className={classes['headline-helper']}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all..."
        />
        <Select
          preDefinedValue={selectValue}
          multiple={false}
          onChange={onSelectChange}
          options={selectValues}
        />
      </div>

      <Table
        table={table}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <Pagination
        currentPage={pageIndex}
        isNextDisabled={!table.getCanNextPage()}
        isPreviousDisabled={!table.getCanPreviousPage()}
        numberOfPages={totalPages}
        pageSetter={table.setPageIndex}
      />
    </div>
  );
}
