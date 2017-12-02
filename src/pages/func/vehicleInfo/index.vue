<template>
    <Layout>
        <div slot="operate">
            <el-button @click="createRecord" size="small">新增</el-button>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <p slot="name" slot-scope="props">
                <span>hello world</span>
                <span>{{props.data.name}}</span>
            </p>
            <p slot="operate">
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="updateRecord(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="deleteRecord(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </p>
        </TableInfo>
        <FormModal :dataSource="formData" @closeDialog="closeDialog" :visible="visible" slot="form-modal" />
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    export default {
        mixins: [mixin],
        components: {
            TableInfo,
            FormModal,
            Layout
        },
        data() {
            return {
                formData: [{
                    key: 'no',
                    name: '车队编号',
                    type: 'input'
                }, {
                    key: 'carNo',
                    name: '车号',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '挂车车号',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '车辆类型',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '吨位',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '驾驶员1',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '驾驶员1手机号码',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '驾驶员1微信号',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '驾驶员2',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '驾驶员2手机号码',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '驾驶员2微信号',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '押车员',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '押车员手机号码',
                    type: 'input'
                }, {
                    key: 'date',
                    name: '押车员微信号',
                    type: 'input'
                }]
            }
        },
        watch: {
            visible(val) {
                console.error('visible', val);
            }
        },
        mounted() {
            this.columns = [{
                prop: 'date',
                label: '车队编号',
                width: 180
            }, {
                prop: 'date',
                label: '车号',
                width: 180
            }, {
                prop: 'date',
                label: '挂车车号',
                width: 180
            }, {
                prop: 'date',
                label: '车辆类型',
                width: 180
            }, {
                prop: 'date',
                label: '吨位',
                width: 180
            }, {
                prop: 'date',
                label: '驾驶员1',
                width: 180
            }, {
                prop: 'date',
                label: '驾驶员1手机号码',
                width: 180
            }, {
                prop: 'date',
                label: '驾驶员1微信号',
                width: 180
            }, {
                prop: 'date',
                label: '驾驶员2',
                width: 180
            }, {
                prop: 'date',
                label: '驾驶员2手机号码',
                width: 180
            }, {
                prop: 'date',
                label: '驾驶员2微信号',
                width: 180
            }, {
                prop: 'date',
                label: '押车员',
                width: 180
            }, {
                prop: 'date',
                label: '押车员手机号码',
                width: 180
            }, {
                prop: 'date',
                label: '押车员微信号',
                width: 180
            }];
            let tempData = [];
            for (let i = 0; i < 200; i++) {
                tempData.push({
                    date: '1008611'
                });
            }
            this.dataSource = tempData;
        }
    }

</script>
