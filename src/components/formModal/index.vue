<template>
    <el-dialog title="收货地址" :visible.sync="visible">
        <el-form :model="form" ref="form">
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            dataSource: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data() {
            return {
                form: this.dataSource
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
            // 取消
            close: function () {
                this.$emit('closeDialog');
            },
            // 确定
            confirm: function () {
                this.$emit('closeDialog');
            }
        },
        watch: {
            visible(val) {
                console.error('val', val);
            }
        },
        mounted () {
            console.error('cccccc');
        }
    }

</script>
