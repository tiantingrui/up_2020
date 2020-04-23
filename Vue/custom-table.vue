<template>
    <div>
        <Table v-bind="$attrs" v-on="$listeners" :data="data">
        </Table>
    </div>
</template>

<script>
    const editButton = (vm, h, currentRow) => {
        console.log(vm)
        return h('Button', {
            props: {
                type: 'success'
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {}
            }
        }, '修改')
    }
    const infoButton = () => {}
    const deleteButton = () => {}

    export default {
        name: 'customTable',
        watch: {
            
        },
        data() {
            return {
                data: []
            }
        },
        methods: {
            init() {
                let { columns, value } = this.$attrs
                this.data = value
                columns.forEach(item => {
                    if (item.action) {
                        item.render = (h, param) => {
                            console.log('h', h, param)
                            let currentRow = value[param.index]
                            let actionList = []
                            item.action.forEach(item => {
                                if (item === 'edit') {
                                    actionList.push(editButton(this, h, currentRowData, param.index));
                                } else if (item === 'delete') {
                                    actionList.push(deleteButton(this, h, currentRowData, param.index));
                                }
                            })
                            return h('div', actionList)
                        }
                    }
                })
                // this.matchAction(columns, data)
            },
            createButton(type) {
                switch (type) {
                    case 'edit':
                        return new editButton(vm, h, row)
                    case 'delete':
                        return new deleteButton
                    case 'info':
                        return new infoButton
                }
            },
            matchAction(columns, data) {
                columns.forEach(item => {
                    if (item.action) {
                        item.render = (h, param) => {
                            let currentRow = data[param.index]
                            console.log(currentRow)
                            let actionList = []
                            console.log(item.action)
                            item.action.forEach(item => {
                                actionList.push(this.createButton(item))
                            })
                            console.log('actionList', actionList)
                            return h('div', {}, actionList)
                        }
                    }
                })
            },
        },
        mounted() {
            this.init()
        }
    }

</script>
