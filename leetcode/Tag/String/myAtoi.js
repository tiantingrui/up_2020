





// 正则表达式更进一步——字符串与数字之间的转换问题
// /\s*([-\+]?[0-9]*).*/
const myAtoi = (str) => {
    // 编写一个正则表达式、
    const reg = /\s*([-/+]?[0-9]*).*/
    // 得到捕获组
    const groups = str.match(reg)
    // 计算最大值
    const max = Math.pow(2, 31) - 1
    // 最小值
    const min = -max + 1
    // targetNum 用于存储转化出来的数字
    let targetNum = 0
    // 如果匹配成功
    if (groups) {
        // 尝试转化捕获到的结构
        targetNum = +groups[1]
        // 注意，可能出现一个非数字的情况，如 就一个 “+”
        if (isNaN(targetNum)) {
            // 不能进行有效的转化时，返回为0
            targetNum = 0
        }
    }
    // 卡口判断
    if (targetNum > max) {
        return max
    } else if (targetNum < min) {
        return min
    }

    // 返回转化结果
    return targetNum

}