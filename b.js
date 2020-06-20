let obj = {
    a: 'b'
}
class C {
    constructor() {
        this.a = 'a'
        this.b = 'b'
        return obj
    }
}
let c = new C()
console.log(c)
console.log(c.a)