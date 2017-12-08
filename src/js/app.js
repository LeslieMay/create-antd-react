import React from "react"
import {render} from "react-dom"
import "./app.css"

import {Request,Ajax} from "../fetch/fetch-new.js"

const test = ()=>{
	consol.log(Request.prototype,Ajax)
}
render(
	<h1 onClick={()=>test()}>hello,world</h1>,document.getElementById("root")
)
