<template>
    <el-table :data="dataSource" border style="width: 100%">
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
            },
            dataSource: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        methods: {
        },
        data() {
            return {
            }
        }
    }

</script>
