import React,{Component} from "react";
console.log("dd")
export default class AddTodo extends Component{
    handleClick=()=>{
        const value = this.refs.input.value;
        this.props.add(value);
        this.refs.input.value = "";
    }
    render(){
        return (
            <div>
                <input ref="input" type="text" placeholder="请输入todo事项"/>
                <br/>
                <button onClick={this.handleClick}>添加</button>
            </div>
        )
    }
}