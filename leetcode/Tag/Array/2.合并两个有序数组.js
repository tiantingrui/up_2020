/*  [88]
    给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
    说明：
    初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
    你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
    e.g.
    输入：
    nums1 = [1,2,3,0,0,0], m = 3
    nums2 = [2,5,6],       n = 3

    输出：[1,2,2,3,5,6]
*/

const merge = (nums1, m, nums2, n) => {
    // 初始化两个指针的指向，初始化nums1 尾部索引 k
    let i = m - 1, j = n -1, k = m + n -1
    // 当两个数组都没遍历完时，指针同步移动
    while (i >= 0 && j >= 0) {
        // 取较大的值，从末尾往前填补
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i]
            i--
            k--
        } else {
            nums1[k] = nums2[j]
            j--
            k--
        }
    }

    // nums2 留下的情况，特殊处理一下
    while(j >= 0) {
        nums1[k] = nums2[j]
        k--
        j--
    }
}
