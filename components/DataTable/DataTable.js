"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import Pagination from "../Pagination/Pagination";

export default function DataTable({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
}) {
  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    manualPagination: true,
    pageCount,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* Header */}
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold text-gray-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t">
        <Pagination
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          pageCount={pageCount}
          setPageIndex={(index) =>
            setPagination((old) => ({ ...old, pageIndex: index }))
          }
          nextPage={() =>
            setPagination((old) => ({
              ...old,
              pageIndex: old.pageIndex + 1,
            }))
          }
          previousPage={() =>
            setPagination((old) => ({
              ...old,
              pageIndex: old.pageIndex - 1,
            }))
          }
          canNextPage={pagination.pageIndex < pageCount - 1}
          canPreviousPage={pagination.pageIndex > 0}
        />
      </div>
    </div>
  );
}
