import { Route, Routes } from "react-router-dom";
import React from "react";

import "./App.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="App">
      <Header
        searchValue={searchValue}
        setSearchValue={(val) => setSearchValue(val)}
      />
      <Routes>
        <Route path="/" element={<Home searchValue={searchValue}></Home>} />
        <Route path="/cart" element={<Cart></Cart>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
