import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/products/productList';
import Header from "./components/header"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
