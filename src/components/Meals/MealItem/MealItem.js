import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import Styles from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const ctxCart = useContext(CartContext);

  const addToCartHandler = (amount) => {
    ctxCart.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={Styles.meal}>
      <div>
        <h3> {props.name}</h3>
        <div className={Styles.description}>{props.description}</div>
        <div className={Styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
