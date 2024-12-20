import React from "react";
import styles from "./Sort.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSortProperty, setSortDesc } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";
export type SortItem = {
  name: string;
  property: string;
};
export const sortList: SortItem[] = [
  { name: "популярности", property: "rating" },
  { name: "цене", property: "price" },
  { name: "алфавиту", property: "title" },
];
const Sort = () => {
  const [openSort, setOpenSort] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const sortDesc = useSelector((state: RootState) => state.filter.sortDesc);
  const sortProperty = useSelector(
    (state: RootState) => state.filter.sortProperty
  );
  const onClickSort = (index: number) => {
    setOpenSort((val) => !val);
    dispatch(setSortProperty(sortList[index]));
  };
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpenSort(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.label}>
        <svg
          className={sortDesc ? styles.rotate : ""}
          onClick={() => dispatch(setSortDesc())}
          width="15"
          height="9"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b onClick={() => setOpenSort((val) => !val)}>Сортировка по:</b>
        <span onClick={() => setOpenSort((val) => !val)}>
          {sortProperty.name}
        </span>
      </div>
      {openSort && (
        <div className={styles.popup}>
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                className={sortProperty === obj ? styles.active : ""}
                onClick={() => onClickSort(index)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
