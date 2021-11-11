import {
    ADD_MEAL,
    REMOVE_MEAL
} from "../action-creaters/actionCreaters";

import { combineReducers } from 'redux';

const initialState = {
    sunday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    monday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    tuesday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    wednesday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    thursday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    friday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    saturday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
}

function food(state = {}, action) {
    switch (action.type) {
        case 'ADD_MEAL':
            const { recipe } = action

            return {
                ...state,
                [recipe.label]: recipe
            }
        default:
            return state
    }
}

function calendar(state = initialState, action) {
    const { day, recipe, meal } = action;

    switch (action.type) {
        case ADD_MEAL:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: recipe.label,
                }
            };
        case REMOVE_MEAL:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: null,
                }
            };
        default:
            return state
    }
}
export default combineReducers({
    food,
    calendar,
});
