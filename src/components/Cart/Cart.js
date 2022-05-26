import React, { useContext, useState } from 'react';
import axios from 'axios';
import Styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [orderClicked, setOrderClicked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [didsubmitted, setDidSubmitted] = useState(false);

  const ctxCart = useContext(CartContext);

  const totalAmount = `$${ctxCart.totalAmount.toFixed(2)}`;

  const hasItems = ctxCart.items.length > 0;

  console.log(ctxCart);

  const cartItemRemoveHandler = (id) => {
    ctxCart.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctxCart.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setOrderClicked(true);
  };
  // const closeOrderHandler = () => {
  //   setOrderClicked(false);
  // };
  const submitOrderHandler = (userData) => {
    setSubmitting(true);
    const body = {
      id: Math.floor(Math.random() * (10000 - 1)) + 1,

      //Math.floor(Math.random() * (max - min)) + min;
      name: userData.name,
      city: userData.city,
      street: userData.street,
      postal: userData.postal,
    };
    axios
      .post(
        'https://react-http-api-21bf9-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        { user: body, orderedItems: ctxCart.items },
      )
      .then(successfulResponse)
      .catch(error);

    function successfulResponse(response) {
      setDidSubmitted(true);
      setSubmitting(false);
      ctxCart.clearItem();
      console.log(successfulResponse);
      console.log(body);
    }

    function error(error) {
      console(error.message);
    }
  };


  const cartItems = (
    <ul className={Styles['cart-items']}>
      {ctxCart.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={Styles.actions}>
      <button className={Styles['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={Styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalActions = (
    <React.Fragment>
      {cartItems}
      <div className={Styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderClicked && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!orderClicked && modalActions}
    </React.Fragment>
  );

  const dataSending = <p>Sending order data...</p>;
  
  const dataIsSubmitted = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={Styles.actions}>
        <button className={Styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!submitting && !didsubmitted && cartModalActions}
      {submitting && dataSending}
      {!submitting && didsubmitted && dataIsSubmitted }
    </Modal>
  );
};
export default Cart;
