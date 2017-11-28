import 'whatwg-fetch'
import 'es6-promise'

const obj2param = (obj)=>{
	//对象转化成字符串拼接格式
	let result = '';
	for(let i in obj){
		result += "&" + i + "=" + obj[i];
	}
	
	if(result){
		result = result.slice(1)
	}
	return encodeURIComponent(result);
}


const checkStatus = (response)=>{
	//判断response的返回码
	if (response.status >= 200 && response.status < 300) {
    	return response;
  	}
  	const error = new Error(response.statusText);
  	error.response = response;
  	throw error;
}

//进行response parse操作
const parseJson = (response)=>return response.json()


export class resquest {
	//get请求
	get = (url,paramsObj)=>{
		let promise = new Promise((resolve,reject)=>{
			fetch(url+"?"+obj2param(paramsObj),{
				credentials: 'include',
           		headers: {
                	'Accept': 'application/json, text/plain, */*',
            	}
			})
			.then(checkStatus)
			.then(parseJSON)
			.then(data=>resolve(data))
			.catch(err=>reject(err))
		})
		return promise;
	}
	//post请求  用于urlencode 表单数据
	post = (url,paramsObj)=>{
		let promise = new Promise((resolve,reject)=>{
			fetch(url, {
	            method: 'POST',
	            credentials: 'include',
	            headers: {
	                'Accept': 'application/json, text/plain, */*',
	                'Content-Type': 'application/x-www-form-urlencoded'
	                
	            },
	            body: obj2param(paramsObj)
	        })
	        .then(checkStatus)
	        .then(parseJSON)
	        .then(data=>resolve(data))
			.catch(err=>reject(err))
		})
		return promise;
	}
	
	//post请求 用于发送文件
	postFile = (url,paramsObj)=>{
		let promise = new Promise((resolve,reject)=>{
			fetch(url, {
	            method: 'POST',
	            credentials: 'include',
	            headers: {
	                'Accept': 'application/json, text/plain, */*',
	                'Content-Type': 'multipart/form-data'
	                
	            },
	            body: paramsObj
	        })
	        .then(checkStatus)
	        .then(parseJSON)
	        .then(data=>resolve(data))
			.catch(err=>reject(err))
		})
		return promise;
	}
	
	//post请求 json数据
	postJson = (url,paramsObj)=>{
		let promise = new Promise((resolve,reject)=>{
			fetch(url, {
	            method: 'POST',
	            credentials: 'include',
	            headers: {
	                'Accept': 'application/json, text/plain, */*',
	                'Content-Type': 'application/json'
	                
	            },
	            body:JSON.stringify(paramsObj)
	        })
	        .then(checkStatus)
	        .then(parseJSON)
	        .then(data=>resolve(data))
			.catch(err=>reject(err))
		})
		return promise;
	}
	
	//put请求
	put = (url,paramObj)=>{
		let promise = new Promise((resolve,reject)=>{
			fetch(url, {
	            method: 'PUT',
	            credentials: 'include',
	            headers: {
	                'Accept': 'application/json, text/plain, */*',
	                'Content-Type': 'application/x-www-form-urlencoded'
	                
	            },
	            body: obj2param(paramsObj)
	        })
	        .then(checkStatus)
	        .then(parseJSON)
	        .then(data=>resolve(data))
			.catch(err=>reject(err))
		})
		return promise;
	}
	
	//delete请求
	delete = (url,paramObj)=>{
		let promise = new Promise((resolve,reject)=>{
			fetch(url, {
	            method: 'DELETE',
	            credentials: 'include',
	            headers: {
	                'Accept': 'application/json, text/plain, */*',
	                'Content-Type': 'application/x-www-form-urlencoded'
	                
	            },
	            body: obj2param(paramsObj)
	        })
	        .then(checkStatus)
	        .then(parseJSON)
	        .then(data=>resolve(data))
			.catch(err=>reject(err))
		})
		return promise;
	}
}
