/* 
    判断一个字符串是否是回文字符串 - 回文字符串就是指正着读和反着读都是一模一样的字符串
    e.g. 
    'yessey'
*/

const str = 'yessey'

function isPalindrome(str) {
    // 先反转字符串
    const reversedStr = str.split('').reverse().join('')
    // 判断反转前后是否相等
    return reversedStr === str
}


// 解法二：利用对称性
function isPalindrome2(str) {
    const len = str.length
    for (let i = 0; i < len / 2; i ++) {
        if (str[i] !== str[len - 1 - i]) {
            return false 
        }
    }
    return true
}