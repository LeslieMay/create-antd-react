import {ADD_TODO,COMPLETE_TODO,SET_VISIBILITY_FILTER,VisibleFilters} from "../action/actionType"
import {combineReducers} from "redux"
const {SHOW_ALL} = VisibleFilters;

function visibleFilter(state = SHOW_ALL,action){
    console.log(action);
    switch (action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todos(state = [],action){
    switch (action.type){
        case ADD_TODO:
            return [...state,{text:action.text,completed:false}]
        case COMPLETE_TODO:
            return [
                ...state.slice(0,action.index),
                Object.assign({},state[action.index],{
                    completed:true
                }),
                ...state.slice(action.index+1)
            ]
        default:
            return state
    }
}

const todoApp = combineReducers({
    visibleFilter,todos
})
export default todoApp;