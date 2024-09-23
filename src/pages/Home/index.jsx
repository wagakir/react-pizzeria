import React, { useState, useEffect, useRef } from "react";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../../components/Categories";
// import pizzaArrayJson from "../../assets/pizzaArray.json";
import PizzaBlock from "../../components/PizzaBlock";
import PizzaLoader from "../../components/PizzaLoader";
import Sort, { sortList } from "../../components/Sort";
import Pagination from "../../components/Pagination";

import styles from "./Home.module.scss";

import { setFilters } from "../../redux/slices/filterSlice";
import { fetchPizzas } from "../../redux/slices/pizzaSlice";
import MessageWindow from "../../components/MessageWindow";
// сортирвока json server  /pizza?_sort=price_order=desc где _order=desc реверсия списка
const Home = () => {
  const isSearch = useRef(false);
  const itemsWrapper = useRef(null);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category, searchValue, sortProperty, sortDesc } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizza);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const endOffset = itemOffset + itemsPerPage;

  const getPizzas = async () => {
    // const pizzaResponse = await axios.get(
    //   `http://localhost:3020/pizza?_sort=${sortProperty.property}${
    //     sortDesc ? "&_order=desc" : ""
    //   }${searchValue ? "&q=" + searchValue : ""}${
    //     category > 0 ? "&category=" + category : ""
    //   }`
    // );
    dispatch(
      fetchPizzas({
        sortProperty,
        sortDesc,
        searchValue,
        category,
        itemsPerPage,
        itemOffset,
      })
    );

    window.scrollTo(0, 0);
  };
  // проверяем параметры адресной строки
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortProperty = sortList.find((obj) => obj.property === params.sort);
      dispatch(setFilters({ sortProperty, ...params }));
    }
    isSearch.current = true;
  }, []);
  //если изменили параметры и был первый рендер то добавляем параметры в адресную строку
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortProperty.property,
        sortDesc,
        category,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sortProperty, sortDesc]);
  // отравляем запрос на получение  массива пицц и сохраняем его в стейт
  useEffect(() => {
    //измеряем размер окна и считаем сколько пицц рендерить чтоб была одна строка
    if (Math.floor(Number(itemsWrapper.current.offsetWidth) / 280) > 3) {
      setItemsPerPage(
        Math.floor(Number(itemsWrapper.current.offsetWidth) / 280)
      );
    } else {
      setItemsPerPage(4);
    }
    if (!window.location.search) {
      getPizzas();
    }
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [category, sortProperty, sortDesc, searchValue, endOffset, itemOffset]);
  return (
    <div>
      <div className={styles.top}>
        <Categories />
        <Sort />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      {status === "error" ? (
        <MessageWindow
          title1="Ошибка при загрузке пицц"
          title2="перезагрузите страницу позднее, ведутся технические работы "
        />
      ) : (
        // :  items?.length === 0 ? (
        //   <MessageWindow title1="Пицц не найдено" title2="" />
        // )
        <>
          <div ref={itemsWrapper} className={styles.items}>
            {status === "loading"
              ? [...new Array(10)].map((obj, index) => (
                  <PizzaLoader key={index} />
                ))
              : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
          </div>
          <Pagination
            searchValue={searchValue}
            category={category}
            items={items}
            itemsPerPage={itemsPerPage}
            itemOffset={itemOffset}
            setItemOffset={(obj) => setItemOffset(obj)}
            endOffset={endOffset}
          />
        </>
      )}
    </div>
  );
};

export default Home;
