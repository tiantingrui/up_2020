<template>
    <div>
        {{ count }}  {{ doubleCount }}
        <Button type="primary" @click="addCount"> addCount </Button>
        <Button type="primary" @click="asyncAddCount"> asyncAddCount </Button>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'app',
        computed: {
            // 起别名
            ...mapState({
                count: state => state.count,
                count2: state => state.count
            }),
            ...mapGetters('doubleCount')
        },
        methods: {
            ...mapMutations(['addCount']),
            ...mapActions(['asyncAddCount'])
        }
    }
</script>