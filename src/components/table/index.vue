<template>
    <div class="table">
        <el-input placeholder="搜索" icon="search" v-model="schfilter" ></el-input>
        <el-table :data="dataSource" border style="width: 100%" :height="height">
            <el-table-column v-for="(item, index) in  getColumns" :key="index" :min-width="item.minWidth" :prop="item.prop" :label="item.label" :width="item.width"
            >
            <!-- :filters="item.filters" :filter-method="filterTag" filter-placement="bottom-end" -->
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
        methods: {
            filterTag(value, row) {
                let keys = Object.keys(row)
                for (let key of keys) {
                    if (row[key] === value) {
                        return true;
                    }
                }
                return false;
            }
        },
        data() {
            return {
                height: '',
                schfilter: '',
                oldDataSource: []
            }
        },
        computed: {
            getColumns() {
                return this.columns.filter(item => item.prop !== COMMON_EUM.ID) // 隐藏id
            }
        },
        mounted () {
            this.height = cache.session.get('height') - 180;
        },
        watch: {
          schfilter: function(val, oldVal) {
              if (oldVal.length === 0) {
                this.oldDataSource = this.dataSource
              } else {
                  this.dataSource = this.oldDataSource.filter(item => (~item.name.indexOf(val)));
              }
            }
        }
    }

</script>
