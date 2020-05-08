//! 什么是响应式
let x; 
let y;
let f = n => n * 100 + 100;

x = 1;
y = f(x);
console.log(y);    // 200 

x = 2;
y = f(x);
console.log(y);    // 300 

x = 3;
y = f(x);
console.log(y);    // 400 

let onXChanged = cb => {
    //TODO
};
onXChanged(() => {
    y = f(x);
    console.log(y);
})
x = 1; // 200
x = 2; // 300
x = 3; // 400