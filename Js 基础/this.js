//! 1. 在函数中使用this，指向global全局对象
function demo() {
    console.log(this);
}
// demo()

//! 作为对象方法调用，this指代上级对象
let obj = {
    demo: demo
}
obj.demo()
