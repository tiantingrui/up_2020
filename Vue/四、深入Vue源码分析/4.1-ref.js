//! ref
let x;
let y;
let f = n => n * 100 + 100;

//? 表示当前正在调用的一个函数
let active;

let onXChanged = cb => {
    active = cb;
    //* 第一次执行这个监听函数的时候就先去执行这个 cb()
    active();
    active = null;
}

//? 做依赖收集
class Dep {
    deps = new Set();
    depend() {
        if (active) {
            this.deps.add(active);
        }
    }
    notify() {
        this.deps.forEach(dep => dep());
    }
}

//* Object.defineProperty 检测的是引用类型的属性，对于基本类型我们用ref 来转变过渡一下，去创建一个新的对象
let ref = initValue => {
    let value = initValue;
    let dep = new Dep();

    return Object.defineProperties({}, 'value', {
        get() {
            dep.depend();
            return value;
        },
        set(newValue) {
            value = newValue;
            // active();
            dep.notify();
        }
    })
}

// x = 1; // 200
x = ref(1); // ref（） 创建一个代理对象

onXChanged(() => {
    // y = f(x.value);
    // console.log(y);
    document.write(`hello ${x.value}`)
})

x.value = 2; // 300
x.value = 3; // 400