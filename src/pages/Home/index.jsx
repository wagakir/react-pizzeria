import React, { useState, useEffect } from "react";
import axios from "axios";

import Categories from "../../components/Categories";
// import pizzaArrayJson from "../../assets/pizzaArray.json";
import PizzaBlock from "../../components/PizzaBlock";
import PizzaLoader from "../../components/PizzaLoader";
import styles from "./Home.module.scss";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";

// сортирвока json server  /pizza?_sort=price_order=desc где _order=desc реверсия списка
const Home = ({ searchValue }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;
  const endOffset = itemOffset + itemsPerPage;
  //sort logic
  const [openSort, setOpenSort] = useState(false);
  const list = [
    { name: "популярности", sortProperty: "rating" },
    { name: "цене", sortProperty: "price" },
    { name: "алфавиту", sortProperty: "title" },
  ];
  const [preResponsePizza, setPreResponsePizza] = useState([]);
  const [sortDesc, setSortDesc] = useState(false);
  const [activeSortProperty, setActiveSortProperty] = useState(0);
  const onClickSort = (index) => {
    setOpenSort((val) => !val);
    setActiveSortProperty(index);
  };
  //category logic
  const [activeCategory, setActiveCategory] = useState(0);
  const delay = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  };
  const [pizzaArray, setPizzaArray] = useState([]);

  useEffect(() => {
    const getPizza = async () => {
      try {
        setPizzaArray([...new Array(10)]);
        await delay(200);
        const pizzaResponse = await axios.get(
          `http://localhost:3020/pizza?_sort=${
            list[activeSortProperty].sortProperty + sortDesc && "&_order=desc"
          }${sortDesc ? "&_order=desc" : ""}${
            searchValue ? "&q=" + searchValue : ""
          }${activeCategory ? "&category=" + activeCategory : ""}
          `
        );
        console.log(endOffset);
        //ну неполучается с json серваком просто вставить &_order=desc и реверснуть список
        setPizzaArray(pizzaResponse.data.slice(itemOffset, endOffset));
      } catch {
        console.error();
      }
    };
    getPizza();
  }, [
    activeCategory,
    activeSortProperty,
    sortDesc,
    searchValue,
    endOffset,
    itemOffset,
  ]);

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
      <Pagination
        items={pizzaArray}
        itemsPerPage={itemsPerPage}
        itemOffset={itemOffset}
        setItemOffset={(obj) => setItemOffset(obj)}
        endOffset={endOffset}
      />
    </div>
  );
};

export default Home;
