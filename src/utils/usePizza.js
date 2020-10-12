import React, { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. create state to hold order
  // commented out because we moved use state to provider
  //   const [order, setOrder] = useState([]);
  // access state and update function via context
  const [order, setOrder] = useContext(OrderContext);
  // 2. make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make a function to remove things from the order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. send this data to a serverless function when they check out
  // todo
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
