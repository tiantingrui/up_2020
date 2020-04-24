<style lang="less" scoped>
    @import '../../../../styles/common.less';
    .title {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 400;
    }
</style>

<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="ios-color-filter-outline"></Icon>
                    风控生成器
                </p>
                <div slot="extra">
                    <Poptip placement="bottom-end" width="400" transfer>
                        <Button type="primary" icon="star" style="margin-left: 15px"> {{ starRow === null ? '我的风控' :
                            `${starRow.name}`}}
                        </Button>
                        <div slot="content">
                            <can-edit-table
                                ref="starTable"
                                v-model="starRiskListCopy"
                                height="300"
                                :show-header="true"
                                :edit-incell="true"
                                :columns-list="riskColumns"
                                @on-cell-change="updateCollectionInfo"
                                @on-delete="deleteCollectionInfo"
                                @row-click="searchSpecificTask"
                            >
                            </can-edit-table>
                        </div>
                    </Poptip>
                </div>
                <Row :gutter="10">
                    <Col span="13">
                        <Tabs :value=tabName type="card">
                            <TabPane
                                v-for="(tab, tabIndex) in newRiskControlFactorData"
                                :key="tab.id"
                                :label="tab.name"
                            >
                                <Form :label-width="70" :model="formValidate" ref="formValidate">
                                    <FormItem
                                        v-for="(item, index) in formValidate.filter[tabIndex]"
                                        v-if="item.show"
                                        :key="index"
                                        :label="'因子' + (index + 1)"
                                        :rules="{required: true, message: '因子' + (index + 1) + '因子不能为空', trigger: 'blur'}"
                                    >
                                        <Row>
                                            <Tooltip placement="top" :delay="500" transfer="transfer">
                                                <Select placeholder="选择因子"
                                                        style="margin-right: 15px; width: 160px"
                                                        :transfer=true
                                                        filterable
                                                        @on-change="idChange(tabIndex, index, item.id)"
                                                        v-model="item.id">
                                                    <Option
                                                        v-for="id in filterId(tabIndex)"
                                                        :value="id.id"
                                                        :label="id.name"
                                                        :key="id.id">
                                                        {{id.name}}
                                                    </Option>
                                                </Select>
                                                <div slot="content" style="white-space: normal;max-width: 200px">
                                                    {{ item.id
                                                    ? newRiskControlFactorData[tabIndex]['child_factor'].filter(io => io.id
                                                    === item.id)[0]['note']
                                                    : '因子描述' }}
                                                </div>
                                            </Tooltip>
                                            <Row v-if="!!item.id" style="display: inline-block">
                                                <div v-for="(parame, parameIndex) in item['parameter']"
                                                     style="display: inline-block"
                                                     :key="parameIndex">
                                                    <span style="margin-right: 8px">{{ item.parameter[parameIndex]['key'] }}</span>
                                                    <!--                        <Input v-model="item.parameter[parameIndex]['key']" style="width: 120px; margin-right: 8px"/>-->
