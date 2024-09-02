import React from "react";
import styles from "./Categories.module.scss";
const Categories = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onClickCategory = (num) => {
    setActiveIndex(num);
  };

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
            className={activeIndex === index ? "active" : ""}
            onClick={() => onClickCategory(index)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
