import React from "react"
import {render} from "react-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import "./app.css"
import Test from "./test.js"
import todoApp from "../reducer/reducer"
let store = createStore(todoApp);

render(
	<Provider store={store}><Test/></Provider>,document.getElementById("root")
)