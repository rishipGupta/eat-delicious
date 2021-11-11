export const ADD_MEAL = 'ADD_MEAL';
export const REMOVE_MEAL = 'REMOVE_MEAL';

export function addMeal({day, recipe, meal}){
  return {
    type : ADD_MEAL,
    recipe ,
    day ,
    meal
  }
}

export function removeMeal({day, meal}){
  return{
    type : REMOVE_MEAL,
    day ,
    meal
  }
}
