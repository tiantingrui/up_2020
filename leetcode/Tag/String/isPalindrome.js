/*  [680]
    验证回文字符串：
    给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
    e.g.1.
    输入: "aba"
    输出: True
    e.g.2.
    输入: "abca"
    输出: True
    解释: 你可以删除c字符
*/


// 思路分析：利用回文 - 对称性 ， 双指针法

const str = abca

const validPalindrome = (s) => {
    // 缓存字符串的长度
    const len = s.length

    // 定义双指针
    let i = 0, j = len - 1

    // 当左右指针均满足对称时，一起向中间前进
    while(i < j && s[i] === s[j]) {
        i++ 
        j--
    }

    // 工具方法，用于判断字符串是否回文
    function isPalindrome(st, ed) {
        while (st < ed) {
            if (s[st] !== s[ed]) {
                return false 
            }
            st++ 
            ed--
        }
        // 默认返回true
        return true
    }

    // 尝试判断跳过左指针元素后字符串是否回文
    if(isPalindrome(i + 1, j)) {
        return true
    }

    // 尝试判断跳过右指针元素后字符串是否回文
    if(isPalindrome(i, j - 1)) {
        return true
    }

    // 默认返回false
    return false
}