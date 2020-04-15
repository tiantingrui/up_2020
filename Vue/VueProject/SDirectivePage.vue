<template>
    <div>
        <!-- 1.v-resize指令，监听浏览器窗口大小改变的时候，通过监听函数onResize 响应 -->
        <!-- <div v-resize='onResize'>window width is: {{length}}</div> -->
        <!-- 2.可通过 direction,控制监听页面高度 或者宽度的变化 -->
        <!-- <div v-resize:[direction].quiet='onResize'>window width is: {{length}}</div> -->
        <!-- 3.可通过修饰符 .quiet 来控制是否在指令初始化的时候 响应onResize函数 -->
        <!-- <div v-resize.quiet='onResize'>window width is: {{length}}</div> -->
        <div v-resize='onResize'>window width is: {{length}}</div>


<input type="checkbox">
<input type="radio">

    </div>
</template>

<script>
export default {
    data() {
        return {
            directive: 'verticle',
            length: 0
        }
    },
    methods: {
        onResize(length) {
            this.length= length
        }
    }
}
</script>