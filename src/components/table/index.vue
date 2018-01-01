<template>
    <div class="table">
        <el-table :data="dataSource" border style="width: 100%">
            <el-table-column v-for="(item, index) in  getColumns" :key="index" :min-width="item.minWidth" :prop="item.prop" :label="item.label" :width="item.width">
                <template slot-scope="scope">
                    <p v-if="item.render">
                        <slot :data="scope.row" :name="item.prop"></slot>
                    </p>
                    <span v-else-if="!item.render">{{ scope.row[item.prop]}}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <slot name="operate"></slot>
        </el-table>
    </div>
</template>
<script>
import { COMMON_EUM } from 'Utils/constants';
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
        },
        computed: {
            getColumns() {
                return this.columns.filter(item => item.prop !== COMMON_EUM.ID) // 隐藏id
            }
        }
    }

</script>
