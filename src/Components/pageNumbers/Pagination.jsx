import React, { memo } from "react";
import ReactPaginate from "react-paginate";
function Pagination({
  pageCount = 0,
  pageNumber = 0,
  handlePageClick = () => {},
}) {
  return (
    <div>
      <ReactPaginate
        nextLabel=">"
        onPageChange={(e) => handlePageClick(e.selected + 1)}
        pageRangeDisplayed={5}
        breakLabel="..."
        pageCount={pageCount}
        forcePage={pageNumber - 1}
        previousLabel="<"
        activeClassName={"active"}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={3}
      />
    </div>
  );
}

export default memo(
  Pagination,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
);
