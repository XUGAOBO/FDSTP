<template>
    <operation>
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
        <FormModal :dataSource="{}" @closeDialog="closeDialog" :visible="visible" slot="form-modal" />
    </operation>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Operation from '../operation/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    export default {
        mixins: [mixin],
        components: {
            TableInfo,
            FormModal,
            Operation
        },
        data() {
            return {
                columns: [{
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
                }],
                dataSource: [{
                    date: '1008611'
                }]
            }
        }
    }

</script>
