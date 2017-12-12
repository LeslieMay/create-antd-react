import React,{Component} from "react";

export default class Footer extends Component{
    renderFilter(filter,name){
        if(filter == this.props.filter){
            return name
        }
        return (<a href='#' onClick={e=>{e.preventDefault();console.log(filter);this.props.change(filter)}}>
            {name}
        </a>)
    }
    render(){
        return (
            <p>
                显示：
                {this.renderFilter("SHOW_ALL",'显示全部')}
                {','}
                {this.renderFilter("SHOW_COMPLETED",'显示已完成')}
                {','}
                {this.renderFilter("SHOW_ACTIVE",'显示未完成')}
            </p>
        )
    }
}