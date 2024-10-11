import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import "./App.scss";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
// import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";

const Cart = React.lazy(() => import("./pages/Cart"));
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home></Home>} />
        <Route path="pizza/:id" element={<FullPizza />} />

        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound></NotFound>} />
      </Route>
    </Routes>
  );
}

export default App;
