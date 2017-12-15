import React,{Component} from "react";
import {connect} from "react-redux";
import {addTodo,completeTodo,setVisibilityFilter} from "../action/actionCreate"
import {VisibleFilters} from "../action/actionType"
import AddTodo from "./sub/addTodo";
import TodoList from "./sub/todoList";
import Footer from "./sub/footer";
class Test extends Component{
	render(){
		const {dispatch,visibleTodos,visibilityFilter} = this.props;
		return (
			<div>
				<AddTodo add={text=>{dispatch(addTodo(text))}}/>
				<TodoList todos={visibleTodos} click={index=>{dispatch(completeTodo(index))}}/>
				<Footer filter={visibilityFilter} change={filter=>{dispatch(setVisibilityFilter(filter))}}/>			
			</div>
		)
	}
}

function selectTodos(todos,filter){
	switch (filter) {
		case VisibleFilters.SHOW_ALL:
			return todos;
		case VisibleFilters.SHOW_COMPLETED:
			return todos.filter(todo=>todo.completed);
		case VisibleFilters.SHOW_ACTIVE:
			return todos.filter(todo=>!todo.completed);
		default:
			return todos;
	}
}

function select(state){
	return {
		visibleTodos:selectTodos(state.todos,state.visibleFilter),
		visibilityFilter:state.visibleFilter
	}
}

export default connect(select)(Test)