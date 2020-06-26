<template>
    <div>
        <header>
            <!-- 插槽prop -->
            <slot name="header" v-bind:user='user'>
                <nav>
                    <span>{{user.name}}</span>
                </nav>
            </slot>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: 'terry',
                email: '15525500674@163.com'
            }
        }
    },
}
</script>