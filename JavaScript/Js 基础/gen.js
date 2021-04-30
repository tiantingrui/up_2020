function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= items.length
            var value = !done ? items[i++] : undefined
            return {
                done, 
                value
            }
        }
    }
}


function* createGenerator() {
    let first = yield 1
    let second = yield first + 2
    yield second + 3
}

let gen = createGenerator();

let g1 = gen.next()  // {value: 1, done: false}
let g2 = gen.next(4) // {value: 6, done: false}
let g3 = gen.next(5) // {value: 8, done: false}
let g4 = gen.next()  // {value: undefined, done: true}