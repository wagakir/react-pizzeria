import React from "react";
import styles from "./Categories.module.scss";
import { setCategory } from "../../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";
const Categories = () => {
  const dispatch = useDispatch();
  // const onClickCategory = (num) => {
  //   dispatch(setActiveCategory(num));
  // };
  const category = useSelector((state) => state.filter.category);
  const categoriesArray = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className={styles.categories}>
      <ul>
        {categoriesArray.map((title, index) => (
          <li
            key={index}
            className={category === index ? "active" : ""}
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
