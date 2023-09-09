import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/products/productList';
import Header from "./components/header"
import OrdersList from './components/orders/orderList';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/order/:orderId" element={<ProductList />} />
        <Route path="/" element={<OrdersList />} />
      </Routes>
    </>
  );
}

export default App;
