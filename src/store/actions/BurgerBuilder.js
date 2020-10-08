import * as actiontypes from './actionTypes'
import axios from '../../Axios-order'

export const addIngredient=(name)=>{
    return{
        type:actiontypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actiontypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const setIngredient=(ingredient)=>{
    return{
        type:actiontypes.SET_INGREDIENT,
        ingredient:ingredient
    }
}

export const fetchIngredientFailed=()=>{
    return{
        type:actiontypes.FETCH_INGREDIENT_FAILED,
    }
}

export const initIngredient=()=>{
    return dispatch=>{
        axios.get('/ingredients.json')
            .then(res => {
                dispatch(setIngredient(res.data))
            }).catch(error => {
                dispatch(fetchIngredientFailed())
            })
    }
}

