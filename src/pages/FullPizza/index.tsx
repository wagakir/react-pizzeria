import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./FullPizza.module.scss";
const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    sizes: [];
    types: [];
  }>();
  const { id } = useParams();
  const [activeIndexSize, setActiveIndexSize] = React.useState(0);

  const [activeIndexType, setActiveIndexType] = React.useState(0);
  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3020/pizza/${id}`);

        await setPizza(data);
      } catch (error) {
        alert(`Не удалось получить пиццу с сервера ошибка ${error}`);
        navigate("/");
      }
    };
    fetchPizza();
    console.log(pizza);
  }, []);

  return (
    <>
      {pizza ? (
        <div className={styles.root}>
          <div>
            <img src={pizza.imageUrl} height={240} width={240} alt="Pizza" />
            <h2>{pizza.title}</h2>
          </div>
          <div>
            <div className={styles.selector}>
              <ul>
                {pizza.types.map((type: string, index: number) => (
                  <li
                    key={index}
                    className={activeIndexType === index ? styles.active : ""}
                    onClick={() => setActiveIndexType(index)}
                  >
                    {type}
                  </li>
                ))}
              </ul>
              <ul>
                {pizza.sizes.map((size, index) => (
                  <li
                    key={index}
                    className={activeIndexSize === index ? styles.active : ""}
                    onClick={() => setActiveIndexSize(index)}
                  >
                    {size} см.
                  </li>
                ))}
              </ul>
            </div>
            <span>{pizza.price + activeIndexSize * 200} ₽</span>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente,
            velit. Possimus nisi libero aliquam, quas cupiditate magnam quaerat
            officiis eligendi quasi? Est alias architecto animi corrupti rem
            quos perferendis quisquam.
          </p>
        </div>
      ) : (
        <div className={styles.root}>
          <div>
            <h2>Загрузка...</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default FullPizza;
