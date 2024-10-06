import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useSelector } from "react-redux";
type PaginationProps = {
  itemsPerPage: number;
  itemOffset: number;
  setItemOffset: (newOffset: number) => void;
  endOffset: number;
};
const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  itemOffset,
  setItemOffset,
  endOffset,
}) => {
  const [pizzaArray, setPizzaArray] = useState([]);
  const { category, searchValue }: any = useSelector(
    (state: any) => state.filter
  );
  useEffect(() => {
    axios
      .get(
        `http://localhost:3020/pizza?${searchValue ? "&q=" + searchValue : ""}${
          category > 0 ? "&category=" + category : ""
        }`
      )
      .then((res) => setPizzaArray(res.data));
  }, [searchValue, category]);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const pageCount = Math.ceil(pizzaArray.length / itemsPerPage);
  // const pageCount = 3;
  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % pizzaArray.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      {pageCount > 1 ? (
        <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Pagination;
