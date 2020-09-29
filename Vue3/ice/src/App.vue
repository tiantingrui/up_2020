<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

<template>
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
        <button 
            v-for='(item, index) in girls' 
            :key='index'
            @click='selectGirlFn(index)'>
            {{index}} - {{item}}
        </button>
    </div>
    <span>选择了{{selectGirl}} </span>

</template>

<script lang="ts">
    import { defineComponent, reactive, toRefs } from 'vue';

    interface DataProps {
        girls: string[];
        selectGirl: string;
        selectGirlFn: (index: number) => void;
    }


    export default defineComponent({
        name: 'App',
        setup() {
            const data: DataProps = reactive({
                girls: ['aa', 'bb', 'cc'],
                selectGirl: '',
                selectGirlFn: (index: number) => {
                    data.selectGirl = data.girls[index]
                }
            })
            const refData = toRefs(data)
            return {
                ...refData
            }
        }
    });
</script>

