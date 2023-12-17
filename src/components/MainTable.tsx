import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowSquareLeft,
  ArrowSquareRight,
  ArrowSwapVertical,
} from "iconsax-react";
import { useMemo, useState } from "react";
import { SelectNumber } from "./Shop/Orders/OrdersPanel";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

const MainTable = <T extends object>({ data, columns }: ReactTableProps<T>) => {
  const defaultColumns = useMemo(() => columns, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  // todo: move pagination state to context close to useQuery if going with server side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    onPaginationChange: setPagination,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    manualPagination: true,
  });

  const firstRow =
    table.getState().pagination.pageSize *
    table.getState().pagination.pageIndex;
  const lastRow = firstRow + table.getState().pagination.pageSize;

  const startRowIndex = pageIndex * pageSize;
  const endRowIndex = Math.min(
    (pageIndex + 1) * pageSize,
    table.getRowModel().rows.length,
  );

  return (
    <div className="flex w-full flex-col gap-[10px] rounded-[20px] bg-white p-[20px]">
      <div className="h-[calc(100vh-552px)] overflow-auto md:h-[calc(100vh-431px)]">
        <table className="relative w-max">
          <thead className="title-sm sticky top-0 z-10 bg-white font-medium text-neutral-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border-0">
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex gap-[10px]"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <ArrowSwapVertical
                            className="self-end text-neutral-500"
                            size="20"
                          />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="border-y-[1px] border-gray-500 [&>tr]:border-b-[1px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
            {table
              .getRowModel()
              .rows.slice(startRowIndex, endRowIndex)
              .map((row) => (
                <tr
                  key={row.id}
                  className="border-b bg-gray-10 px-[20px] py-[20px]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td className="border-0" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="body-lg flex flex-col items-center gap-[20px] px-[20px] py-[10px] md:flex-row">
        <div className="flex items-center gap-[12px]">
          <span className="whitespace-nowrap">Items per page:</span>
          <div className="w-full md:w-max">
            <SelectNumber
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            />
          </div>
        </div>
        <div className="flex gap-[20px]">
          <span>
            {firstRow + 1}-
            {lastRow > table.getRowModel().rows.length
              ? table.getRowModel().rows.length
              : lastRow}{" "}
            of {table.getRowModel().rows.length}
          </span>
          <div className="flex gap-[10px]">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="btn relative flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
            >
              <ArrowSquareLeft
                className={
                  table.getCanPreviousPage()
                    ? "text-primary-600"
                    : "text-gray-200"
                }
              />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="btn relative flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
            >
              <ArrowSquareRight
                className={
                  table.getCanNextPage() ? "text-primary-600" : "text-gray-200"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTable;
