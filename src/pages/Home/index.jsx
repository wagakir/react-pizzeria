import React from "react";
import axios from "axios";

import Categories from "../../components/Categories";
// import pizzaArrayJson from "../../assets/pizzaArray.json";
import PizzaBlock from "../../components/PizzaBlock";
import PizzaLoader from "../../components/PizzaLoader";
import styles from "./Home.module.scss";
import Sort from "../../components/Sort";

// сортирвока json server  /pizza?_sort=price_order=desc где _order=desc реверсия списка
const Home = (props) => {
  //sort logic
  const [openSort, setOpenSort] = React.useState(false);
  const list = [
    { name: "популярности", sortProperty: "rating" },
    { name: "цене", sortProperty: "price" },
    { name: "алфавиту", sortProperty: "title" },
  ];
  const [sortDesc, setSortDesc] = React.useState(false);
  const [activeSortProperty, setActiveSortProperty] = React.useState(0);
  const onClickSort = (index) => {
    setOpenSort((val) => !val);
    setActiveSortProperty(index);
  };
  //category logic
  const [activeCategory, setActiveCategory] = React.useState(0);
  const delay = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  };
  const [pizzaArray, setPizzaArray] = React.useState([]);
  const getPizza = async () => {
    setPizzaArray([...new Array(10)]);
    const pizzaResponse = await axios.get(
      `http://localhost:3020/pizza?_sort=${
        list[activeSortProperty].sortProperty
      }${activeCategory ? "&category=" + activeCategory : ""}`
    );
    //ну неполучается с json серваком просто вставить &_order=desc и реверснуть список
    if (activeCategory) {
      setPizzaArray(pizzaResponse.data.reverce());
    } else {
      setPizzaArray(pizzaResponse.data);
    }
    await delay(300);
  };
  React.useEffect(() => {
    getPizza();
  }, [activeCategory, activeSortProperty, sortDesc]);

  return (
    <div>
      <div className={styles.top}>
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={(id) => {
            setActiveCategory(id);
          }}
        />
        <Sort
          sortDesc={sortDesc}
          setSortDesc={(val) => setSortDesc(val)}
          openSort={openSort}
          setOpenSort={(obj) => setOpenSort(obj)}
          list={list}
          activeSortProperty={activeSortProperty}
          onClickSort={(obj) => onClickSort(obj)}
        />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div className={styles.items}>
        {pizzaArray.map((obj, index) =>
          obj ? (
            <PizzaBlock {...obj} key={obj.id} />
          ) : (
            <PizzaLoader key={index} />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
