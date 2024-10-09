import React from "react";
import styles from "./PizzaBlock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
type PizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: string;
  rating: number;
};
const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  // const sizeTypes = [26, 30, 40];
  const typesTest = [" тонкое", "традиционное"];
  const onClickAdd = () => {
    const item = {
      id,
      title,
      price: price + activeIndexSize * 200,
      imageUrl,
      type: typesTest[activeIndexType],
      size: sizes[activeIndexSize],
      count: 1,
    };
    dispatch(addItem(item));
  };
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const dispatch = useDispatch();
  const [activeIndexSize, setActiveIndexSize] = React.useState(0);

  const [activeIndexType, setActiveIndexType] = React.useState(0);
  const addedCount = cartItem ? cartItem.count : 0;
  return (
    <div className={styles.pizza}>
      <Link to={"/pizza/" + id}>
        <img src={imageUrl} alt="Pizza" />
      </Link>

      <h4 className={styles.title}>{title}</h4>
      <div className={styles.selector}>
        <ul>
          {types.map((type, index) => (
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
          {sizes.map((size, index) => (
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
      <div className={styles.bottom}>
        <div className={styles.price}>от {price + activeIndexSize * 200} ₽</div>
        <div className="button outline add" onClick={() => onClickAdd()}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
