/* Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
所以属于一种“元编程”（meta programming），即对编程语言进行编程。
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，
因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，
用在这里表示由它来“代理”某些操作，可以译为“代理器” */

let obj = {
    name: 'terry'
}

let newObj = new Proxy(obj, {
    get(target, propKey) {
        console.log(target, propKey)
        return target[propKey]
    }
})

const timeArr = [
    {'id':'A01','date':'2016-04-20 23:22:11'},
    {'id':'A02','date':'2016-04-21 21:00:11'},
    {'id':'A03','date':'2016-04-23 22:00:22'},
    {'id':'A04','date':'2016-04-19 12:22:00'},
    {'id':'A05','date':'2016-02-19 11:11:00'}
]

function sortDataArray(dataArray){
    return dataArray.sort(function(a,b) {
        return Date.parse(b.date.replace(/-/g,"/"))-Date.parse(a.date.replace(/-/g,"/"));
    });
}

console.log(sortDataArray(timeArr))

