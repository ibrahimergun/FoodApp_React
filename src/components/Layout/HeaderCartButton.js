import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import Styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartContextProvider = useContext(CartContext);

  const [buttonAnimation, setButtonAnimation] = useState(false);

  console.log(cartContextProvider);

  const numberofCartContext = cartContextProvider.items.reduce(
    (curNumber, item) => {
      return curNumber + item.amount;
    },
    0,
  );

  const btnClasses = `${Styles.button} ${buttonAnimation ? Styles.bump : ''}`;

  useEffect(() => {
    if (cartContextProvider.items.length === 0) {
      return;
    }
    setButtonAnimation(true);

    const timer = setTimeout(() => {
      setButtonAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContextProvider]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={Styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={Styles.badge}>{numberofCartContext}</span>
    </button>
  );
};
export default HeaderCartButton;
