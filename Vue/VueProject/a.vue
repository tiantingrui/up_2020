<template>
    <div>
        <!-- 阻止单击事件继续传播 -->
        <a v-on:click.stop='doThis'></a>

        <!-- 提交事件不再重载页面 -->
        <form v-on:submit.prevent='submit'></form>

        <!-- 修饰符可以串联 -->
        <a v-on:click.stop.prevent='doThat'></a>

        <!-- 只有修饰符 -->
        <form v-on:submit.prevent></form>

        <!-- 点击事件只会触发一次 -->
        <div v-on:click.once="doThis"></div>

        <!-- 只有在`key` 是 `Enter` 时调用 submit -->
        <div v-on:keyup.enter='submit'></div>
    </div>
</template>

<script>
export default {
    // props: ['parentName'],
    props: {
        parentName: {
            type: String,
            required: true,
            default: 'terry',
            validator(value) {
                const arr = ['xioaming', 'terry'];
                return arr.indexOf(value)  !== -1
            }
        }
    },
    //! JSX语法
    render() {
        return (
            <div class="hello">
                {this.classmates.map((p, index) => {
                    <div key={p.id}>{`${index}.${p.name}`}</div>
                })}
            </div>
        )
    },
    methods: {
        change() {
            // this.classmates[2] = { id: 4, name: 'lily'}
            Vue.set(this.classmates, '2', { id: 4, name: 'lily'});

            this.$set(this.classmates, '2', { id: 4, name: 'lily' })

            Vue.delete(this.classmates, '2')

            this.$delete(this.classmates, '2')
        }
    }
}
</script>