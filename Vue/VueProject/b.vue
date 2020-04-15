<template>
    <div
        class='aa'
        v-bind:class="{
            'a1': isA1,
            'a2': isA2
        }"
        v-bind:style="{
            'width': `${width}px`,
            'height': `${height}px`,
            'backGroundColor': bgColor
        }"
    >

    </div>
</template>

<script>
export default {
    data() {
        return {
            width: 30,
            height: 30,
            bgColor: 'red'
        }
    }
}
</script>