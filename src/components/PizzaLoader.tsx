import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./PizzaBlock/PizzaBlock.module.scss";
const PizzaLoader: React.FC = () => (
  <ContentLoader
    className={styles.pizza}
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="428" rx="3" ry="3" width="88" height="25" />
    <rect x="10" y="270" rx="3" ry="3" width="260" height="30" />
    <rect x="10" y="322" rx="3" ry="3" width="260" height="70" />
    <rect x="122" y="421" rx="20" ry="20" width="150" height="40" />
    <circle cx="140" cy="130" r="120" />
  </ContentLoader>
);

export default PizzaLoader;
