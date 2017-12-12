import React,{Component} from "react";

export default class TodoList extends Component{
    render(){
        const {todos,click} = this.props;
        const todoArr = todos.map((one,index)=>{
            return <li key={index} className={one.completed?"completed":"noCompleted"} onClick={()=>click(index)}>{one.text}</li>
        })
        return <div><ul>{todoArr}</ul></div>
    }
}