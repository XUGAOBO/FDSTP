<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column v-for="(item, index) in  columns" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
        </el-table-column>
        <slot name="operate"></slot>
    </el-table>
</template>
<script>
    export default {
        props: {
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        methods: {
        },
        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        }
    }

</script>
