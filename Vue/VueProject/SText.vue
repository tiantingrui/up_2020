<template>
    <div>
        <h3>Text</h3>
        {{ text }}
        <!-- .lazy 将input事件转变为 change事件 -->
        <input type="text" v-model.lazy="text">
        <input type="text" v-model="text">
        <input type="text" :value="text" @input="text = $event.target.value">
        <!-- .trim 去除空格 -->
        <textarea v-model.trim="text"></textarea>
        <!-- .number将str 转换成 number -->
        <input type="number" v-model.number='num'>
        {{ typeof num }}
    </div>
</template>
<script>
export default {
    model: {
        prop: 'selected',
        event: 'change'
    },
    props: ['list', 'selected'],
    data() {
        return {
            tetx: '',
            num: 0,
            showButton: false 
        }
    },
    methods: {
        select(i) {
            this.showBottom = false;
            this.$emit('change', i)
        }
    }
}
</script>