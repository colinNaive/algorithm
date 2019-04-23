/**
 * 1、防抖函数
 */
function debounce(fn, delay) {
  let timer;
  return function() {
    let context = this
    let args = arguments
    clearTimeout(timer);
    timer = setTimeout(function() {
        fn.apply(context, args)
    }, delay);
  };
}

/**
 * 2、截流函数
 */
function throttle(fn, delay) {
  let preTime = Date.now();
  return function() {
    let args = arguments;
    let context = this;
    let now = Date.now();
    if (now - preTime < delay) {
    }
    fn.apply(context, args);
    preTime = Date.now();
  };
}

/**
 * 3、手写fetch
 */
function fetch(url) {
    if(typeof url!== 'string') throw Error('url should be a string')

    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onload = function() {
            const code = xhr.status
            if((code >= 200 && code < 300) || code == 304) {
                resolve(xhr.responseText)
            } else {
                reject(xhr.statusText)
            }
        }
        xhr.onerror = function() {
            reject(Error(xhr.statusText))
        }
        xhr.send()
    })
}

/**
 * 4、深拷贝
 */
function deepClone(input) {
    if(Object.getPrototypeOf().cainput) {

    }
}

/**
 * 5、判断是否是数组
 * https://segmentfault.com/a/1190000006150186
 */
function isArray(input) {
    if(input.constructor == Array) {//通过constructor判断
        return true
    } else if(input instanceof Array) {//用instanceof判断
        return true
    } else if(Object.prototype.toString.call(input) == "[object Array]") {
        return true
    } else if(Array.isArray(input)) {
        return true
    }
    return false
}

/**
 * 6、手写new
 */
function newMannual(fn) {
    let o = {}
    fn.call(o)
    o.__proto__ = fn.prototype
    return o
}

/**
 * 7、手写继承
 */
function extendMannual() {   
    function SuperFunc() {
    
    }
    
    function SubFunc() {
        SuperFunc.call(this)
        SubFunc.prototype = Object.create(SuperFunc.prototype)
        SubFunc.prototype.constructor = SubFunc
    }
}

/**
 * 手写jsonP
 */
function jsonP({url, data, callbackName}) {
    return new Promise((resolve, reject) => {
        //1. 对请求进行url编码
        function formatParams(data) {
            let arr = []
            for(let key in data) {
                if(data.hasOwnProperty(key)) {
                    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                }
            }
            return arr.join('&')
        }

        //2. 创建script标签
        const script = document.createElement('script')
        
        //3. 设置好回调方法
        window.jsonCb = function(res) {
            document.body.removeChild(script)
            delete window.jsonCb
            resolve(res)
        }

        //4. 请求
        script.src = `${url}?${formatParams(data)}&jsonCb=${callbackName}`

        //5. 添加到dom结构中
        document.body.appendChild(script)
        
    })
}

const json = await post({
    url:'https://api.asilu.com/weather/',
    data:{ city: '上海' },
    callbackName: function test(res) {

    }
 })

 /**
  * 手写ajax
  */
 function ajax({type = '', url, params = {}}) {
    return new Promise((resolve, reject) => {
        let xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
        let requestType = type.toUpperCase()
        if(requestType === 'GET') {
            let paramData = formatParams(params)
            xhr.open(requestType, url + '?' + paramData, true)
            xhr.send()
        } else if(requestType === 'POST') {
            xhr.open(type, url, true)
            xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded")
            xhr.send(params)
        } else {
            reject()
        }

        xhr.onload = function() {
            if(xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            } else {
                reject()
            }
        }
    })

    function formatParams(data = {}) {
        let arr = []
        for(let key in data) {
            if(data.hasOwnProperty(key)) {
                arr.push(encodeURIComponent(key)+'='+encodeURIComponent(data[key]))
            }
        }
        return arr.join('&')
    }
 }

 