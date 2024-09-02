import React from "react";
import axios from "axios";

import Categories from "../../components/Categories";
import pizzaArrayJson from "../../assets/pizzaArray.json";
import PizzaBlock from "../../components/PizzaBlock";
import PizzaLoader from "../../components/PizzaLoader";
import styles from "./Home.module.scss";
import Sort from "../../components/Sort";
// сортирвока json server  /pizza?_sort=price_order=desc где _order=desc реверсия списка
const Home = (props) => {
  const delay = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  };
  const [pizzaArray, setPizzaArray] = React.useState([]);
  const getPizza = async () => {
    setPizzaArray([...new Array(10)]);
    const pizzaResponse = await axios.get("http://localhost:3020/pizza");
    await delay(300);
    setPizzaArray(pizzaResponse.data);
  };
  React.useEffect(() => {
    getPizza();
  }, []);

  return (
    <div>
      <div className={styles.top}>
        <Categories />
        <Sort />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div className={styles.items}>
        {pizzaArray.map((obj) =>
          obj ? <PizzaBlock {...obj} key={obj.id} /> : <PizzaLoader />
        )}
      </div>
    </div>
  );
};

export default Home;