<!--                                                    {{item.parameter[parameIndex]['value']}}-->
                                                    <Select
                                                        v-if="item.parameter[parameIndex]['flag']"
                                                        v-model="item.parameter[parameIndex]['value']"
                                                        @on-change="valueChange(tabIndex, index, parameIndex)"
                                                        style="margin-right: 8px; width: 180px"
                                                        clearable
                                                        :transfer="true"
                                                        filterable
                                                    >
                                                        <Option
                                                            v-for="list in item.parameter[parameIndex]['list']"
                                                            :key="list.key"
                                                            :value="list.key"
                                                            :label="list.value"
                                                        >
                                                            {{list.value}}
                                                        </Option>
                                                    </Select>
                                                    <Input v-if="!item.parameter[parameIndex]['flag']"
                                                           v-model="item.parameter[parameIndex]['value']"
                                                           style="width: 60px; margin-right: 8px"/>
                                                </div>
                                            </Row>
                                            <Button type="dashed" @click="handleRemove(tabIndex, index)">删除</Button>
                                        </Row>
                                    </FormItem>
                                    <FormItem>
                                        <Row>
                                            <Col span="10">
                                                <Button type="dashed" @click="handleAdd(tabIndex)" long
                                                        icon="plus-round">添加因子条件
                                                </Button>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span="11">
                        <div style="margin-bottom: 40px">
                            <div class="title">
                                组合结果
                            </div>
                            <div
                                v-for="(tab, tabIndex) in newRiskControlFactorData"
                                :key="tab.id"
                                style="margin-bottom: 20px"
                            >
                                <div>
                                    <Tag
                                        style="margin-bottom: 15px; width: 90px; height: 24px; font-size: 14px;text-align: left; line-height: 24px">
                                        {{tab.name}}
                                    </Tag>
                                    <Form :label-width="70" :model="formValidate" ref="formValidate">
                                        <FormItem
                                            v-for="(item, index) in formValidate.filter[tabIndex]"
                                            v-if="item.show"
                                            :key="index"
                                            :label="'因子' + (index + 1)"
                                            :rules="{required: true, message: '因子' + (index + 1) + '因子不能为空', trigger: 'blur'}"
                                        >
                                            <Row>
                                                <Select placeholder="选择因子"
                                                        style="margin-right: 15px; width: 150px"
                                                        disabled
                                                        @on-change="idChange(tabIndex, index, item.id)"
                                                        v-model="item.id">
                                                    <Option
                                                        v-for="id in filterId(tabIndex)"
                                                        :value="id.id"
                                                        :label="id.name"
                                                        :key="id.id">
                                                        {{id.name}}
                                                    </Option>
                                                </Select>
                                                <Row v-if="!!item.id" style="display: inline-block">
                                                    <div v-for="(parame, parameIndex) in item['parameter']"
                                                         style="display: inline-block"
                                                         :key="parameIndex">
                                                        <Input disabled v-model="item.parameter[parameIndex]['key']"
                                                               style="width: 120px; margin-right: 8px"/>
                                                        <Select
                                                            v-if="item.parameter[parameIndex]['flag']"
                                                            v-model="item.parameter[parameIndex]['value']"
                                                            style="margin-right: 8px; width: 180px"
                                                            :transfer=true
                                                            disabled
                                                            filterable
                                                        >
                                                            <Option
                                                                v-for="list in item.parameter[parameIndex]['list']"
                                                                :key="list.key"
                                                                :label="list.value"
                                                                :value="list.key"
                                                            >
                                                                {{list.value}}
                                                            </Option>
                                                        </Select>
                                                        <Input v-if="!item.parameter[parameIndex]['flag']"
                                                               disabled
                                                               v-model="item.parameter[parameIndex]['value']"
                                                               style="width: 60px; margin-right: 8px"/>
                                                    </div>
                                                </Row>
                                            </Row>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="primary"
                                    :disabled="starRow === null"
                                    @click="updateCollect"
                                    style="margin-left: 10px">
                                    {{ starRow === null ? '修改因子组合' : '修改 ' + starRow.name }}
                                </Button>
                                <Button type="primary" @click="handleCollect" style="margin-left: 10px">收藏因子组合</Button>
                                <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
    import canEditTable from './components/canEditTable'
    import api from '@/fetch/api'
    import {mapGetters} from 'vuex'
    import qs from 'qs'
    import * as table from './data/event'
    import {deepClone} from "../../../../libs/deepClone";

    export default {
        name: 'risk-control-builder',
        components: {
            canEditTable
        },
        computed: {
            ...mapGetters({
                userId: 'getUserId',
                starRiskList: 'getStarRiskList'
            }),
            newRiskControlFactorData() {
                let arr = []
                if (this.riskControlFactorData.length) {
                    arr = JSON.parse(JSON.stringify(this.riskControlFactorData))
                }
                if (arr.length && this.specialData.length) {
                    arr.forEach(item => {
                        if (item['child_factor'] && item['child_factor'].length) {
                            item['child_factor'].forEach(child => {
                                child.parameter = JSON.parse(child.parameter)
                                this.specialData.forEach(ins => {
                                    if (child.id === parseInt(ins.factorId)) {
                                        ins.parameter.forEach(list => {
                                            child.parameter[parseInt(list.index)]['list'] = list.list
                                        })
                                    }
                                })
                            })
                        }
                    })
                }
                return arr
            }
        },
        watch: {
            userId(newVal, oldVal) {
                this.loadData()
                this.getRiskControlFactor()
                this.getSpecialData()
            },
            riskControlFactorData(newVal, oldVal) {
                if (newVal.length) {
                    newVal.map(() => {
                        this.formValidate.filter.push([])
                    })
                }
            },
            starRiskList(newVal, oldVal) {
                this.starRiskListCopy = newVal
            }
        },
        data() {
            return {
                riskColumns: table.riskColumns,
                formValidate: {
                    filter: []
                },
                newFilterData: [],
                riskControlFactorData: [],
                tabName: '',
                starRow: null,
                starRiskListCopy: [],
                specialData: []
            }
        },
        methods: {
            init() {
                if (this.userId) {
                    this.loadData()
                    this.getRiskControlFactor()
                    this.getSpecialData()
                }
            },
            // 获得特殊处理参数列表
            getSpecialData() {
                let param = {
                    userId: this.userId
                }
                api.api('get', '/stock/risk-control/risk-control-builder/special-process-parameter/query?' + qs.stringify(param))
                .then(res => {
                    if (res.success) {
                        this.specialData = res.data
                    } else {
                        this.specialData = []
                        this.$Message.error('特殊参数列表获取失败，原因：' + res.message)
                    }
                }, err => {
                    this.specialData = []
                    this.$Message.error('特殊参数列表获取失败，原因：' + err)
                })
            },
            handleAdd(tabIndex) {
                this.formValidate.filter[tabIndex].push({
                    id: '',
                    parameter: [],
                    show: true,
                })
                // console.log(this.formValidate.filter);
            },
            getArrDifference (arr1, arr2) {
                return arr1.concat(arr2).filter(function(v, i, arr) {
                    return arr.indexOf(v) === arr.lastIndexOf(v)
                })
            },
            handleRemove(tabIndex, index) {
                // this.$nextTick(() => {
                //     let arr = []
                //     arr.push(this.formValidate.filter[tabIndex][index])
                //     this.formValidate.filter[tabIndex] = this.getArrDifference(this.formValidate.filter[tabIndex], arr)
                //     console.log(this.formValidate.filter[tabIndex])
                // })
                // console.log('front', this.formValidate.filter[tabIndex])
                // this.$nextTick(() => {
                //     let arr = deepClone(this.formValidate.filter)
                //     arr[tabIndex].splice(index, 1)
                //     console.log(arr[tabIndex])
                //     // this.formValidate.filter = arr
                // })
                this.formValidate.filter[tabIndex][index]['show'] = false
                // this.$delete(this.formValidate.filter[tabIndex], index)
            },
            filterId(tabIndex) {
                return this.newRiskControlFactorData[tabIndex]['child_factor']
            },
            idChange(tabIndex, index, id) {
                let arr = this.newRiskControlFactorData[tabIndex]['child_factor'].filter(item => item.id === id)[0]['parameter']
                let parameter = this.formValidate.filter[tabIndex][index]['parameter']
                if (parameter.length) {
                    parameter = []
                    arr.map(item => {
                        if (item.list) {
                            parameter.push({
                                key: item.key,
                                value: [],
                                list: item.list,
                                flag: true
                            })
                        } else {
                            parameter.push({
                                key: item.key,
                                value: item.value
                            })
                        }
                    })
                    this.formValidate.filter[tabIndex][index]['parameter'] = parameter
                } else {
                    arr.map((item) => {
                        if (item.list) {
                            parameter.push({
                                key: item.key,
                                value: [],
                                list: item.list,
                                flag: true
                            })
                        } else {
                            parameter.push({
                                key: item.key,
                                value: item.value
                            })
                        }
                    })
                }
                // console.log('id', this.formValidate.filter[tabIndex]);
            },
            valueChange(tabIndex, index, parameIndex) {
                console.log('value', this.formValidate.filter[tabIndex]);
                // console.log(this.formValidate.filter[tabIndex][index]['parameter'][parameIndex]);
            },
            // 查询所有的风控因子（有权限的）
            getRiskControlFactor() {
                let param = {
                    userId: this.userId
                }
                api.api('get', '/stock/risk-control/risk-control-builder/all-risk-control-factor/query?' + qs.stringify(param))
                .then(res => {
                    if (res.success) {
                        this.riskControlFactorData = res.data
                    } else {
                        this.riskControlFactorData = []
                        this.$Message.error('风控因子获取失败，原因：' + res.message)
                    }
                }, err => {
                    this.$Message.error('风控因子获取失败，原因' + err)
                })
            },
            loadData() {
                let success = res => {
                    if (res.data.length) {
                        this.$store.commit('changeStarRiskList', res.data)
                    }
                }
                let fail = () => {
                }
                this.getData(success, fail)
            },
            // 查询我的风控
            getData(success, fail) {
                let param = {
                    userId: this.userId
                }
                api.api('get', '/stock/risk-control/risk-control-builder/my-risk-control/query?' + qs.stringify(param))
                .then(res => {
                    if (res.success) {
                        success(res)
                    } else {
                        fail()
                        this.$Message.error('我的风控获取失败，原因：' + res.message)
                    }
                }, err => {
                    fail()
                    this.$Message.error('我的风控获取失败，原因：' + err)
                })
            },
            addData(data) {
                let param = {
                    name: '组合' + (this.starRiskList.length + 1),
                    parameter: JSON.stringify(data),
                    userId: this.userId,
                    note: ''
                }
                api.api('post', '/stock/risk-control/risk-control-builder/risk-control-combination/generate', param)
                .then(res => {
                    if (res.success) {
                        this.$Message.success('添加成功！')
                        this.loadData()
                    } else {
                        this.$Message.error('添加失败，原因：' + res.message)
                    }
                }, err => {
                    this.$Message.error('添加失败，原因：' + err)
                })
            },
            // 修改风控组合
            updateData(data) {
                let param = {
                    id: data.id,
                    name: data.name,
                    parameter: data.parameter,
                    userId: this.userId,
                    note: data.note
                }
                api.api('put', '/stock/risk-control/risk-control-builder/risk-control-combination/modify', param)
                .then(res => {
                    if (res.success) {
                        this.$Message.success('修改成功！')
                        this.loadData()
                    } else {
                        this.$Message.error('修改失败，原因：' + res.message)
                    }
                }, err => {
                    this.$Message.error('修改失败，原因：' + err)
                })
            },
            // 修改我的风控
            updateRiskData(data) {
                let param = {
                    id: data.id,
                    name: data.name,
                    note: data.note
                }
                api.api('put', '/stock/risk-control/risk-control-builder/my-risk-control/modify', param)
                .then(res => {
                    if (res.success) {
                        this.$Message.success('修改成功！')
                        this.loadData()
                    } else {
                        this.$Message.error('修改失败，原因：' + res.message)
                    }
                }, err => {
                    this.$Message.error('修改失败，原因：' + err)
                })
            },
            deleteData(data) {
                let param = {
                    id: data.id
                }
                api.api('delete', '/stock/risk-control/risk-control-builder/my-risk-control/delete?' + qs.stringify(param))
                .then(res => {
                    if (res.success) {
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error('删除失败，原因：' + res.message)
                    }
                }, err => {
                    this.$Message.error('删除失败，原因：' + err)
                })
            },
            addCollectionInfo() {
                let newFilter = deepClone(this.formValidate.filter)
                let arr = []
                let goOn = false
                newFilter.forEach((item, itemIndex) => {
                    if (item.length) {
                        item.map((ins, insIndex) => {
                            if (!ins.show) {
                                arr.push(item[insIndex])
                            }
                        })
                        newFilter[itemIndex] = this.getArrDifference(item, arr)
                        goOn = !goOn
                        // console.log('item', item)
                    }
                })
                if (goOn) {
                    newFilter.forEach(item => {
                        if (item.length) {
                            item.forEach(ins => {
                                if (ins.parameter.length) {
                                    ins.parameter.forEach(io => {
                                        if (io.list) {
                                            delete io.list
                                        }
                                    })
                                }
                            })
                        }
                    })
                    let len = newFilter.flat().length
                    if (len) {
                        let collect = {
                            name: '组合' + (this.starRiskList.length + 1),
                            note: '',
                            parameter: JSON.stringify(newFilter),
                        }
                        let flag = this.starRiskList.some((item) => item.parameter === collect.parameter)
                        if (!flag) {
                            let list = JSON.parse(JSON.stringify(this.$store.state.stock.starRiskList))
                            list.push(collect)
                            this.addData(newFilter)
                            this.$store.commit('changeStarRiskList', list)
                        } else {
                            this.$Message.warning('该因子组合已收藏！')
                        }
                    } else {
                        this.$Message.warning('请先选择好因子，再去收藏！')
                    }
                }
            },
            handleCollect() {
                this.addCollectionInfo()
            },
            handleReset() {
                this.starRow = null
                let arr = []
                this.riskControlFactorData.map(() => {
                    arr.push([])
                })
                this.formValidate.filter = arr
            },
            updateCollect() {
                let len = this.formValidate.filter.flat().length
                if (len) {
                    let newFilter = deepClone(this.formValidate.filter)
                    newFilter.forEach(item => {
                        if (item.length) {
                            item.forEach(ins => {
                                if (ins.parameter.length) {
                                    ins.parameter.forEach(io => {
                                        if (io.list) {
                                            delete io.list
                                        }
                                    })
                                }
                            })
                        }
                    })
                    this.starRow.parameter = JSON.stringify(newFilter)
                    this.updateData(this.starRow)
                } else {
                    this.$Message.warning('请先选择好因子，再去修改因子组合！')
                }
            },
            updateCollectionInfo(val, index, data) {
                this.updateRiskData(data)
                this.$store.commit('changeStarRiskList', val)
            },
            deleteCollectionInfo(val, row) {
                this.deleteData(row)
                this.$store.commit('changeStarRiskList', val)
            },
            searchSpecificTask(row) {
                this.starRow = row
                let parameter = JSON.parse(row.parameter)
                if (this.specialData.length) {
                    parameter.forEach(item => {
                        if (item.length) {
                            item.forEach(ins => {
                                this.specialData.forEach(io => {
                                    if (ins.id === parseInt(io.factorId)) {
                                        ins.parameter.forEach((i, iIndex) => {
                                            io.parameter.forEach((p, pIndex) => {
                                                if (iIndex === parseInt(p.index)) {
                                                    i.list = p.list
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    })
                }
                this.formValidate.filter = deepClone(parameter)
            },
        },
        mounted() {
            this.init()
        }
    }

</script>
