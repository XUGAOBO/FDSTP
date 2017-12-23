<template>
    <div class="page-header">
        <div class="func-bar clearfix">
            <span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.operator"
                    :label="item.operator"
                    :value="item.operator">
                    </el-option>
                </el-select>
                <span class="add-icon" @click="addOperator">
                    <i class="el-icon-circle-plus-outline"></i>
                </span>
            </span>
            <span class="setting">
                <span class="setting-avatar">
                        <img src="../../assets/images/avatar.jpg" />
                    </span> admin
            </span>
            <el-dialog title="添加操作员" :visible.sync="visible" :before-close="close">
                <div>
                    <el-form ref="form" label-width="100px">
                        <el-form-item label="操作员名称">
                            <el-input v-model="inputValue"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="close">取 消</el-button>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {
        queryOperator,
        insertOperator
    } from '../../api/operator';
    export default {
        data() {
            return {
                options: [],
                value: '',
                visible: false,
                inputValue: '' // 操作员姓名
            }
        },
        methods: {
            close: function () {
                this.visible = false;
            },
            // 添加操作员
            addOperator() {
                this.visible = true;
                this.inputValue = '';
            },
            confirm() {
                if (!this.inputValue) {
                    this.$message({
                        message: '操作员姓名不能为空',
                        type: 'warning'
                    });
                    return;
                }
                insertOperator(this.inputValue).then(res => {
                    this.visible = false;
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.queryOperate()
                })
            },
            queryOperate() {
                queryOperator().then(res => {
                    this.options = res;
                    if (res.length > 0) {
                        this.value = res[0].operator;
                    }
                })
            }
        },
        mounted() {
            this.queryOperate()
        }
    }
</script>
