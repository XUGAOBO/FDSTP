<template>
    <el-table :data="dataSource" border style="width: 100%">
        <el-table-column v-for="(item, index) in  columns" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
            <template slot-scope="scope">
                <p v-if="item.render">
                    <slot :data="scope.row" :name="item.prop"></slot>
                </p>
                <span>{{ scope.row[item.prop] }}</span>
            </template>
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
            },
            dataSource: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        methods: {},
        data() {
            return {}
        }
    }

</script>
