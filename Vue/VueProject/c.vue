<template>
    <div>
        lifeCycle
        <button @click="ab = !ab" >切换组件</button>
        <div>{{title}}</div>
        <keep-alive>
            <component :is='currentComponent'></component>
        </keep-alive>
    </div>
</template>

<script>
import A from './A'
import B from './B'

export default {
    data() {
        return {
            ab: true
        }
    },
    computed: {
        title() {
            return this.ab ? 'title1' : 'title2'
        },
        curremtComponent() {
            return this.ab ? A : B
        }
    }
}
</script>