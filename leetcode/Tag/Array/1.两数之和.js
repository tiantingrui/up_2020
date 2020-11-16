/*  [1]
    给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
    你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
    e.g.
    给定 nums = [2, 7, 11, 15], target = 9
    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
*/

const nums = [2, 7, 9, 11]

const target = 9 

const twoSum = (nums, target) => {
    const cache = new Map()
    const len = nums.length
    for (let i = 0; i < len; i ++) {
        const key = target - nums[i]
        if (cache.has(key)) {
            return [cache.get(key), i]
        }
        cache.set(nums[i], i)
    }
}

console.log(twoSum(nums, target))