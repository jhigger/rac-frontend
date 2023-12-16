import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { ArrowSwapVertical } from "iconsax-react";
import { useMemo, useState } from "react";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

const OrderTable = <T extends object>({
  data,
  columns,
}: ReactTableProps<T>) => {
  const defaultColumns = useMemo(() => columns, []);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  });

  return (
    <div className="max-h-[calc(100vh-431px)] overflow-auto">
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
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b bg-gray-10 px-[20px] py-[20px]"
            >
              {row.getVisibleCells().map((cell) => (
                <td className="border-0" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
