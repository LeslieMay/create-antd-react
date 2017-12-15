import React from "react"
import {render} from "react-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import "./app.css"
import Test from "./test.js"
import todoApp from "../reducer/reducer"
let store = createStore(todoApp);
function applyMiddleware(store, middlewares) {
	middlewares = middlewares.slice()
	middlewares.reverse()
  
	let dispatch = store.dispatch
	middlewares.forEach(middleware =>
		{console.log(dispatch);
	  dispatch = middleware(store)(dispatch);}
	)
  
	return Object.assign({}, store, { dispatch })
  }
  const logger1 = store => next => action => {
	// console.log('dispatching1', next)
	let result = next(action)
	// console.log('next state1', store.getState())
	return result
  }
  const logger2 = store => next => action => {
	// console.log('dispatching2', next)
	let result = next(action)
	// console.log('next state2', store.getState())
	return result
  }
render(
	<Provider store={applyMiddleware(store,[logger1,logger2])}><Test/></Provider>,document.getElementById("root")
)