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
const parseJson = (response)=>response.json()


class Request {
	//get请求
	get(url,paramsObj){
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


/*
 * 以上fetch 下 ajax
 */

const GetXmlHttpObject = () => { 
    let xmlHttp = ''; 
    if (window.XMLHttpRequest){ 
      // code for IE7+, Firefox, Chrome, Opera, Safari 
      xmlHttp=new XMLHttpRequest(); 
    }else{// code for IE6, IE5 
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP"); 
    } 
    return xmlHttp; 
} 

const parseXml = (xml) => {
    let xmldom =  null;
    if (typeof DOMParser != "undefined") {
        xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
        let errors = xmldom.getElementsByTagName("parsererror");
        if(errors.length) {
            throw new Error("XML parsing error:" + errors[0].textContent);
        }
    } else if(document.implementation.hasFeature("LS", "3.0")) {
        let implementation =  document.implementation;
        let parser = implementaion.createLSParser(implementation.MODE_SYNCHRONOUS, null);
        let input = implementation.createLSInput();
        input.stringData = xml;
        xmldom = parser.parse(input);
    } else if(typeof ActiveXObject != "undefined") {
        xmldom = createDocument();
        xmldom.loadXML(xml);
        if (xmldom.parseError != 0) {
            throw new Error("XML parsing error:" + xmldom.parseError.reason);
        }
    } else {
        throw new Error("No XML parser available.");
    }
    return xmldom;
}

class Ajax {
	//get请求
	get=(url,paramObj)=>{
		let promise = new Promise((resolve, reject)=>{
            let request = GetXmlHttpObject();
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) { return; } 
                if (request.status === 200) { resolve(parseXml(request.responseText)) } 
                else { reject('') }
            }; 
            request.open('GET', url+"?"+obj2param(paramObj)); 
            request.send();
        })
        return promise
	}
	//post请求 form-data
	post=(url,paramObj)=>{
		let promise = new Promise((resolve, reject)=>{
            let request = GetXmlHttpObject();
            request.overrideMimeType("text/xml");//设置数据返回格式
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) { return; } 
                if (request.status === 200) { resolve(parseXml(request.responseText)) } 
                else { reject('') }
            }; 
            request.open("POST",url,false);
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            request.send(obj2params(paramObj))

        })
        return promise
	}
	
	//post请求 上传文件
	postFile=(url,paramObj)=>{
		let promise = new Promise((resolve, reject)=>{
            let request = GetXmlHttpObject();
            request.overrideMimeType("text/xml");//设置数据返回格式
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) { return; } 
                if (request.status === 200) { resolve(parseXml(request.responseText)) } 
                else { reject('') }
            }; 
            request.open("POST",url,false);
            request.setRequestHeader("Content-Type","multipart/form-data");
            request.send(paramObj)

        })
        return promise
	}
	
	//post请求 json格式
	postJson=(url,paramObj)=>{
		let promise = new Promise((resolve, reject)=>{
            let request = GetXmlHttpObject();
            request.overrideMimeType("text/xml");//设置数据返回格式
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) { return; } 
                if (request.status === 200) { resolve(parseXml(request.responseText)) } 
                else { reject('') }
            }; 
            request.open("POST",url,false);
            request.setRequestHeader("Content-Type","application/json");
            request.send(JSON.stringify(paramsObj))

        })
        return promise
	}
	
	//put请求 
	put=(url,paramObj)=>{
		let promise = new Promise((resolve, reject)=>{
            let request = GetXmlHttpObject();
            request.overrideMimeType("text/xml");//设置数据返回格式
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) { return; } 
                if (request.status === 200) { resolve(parseXml(request.responseText)) } 
                else { reject('') }
            }; 
            request.open("PUT",url,false);
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            request.send(obj2params(paramObj))

        })
        return promise
	}
	
	//delete请求 
	delete=(url,paramObj)=>{
		let promise = new Promise((resolve, reject)=>{
            let request = GetXmlHttpObject();
            request.overrideMimeType("text/xml");//设置数据返回格式
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) { return; } 
                if (request.status === 200) { resolve(parseXml(request.responseText)) } 
                else { reject('') }
            }; 
            request.open("DELETE",url,false);
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            request.send(obj2params(paramObj))

        })
        return promise
	}
}
//const rep = new Request();
//const ajax = new Ajax();
export {Request,Ajax}
