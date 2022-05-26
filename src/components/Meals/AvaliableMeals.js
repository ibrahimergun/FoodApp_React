import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvaliableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMEssage] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://react-http-api-21bf9-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
      )
      .then(successfulResponse)
      .catch(error);

    function successfulResponse(response) {
      const meals = response.data;
      setIsLoading(false);
      console.log(meals);

      const loadedMeals = [];

      for (const key in meals) {
        loadedMeals.push({
          id: key,
          name: meals[key].name,
          description: meals[key].description,
          price: meals[key].price,
        });
      }
      setMeals(loadedMeals);
    }

    function error(error) {
      setErrorMEssage(error.message);
      setIsLoading(false);
    }

    console.log(errorMessage.length);
  }, [errorMessage]);

  let content = '';

  if (errorMessage.length !== 0) {
   content = <p>{errorMessage}</p>;
  }
  if (isLoading) {
    content = <p>Mealslist is loading...</p>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={Styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
        <div>{content}</div>
      </Card>
    </section>
  );
};
export default AvaliableMeals;
