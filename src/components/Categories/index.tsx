import React from "react";
import styles from "./Categories.module.scss";
import { setCategory } from "../../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
export const categoriesArray = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories: React.FC = () => {
  const dispatch = useDispatch();

  // const onClickCategory = (num) => {
  // //   dispatch(setActiveCategory(num));
  // // };

  const category = useSelector((state: RootState) => state.filter.category);

  // const category = useSelector((state) => state.filter.category);
  // console.log(category);

  return (
    <div className={styles.categories}>
      <ul>
        {categoriesArray.map((title, index) => (
          <li
            className={
              Number(category) === Number(index)
                ? styles.selected
                : styles.unSelected
            }
            key={index}
            onClick={() => dispatch(setCategory(index))}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
