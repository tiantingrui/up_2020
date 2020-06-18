/**
 * 字符串算法
 *
 * 在virtual DOM做Diff Patch操作中，有一条准则就是同一层的节点进行diff patch，从一个dom
 * 节点转换为另外一个dom节点的过程我们可以抽象的看成从字符串ABCDEFG切换到ACDFG, 如何保证
 * 在操作过程中尽量只做节点移动，减少插入和删除的操作使我们的目标。
 *
 * 这个练习主要围绕字符串操作进行这一方面的理解。
 */

/**
 * 最长公共子序列
 *
 * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对
 * 顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 * 两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。
 * 若这两个字符串没有公共子序列，则返回 0。
 *
 * 参考：https://leetcode-cn.com/problems/longest-common-subsequence/
 */
export const longestCommonSubsequence = () => {};

