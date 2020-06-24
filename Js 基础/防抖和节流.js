/**
 *降频函数
 *这个 debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。
 *调用:	debounce(function() {}, 250) 
 * @param {*} func回调函数
 * @param {*} wait等待时间,推荐250
 * @param {*} immediate
 * @returns
 */
function debounce(func, wait, immediate) {
    var timeout
    return function() {
        var context = this, args = arguments
        var later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

let debounce = (fn, delay) => {
    let timer = null
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

let throttle = (fn, delay) => {
    let flag = true
    return function(...args) {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

