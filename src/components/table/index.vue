<template>
    <div class="table">
        <el-input placeholder="搜索" v-model="filterInput" clearable></el-input>
        <el-table :data="filterData" border style="width: 100%" :height="height">
            <el-table-column v-for="(item, index) in  getColumns" :key="index" :min-width="item.minWidth" :prop="item.prop" :label="item.label" :width="item.width" @row-click="rowClick">
                <template slot-scope="scope">
                    <slot :data="scope.row" :name="item.prop" v-if="item.render"></slot>
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
import cache from 'Utils/cache';
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
        data() {
            return {
                height: '',
                filterInput: '',
                filterData: this.dataSource
            }
        },
        watch: {
            dataSource () {
                this.filterTableDataSource(this.filterInput);
            },
            filterInput (value) {
                console.log(value, this.dataSource);
                this.filterTableDataSource(value);
            }
        },
        methods: {
            filterTableDataSource (value) {
                const noFilter = ['photo', 'id', 'corpId'];
                this.filterData = this.dataSource.filter(data => {
                    if (value !== '') {
                        return Object.keys(data).some(key => noFilter.indexOf(key) === -1 && String(data[key]).indexOf(value) > -1);
                    }
                    return data;
                })
            },
            rowClick(row, event, column) {
                this.$emit('row-click', row, event, column);
            }
        },
        computed: {
            getColumns() {
                return this.columns.filter(item => item.prop !== COMMON_EUM.ID) // 隐藏id
            }
        },
        mounted () {
            this.height = cache.session.get('height') - 180;
        }
    }

</script>
