import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../redux/reducers/ordersSlice";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../../redux/reducers/productSlice";
import { PageContainer, OrderListContainer, AddButton, OrderLink } from './styles'
const OrdersList = () => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const handleAddOrder = () => {
   dispatch(addOrder([]))
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <PageContainer>
      <OrderListContainer>
        <h1>Orders</h1>
        {orders.map((order) => (
          <OrderLink key={order.orderId}>
            <Link to={`/order/${order.orderId}`}>#{order.orderId}</Link>
          </OrderLink>
        ))}
        <AddButton onClick={handleAddOrder}>Add New Order</AddButton>
      </OrderListContainer>
    </PageContainer>
  );
};

export default OrdersList;
