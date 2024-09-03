import React from "react";
import styles from "./Categories.module.scss";
const Categories = ({ activeCategory, setActiveCategory }) => {
  // const onClickCategory = (num) => {
  //   num);
  // };

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
            className={activeCategory === index ? "active" : ""}
            onClick={() => setActiveCategory(index)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
