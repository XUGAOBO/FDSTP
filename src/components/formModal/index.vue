<template>
    <el-dialog :title="title" :visible.sync="visible" :before-close="close">
        <div class="form-modal">
            <el-form :model="form" ref="form" label-width="80px">
                <el-form-item v-for="(item, index) in dataSource" :key="index" :label="item.name">
                    <!-- 单行文本 -->
                    <el-input v-model="form[item.key]" v-if="item.type === 'input'"></el-input>
                    <!-- 下拉框 -->
                    <el-select v-model="form[item.key]" placeholder="" v-if="item.type === 'select'">
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            title: { // 表单的标题
                type: String,
                default: ''
            },
            visible: { // 表单展示与隐藏的状态
                type: Boolean,
                default: false
            },
            dataSource: { // 表单的数据源
                type: Array,
                default () {
                    return []
                }
            },
            tableName: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                form: {}
            }
        },
        computed: {
            // 表格记录中的key列表
            itemKeyList: function () {
                return Object.keys(this.form)
            },
            // 表格记录中的value列表
            itemValueList: function () {
                return Object.values(this.form)
            }
        },
        methods: {
            // 获取组件
            getComponent(data) {
                console.error('data', data);
            },
            // 取消
            close: function () {
                this.$emit('closeDialog');
            },
            // 确定
            confirm: function () {
                this.$emit('confirm', this.form, this.tableName);
            }
        },
        mounted() {
            this.form = this.dataSource.reduce(function (po, item) {
                po[item.key] = '';
                return po;
            }, {});
        }
    }

</script>
