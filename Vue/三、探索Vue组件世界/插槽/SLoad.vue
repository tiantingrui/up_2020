<template>
    <div>
        <div v-if="loading"> 加载中。。。 </div>
        <slot v-else :data='data'></slot>
    </div>
</template>

<script>
export default {
    props: ['url'],
    data() {
        return {
            loading: true,
            data: {}
        }
    },
    created() {
        setTimeout(() => {
            this.loading = false
            this.data = {
                name: 'terry'
            }
        }, 1000)
    }
}
</script>


