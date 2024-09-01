import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
const Header = (props) => {
  return (
    <header className={styles.header}>
      <NavLink to="">React Pizza</NavLink>
      <NavLink to="cart">Cart</NavLink>
    </header>
  );
};

export default Header;
