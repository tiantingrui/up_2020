<template>
    <div>
        <h3>Custom</h3>
        <s-custom-select :selected='selected' :list='list'></s-custom-select>
        你选择了： {{ selected.name }}
    </div>
</template>

<script>
import SCustomSelect from './SCustomSelect'

export default {
    components: {
        SCustomSelect
    },
    data() {
        let list = [
            {
                name: '霍乱',
                value: 'A'
            },
            {
                name: '鼠疫',
                value: 'B'
            },
            {
                name: '甲流',
                value: 'C'
            }
        ]
        return {
            selected: list[0],
            list: list
        }
    },
}
</script>