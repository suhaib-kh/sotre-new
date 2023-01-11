import React from 'react';
import './list.css';
import { useContext } from 'react';
import { CartContext } from '../../providers/cart-provider.component';
import CartRow from '../row/row.component';

const CartList = (props) => {
  const cartContext = useContext(CartContext);

  const clear = () => cartContext.dispatch({ type: 'CLEAR' })

  if (cartContext.cart.length === 0) {
    return (
      <div className="no-results">
        <img src="./empty_cart.webp" alt="empty cart" width={300} />
        <p>Your Cart is Empty!</p>
      </div>
    );
  }

  let total = 0;

  for (const item of cartContext.cart) {
    total += item.quantity * item.meal.price;
  }

  return (
    <>
      <ul className="cart-list">
        {
          cartContext.cart.map((item, index) => <CartRow item={item} dispatch={cartContext.dispatch} key={"r_" + index} />)
        }
      </ul>
      <div className="cartBottomRow">
        <button className="nemo-button grey" onClick={clear}>Clear Cart</button>

        <span>Total: ${total}</span>
      </div>
    </>
  );
};

export default CartList;