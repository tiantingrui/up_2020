/*  [211]
    请你设计一个支持以下两种操作的数据结构：
    实现词典类 WordDictionary ：
        WordDictionary() 初始化词典对象
        void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
        bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。
        word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。 

    e.g.
    addWord("bad")
    addWord("dad")
    addWord("mad")
    search("pad") -> false
    search("bad") -> true
    search(".ad") -> true
    search("b..") -> true
    说明:
    你可以假设所有单词都是由小写字母 a-z 组成的。
*/

// 字符串匹配问题——正则表达式初相见

// 构造函数
const WordDictionary = function () {
    this.words = {}
}

// 添加字符串的方法
// 注意，这里为了降低查找时的复杂度，我们可以考虑以字符串的长度为 key，相同长度的字符串存在一个数组中，这样可以提高我们后续定位的效率。
WordDictionary.prototype.addWord = function(word) {
    // 若该字符串对应长度的数组已经存在，则只做添加
    if (this.words[word.length]) {
        this.words[word.length].push(word)
    } else {
        // 若该字符串对应长度的数组还不存在，则先创建
        this.words[word.length] = [word]
    }
}

// 搜索方法
WordDictionary.prototype.search = function(word) {
    // 缓存目标字符串长度
    const len = word.length
    // 若该字符串长度在 map中对应的数组根本不存在，则可判断该字符串不存在
    if (!this.words[len]) {
        return false 
    }
    
    // 如果字符串中不包含“.”，那么一定是普通字符串
    if (!word.includes('.')) {
        // 定位到和目标字符串长度一致的字符串数组，在其中查找是否存在该字符串
        return this.words[len].includes(word)
    }

    // 否则就是正则表达式，先去创建正则表达式对象
    const reg = new RegExp(word)

    // 只要数组中有一个匹配正则表达式的字符串，就返回true
    return this.words.some(item => {
        return reg.test(item)
    })
}