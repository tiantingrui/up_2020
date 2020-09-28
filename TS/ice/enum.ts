enum Status {
    MESSAGE,
    SPA,
    HEALTHY
}

function getServer(status: any) {
    if (status === Status.MESSAGE) {
        return 'message'
    } else if (status === Status.SPA) {
        return 'spq'
    } else if (status === Status.HEALTHY) {
        return 'healthy'
    }
}

// console.log(Status.MESSAGE)
// console.log(Status.SPA)
console.log(Status.HEALTHY, Status[1])

const result = getServer(2)
// console.log(`this is ${result}`)
// 各种状态的定义、类型的定义代替业务逻辑