export default function Pagination({
  pageIndex,
  pageCount,
  setPageIndex,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Page {pageIndex + 1} of {pageCount}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setPageIndex(0)}
          disabled={!canPreviousPage}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          First
        </button>

        <button
          onClick={previousPage}
          disabled={!canPreviousPage}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <button
          onClick={nextPage}
          disabled={!canNextPage}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>

        <button
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={!canNextPage}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Last
        </button>
      </div>
    </div>
  );
}
