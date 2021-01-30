//fill函数实现
var zdyFill = function (arr, value) {
    let len = Number(arr.length);
    let result = [];
    function addEle() {
        if (len === 0) return;
        --len
        result.push(value);
        addEle()
    }
    addEle()
    return result;
}
let arr = new Array(10);
console.log(arr.length)
let result = zdyFill(arr, 2);

//打印当前页面所有标签
let scripts = document.querySelectorAll('*');
let arr = Array.from(new Set(Array.prototype.map.call(scripts, (el) => el.tagName)))


//数组去重
var arrQuchong1 = function (arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let isExist = false;
        for (let j = 0; j < result.length; j++) {
            if (arr[i] === result[j]) isExist = true;;
        }
        if (!isExist) result.push(arr[i])
    }
    return result;
}
var arrQuchong2 = function (arr) {
    let result = arr.filter((item, index) => {
        return arr.indexOf(item) === index
    })
    return result;
}
var arrQuchong3 = function (arr) {
    let res = Array.from(new Set(arr))
    return res;
}
//二分法查找函数
var findIndexByValue = (value, arr) => {
    let start = 0;
    let end = arr.length - 1;
    let mid;
    while (start < end) {
        mid = start + parseInt((end - start) / 2);
        if (arr[mid] === value) {
            return mid;
        } else if (arr[mid] > value) {
            end = mid + 1
        } else if (arr[mid] < value) {
            start = mid - 1;
        } else {
            return -1;
        }
    }
    return mid;
}
//斐波那契数列 0,1,1,2,3,5,8,13 f(n)=f(n-1)+f(n-2)
var getn1 = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n < 0) return null;
    let num = getn(n - 1) + getn(n - 2)
    return num;
}
var getn2 = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n < 0) return null;
    let arr = [0, 1];
    for (let i = 2; i < n; i++) {
        arr.push(arr[i - 1] + arr[i - 2])
    }
    return arr[n - 1];
}
//字符串替换

//从0开始报数m-1
//快速排序
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let left = [];
    let right = [];
    let valueIndex = Math.floor(arr.length / 2)
    let value = arr.splice(valueIndex, 1)[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < value) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(value, quickSort(right));
}
//随机选取10-100之间的10个数，存入一个数组并排序
function getRandomSortArr(start, end, num) {
    let jiange = end - start;
    let arr = [];
    for (let i = 0; i < num; i++) {
        let value = Math.floor(Math.random() * jiange) + start + 1
        arr.push(value)
    }
    arr.sort((a, b) => {
        return a - b;
    })
    return arr;
}
//实现promise.all()
Promise.zdyAll = function (arr) {
    return new Promise(function (resolve, reject) {
        let result = [];
        function isComplete(result) {
            if (result.length === arr.length) {
                resolve(result)
            }
        }
        for (let i = 0; i < arr.length; i++) {
            let current = arr[i];
            if (current && current.then && typeof current.then === "function") {
                current.then((res) => {
                    result.push(res)
                    isComplete(result)
                }, reject)
            } else {
                result.push(current)
                isComplete(current)
            }
        }
    })
}
//防抖函数实现
function debunce(fn, delay) {
    let timer = null;
    return function () {
        let args = arguments;
        let that = this;
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, delay)
    }
}
//节流函数实现
function throttle(fn, delay) {
    let last = null;
    return function () {
        let that = this;
        let args = arguments;
        let now = +new Date();
        if (!last || (last && (last + delay) < now)) {
            fn.apply(that, args)
            last = now;
        }
    }
}
//数组打平函数实现
function flatArr(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatArr(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result;
}
//多个异步请求并发控制
function ajaxMaxCountControl(arr, max, callback) {
    let fetchArr = [];
    let i = 0;
    function addToFetch() {
        if (i === arr.length) {
            return Promise.resolve();
        }
        let oneFetch = fetch(arr[i]);
        fetchArr.push(oneFetch);
        oneFetch.then(res => {
            fetchArr.splice(fetchArr.indexOf(oneFetch), 1)
        })
        i = i + 1;
        let p = Promise.resolve();
        if (fetchArr.length >= max) {
            p = Promise.race(fetchArr)
        }
        return p.then(() => { addToFetch() })
    }
    addToFetch().then(() => Promise.all(fetchArr).then(() => {
        callback();
    }))
}
//ajax函数实现
function ajax(url, suc, fail) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true)
    request.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                suc(xhr.responseText)
            } else {
                fail(xhr.responseText)
            }
        }
    }
    xhr.send(null);
}
//fetch的实现
function zdyFetch(url) {
    return new Promise(function (resolve, reject) {
        ajax(url, (res) => {
            resolve(res)
        }, (err) => {
            reject(err)
        })
    })
}
//symbol实现
(function () {
    var root = this;
    var generateName = (function () {
        var postfix = 0;
        return function (descString) {
            postfix++;
            return `@@${descString}_${postfix}`;
        }
    })();
    var forMap = {};
    var SymbolPolyfill = function Symbol(description) {
        if (this instanceof SymbolPolyfill) {
            throw new TypeError("Symbol is not a constructor");
        }

        var descString = description === undefined ? undefined : description;

        var symbol = Object.create({
            toString: function () {
                return "Symbol({dec})".replace("{dec}", this.__Description__);
            },
            valueOf: function () {
                throw new Error("Cannot convert a Symbol value");
            }
        });

        Object.defineProperties(symbol, {
            "__Description__": {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            },

            "__Name__": {
                value: generateName(descString),
                writable: false,
                enumerable: false,
                configurable: false
            }
        })

        return symbol;
    }
    Object.defineProperties(SymbolPolyfill, {
        'for': {
            value: function (description) {
                var descString = description === undefined ? undefined : String(description)
                return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
            },
            writable: true,
            enumerable: false,
            configurable: true
        },
        'keyFor': {
            value: function (symbol) {
                for (var key in forMap) {
                    if (forMap[key] === symbol) return key;
                }
            },
            writable: true,
            enumerable: false,
            configurable: true
        }
    })
    root.SymbolPolyfill = SymbolPolyfill;
})();
