<template>
    <div class="hello">
        <h1>{{ msg }}</h1>  //? 文本插值
        <div v-once>{{ title }}</div> //* 一次性插值 （请留心这会影响到该节点上的其他数据绑定） 
        <div v-html="descripton"></div> //! 插入原始HTML  易导致XSS攻击，绝不要对UGC内容使用
        <div>{{ gender === 'male' ? 'Boy' : 'Girl' }}</div> //? JavaScripr 表达式
    </div>
</template>

<script>
export default {
    props: {msg: String},
    data() {
        return {
            title: 'Hello',
            description: 'hello, vue',
            gender: 'male'
        }
    }
}
</script>