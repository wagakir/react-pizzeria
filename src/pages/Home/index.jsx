import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Categories from "../../components/Categories";
// import pizzaArrayJson from "../../assets/pizzaArray.json";
import PizzaBlock from "../../components/PizzaBlock";
import PizzaLoader from "../../components/PizzaLoader";
import styles from "./Home.module.scss";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";

// сортирвока json server  /pizza?_sort=price_order=desc где _order=desc реверсия списка
const Home = () => {
  const category = useSelector((state) => state.filter.category);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const sortProperty = useSelector((state) => state.filter.sortProperty);
  const sortDesc = useSelector((state) => state.filter.sortDesc);
  const itemsWrapper = useRef(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const endOffset = itemOffset + itemsPerPage;
  //sort logic

  const delay = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  };
  const [pizzaArray, setPizzaArray] = useState([]);
  const [pizzaArrayToRender, setPizzaArrayToRender] = useState([]);

  useEffect(() => {
    if (Math.ceil(Number(itemsWrapper.current.offsetWidth) / 250) > 3) {
      setItemsPerPage(
        Math.ceil(Number(itemsWrapper.current.offsetWidth) / 250)
      );
    } else {
      setItemsPerPage(4);
    }

    const getPizza = async () => {
      try {
        setPizzaArray([...new Array(10)]);
        await delay(200);

        const pizzaResponse = await axios.get(
          `http://localhost:3020/pizza?_sort=${sortProperty.property}${
            sortDesc ? "&_order=desc" : ""
          }${searchValue ? "&q=" + searchValue : ""}${
            category ? "&category=" + category : ""
          }
          `
        );
        await setPizzaArray(pizzaResponse.data);

        //ну неполучается с json серваком просто вставить &_order=desc и реверснуть список
        setPizzaArrayToRender(pizzaResponse.data.slice(itemOffset, endOffset));
      } catch {
        console.error();
      }
    };
    getPizza();
  }, [category, sortProperty, sortDesc, searchValue, endOffset, itemOffset]);

  return (
    <div>
      <div className={styles.top}>
        <Categories />
        <Sort />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div ref={itemsWrapper} className={styles.items}>
        {pizzaArrayToRender.map((obj, index) =>
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
