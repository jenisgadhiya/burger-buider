import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredient:null,
    total: 110,
    error:false,
    building:false
}

const INGREDIENT_PRICE = {
    salad: 25,
    bacon: 30,
    cheese: 40,
    meat: 45,
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredientName]:state.ingredient[action.ingredientName]+1
                },
                total:state.total+INGREDIENT_PRICE[action.ingredientName],
                building:true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredientName]:state.ingredient[action.ingredientName]-1
                },
                total:state.total-INGREDIENT_PRICE[action.ingredientName],
                building:true
            }
        case actionTypes.SET_INGREDIENT:
            return{
                ...state,
                ingredient:{
                    salad:action.ingredient.salad,
                    bacon:action.ingredient.bacon,
                    cheese:action.ingredient.cheese,
                    meat:action.ingredient.meat,
                },
                total:110,
                building:false
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return{
                ...state,
                error:true
            }
        default:
            return state
    }
}

export default reducer