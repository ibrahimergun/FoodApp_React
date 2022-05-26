import React from 'react';
import mealsImage from '../../assets/meals.jpeg';
import Styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={Styles.header} >
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={Styles['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </React.Fragment>
  );
};

export default Header;
