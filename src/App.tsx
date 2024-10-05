import { Route, Routes } from "react-router-dom";
import React from "react";

import "./App.scss";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home></Home>} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="cart" element={<Cart></Cart>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Route>
    </Routes>
  );
}

export default App;
