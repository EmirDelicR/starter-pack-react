import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Table as TableType, flexRender } from '@tanstack/react-table';

import { Error, Link, Loader } from '@/UI/components';

import classes from './Table.module.scss';

interface Props<T> {
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  table: TableType<T>;
}

export const URL_TABLE_COLUMN = 'previewUrl';

export function Table<T>({ table, isLoading, isError, error }: Props<T>) {
  const renderTableData = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={table.getAllColumns().length}>
            <Loader size={5} />
          </td>
        </tr>
      );
    }

    if (isError) {
      return (
        <tr>
          <td colSpan={table.getAllColumns().length}>
            <Error isError={isError} error={error} />
          </td>
        </tr>
      );
    }

    return (
      <>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              if (cell.column.id === URL_TABLE_COLUMN) {
                return (
                  <td key={cell.id}>
                    <Link href={cell.getContext().getValue() as string}>
                      Link
                    </Link>
                  </td>
                );
              }
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  return (
    <table className={classes.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                <div
                  className={
                    header.column.getCanSort() ? classes['sort-header'] : ''
                  }
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' ▲',
                    desc: ' ▼'
                  }[header.column.getIsSorted() as string] ?? ' '}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  );
}
