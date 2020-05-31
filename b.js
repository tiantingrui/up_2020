let a = [
    {
        b: 1,
        c: [{i: 1, j: 2}]
    }
]
let obj = {
    b: 2,
    c: [{i: 1, j: 0}]
}
a.map(aItem => {
    if (aItem.b === obj.b) {
        aItem.c.map(cItem => {
            obj.c.map(ins => {
                if (cItem.i === ins.i) {
                    // 这会将相同的对象属性给覆盖掉，不同的添加上
                    Object.assign(cItem, ins)
                }
            })
            return cItem
        })
    }
    return aItem
})