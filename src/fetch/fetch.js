import 'whatwg-fetch'
import 'es6-promise'

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}
//强行让 400 500 进catch  
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function parseJSON(response) {
  return response.json();
}


export function post(url, paramsObj) {

    var promise = new Promise((resolve, reject)=>{
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
                
            },
            body: obj2params(paramsObj)
        })
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ( resolve(data) ))
        .catch((err) => ( reject(err) ));
    })
    return promise
}
export function from(url, paramsObj) {

    var promise = new Promise((resolve, reject)=>{
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Accept': 'application/json, text/plain, */*'
            },
            body: paramsObj
        })
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ( resolve(data) ))
        .catch((err) => ( reject(err) ));
    })
    return promise
}
export function get(url) {
    var promise = new Promise((resolve, reject)=>{
        fetch(url, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ( resolve(data) ))
        .catch((err) => ( reject(err) ));
    })
    return promise
}






//以上是 fetch   以下是 ajax 

//兼容 返回格式xml
export let ajax = {
    get:( url )=>{
        var promise = new Promise((resolve, reject)=>{
            var request = GetXmlHttpObject();
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) { return; } 
                if (request.status === 200) { resolve(parseXml(request.responseText)) } 
                else { reject('') }
            }; 
            request.open('GET', url); 
            request.send();
        })
        return promise
    },
    post:( url, data )=>{
        var promise = new Promise((resolve, reject)=>{
            var request = GetXmlHttpObject();
            request.overrideMimeType("text/xml");//设置数据返回格式
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) { return; } 
                if (request.status === 200) { resolve(parseXml(request.responseText)) } 
                else { reject('') }
            }; 
            request.open("POST",url,false);
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            request.send(obj2params(data))

        })
        return promise
    }
}
function GetXmlHttpObject(){ 
    let xmlHttp = ''; 
    if (window.XMLHttpRequest){ 
      // code for IE7+, Firefox, Chrome, Opera, Safari 
      xmlHttp=new XMLHttpRequest(); 
    }else{// code for IE6, IE5 
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP"); 
    } 
    return xmlHttp; 
} 

function parseXml(xml) {
    var xmldom =  null;
    if (typeof DOMParser != "undefined") {
        xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
        var errors = xmldom.getElementsByTagName("parsererror");
        if(errors.length) {
            throw new Error("XML parsing error:" + errors[0].textContent);
        }
    } else if(document.implementation.hasFeature("LS", "3.0")) {
        var implementation =  document.implementation;
        var parser = implementaion.createLSParser(implementation.MODE_SYNCHRONOUS, null);
        var input = implementation.createLSInput();
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