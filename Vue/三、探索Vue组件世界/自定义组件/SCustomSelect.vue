<template>
    <div>
        <div class='top' @click="showButtom = !showButton"> {{ selected.name }} </div>
        <div class="buttom" v-if='showButtom'>
            <div v-for="i in list" :key="i.value" @click="select(i)">{{ i.name }}</div>
        </div>
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
            showButtom: false
        }
    },
    methods: {
        select(i) {
            this.$emit('change', i)
            this.showButtom = false
        }
    }
}
</script>

<style scoped>
.top {
    border: 1px solid #999;
    padding: 2px;
}
.bottom {
    position: relative;
    border: 1px solid #999;
    top: -1px;
}
</style>