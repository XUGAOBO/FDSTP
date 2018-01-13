<template>
    <div class="motorcade">
        <el-popover ref="popover" placement="bottom" trigger="click" v-model="visible">
            <el-table ref="multipleTable" :data="dataSource" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="车队" width="120" prop="motorcadeName">
                </el-table-column>
            </el-table>
            <div class="motorcade-btn">
                <el-button type="primary" size="mini" @click="issued">确定</el-button>
            </div>
        </el-popover>
        <el-button type="text" size="small" v-popover:popover @click="visible =true">下发</el-button>
    </div>
</template>
<script>
    import {
        dispatch
    } from '../../api/table';
    export default {
        props: {
            dataSource: { // 表单的数据源
                type: Array,
                default () {
                    return []
                }
            },
            row: {
                type: Object,
                default () {
                    return {}
                }
            },
            tableName: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                visible: false,
                multipleSelection: []
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 下发
            issued() {
                if (this.multipleSelection && this.multipleSelection.length === 0) {
                    this.$message({
                        message: '请至少选择一个车队',
                        type: 'warning'
                    });
                    return;
                }
                let tempData = [];
                this.multipleSelection.map(item => {
                    tempData.push(item.motorcadeName);
                });
                dispatch(this.row.id, tempData, this.tableName)
                    .then(res => {
                        this.$message({
                            message: '下发成功~',
                            type: 'success'
                        });
                        this.visible = false;
                        this.multipleSelection = []
                    })
                    .catch(err => {
                        this.$message({
                            message: '下发失败, 请重新下发!',
                            type: 'waring'
                        });
                        this.visible = false;
                        this.multipleSelection = []
                    });
            }
        }
    }

</script>
