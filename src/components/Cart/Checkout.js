import Styles from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  // const [formValidity, setFormValidty] = useState(true);

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);

    const enteredStreet = streetInputRef.current.value;
    const enteredStreetIsValid = !isEmpty(enteredStreet);

    const enteredPostal = postalInputRef.current.value;
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    const enteredCity = cityInputRef.current.value;
    const enteredCityIsValid = !isEmpty(enteredCity);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    console.log(formInputsValidity);

    if (!formIsValid) {
      // setFormValidty(false);
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postal: enteredPostal,
      street: enteredStreet,
    });

    // setFormValidty(true);
  };

  return (
    <form className={Styles.form} onSubmit={confirmHandler}>
      <div
        className={`${Styles.control} ${
          !formInputsValidity.name ? Styles.invalid : ''
        }`}
      >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}></input>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${Styles.control} ${
          !formInputsValidity.street ? Styles.invalid : ''
        }`}
      >
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}></input>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${Styles.control} ${
          !formInputsValidity.postal ? Styles.invalid : ''
        }`}
      >
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}></input>
        {!formInputsValidity.postal && <p>Please enter a postal code!</p>}
      </div>
      <div
        className={`${Styles.control} ${
          !formInputsValidity.city ? Styles.invalid : ''
        }`}
      >
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}></input>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={Styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={Styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
