<template>
    <el-dialog :title="title" :visible.sync="visible" :before-close="close" top='50px' width="40%">
        <div class="form-modal">
            <el-form :model="form" ref="form" label-width="100px" size="mini">
                <el-form-item v-for="(item, index) in data" :key="index" :label="item.name">
                    <!-- 单行文本 -->
                    <el-input v-model="form[item.key]" v-if="item.type === 'input'" :disabled="item.disabled"></el-input>
                    <!-- 下拉框 -->
                    <el-select v-model="form[item.key]" placeholder="请选择" v-if="item.type === 'select'">
                        <el-option v-for="(item, index) in item.enum" :key="index" :label="item.value" :value="item.value">
                        </el-option>
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
    import cache from 'Utils/cache';
    import {
        SESSION_KEY,
        COMMON_EUM
    } from 'Utils/constants';
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
            },
            initValue: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        data() {
            return {
                form: {},
                COMMON_EUM,
                data: []
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
        watch: {
            dataSource(val) {
                this.form = this.dataSource.reduce(function (po, item) {
                    po[item.key] = '';
                    return po;
                }, {});
                this.data = this.dataSource.filter(item => {
                    return [COMMON_EUM.ID, COMMON_EUM.CREATEDATE].indexOf(item.key) === -1 // 隐藏id和创建时间
                })
            },
            initValue(val) {
                if (this.visible) {
                    if (Object.keys(this.initValue).length > 0) { // 代表更新
                        for (let key of Object.keys(this.form)) {
                            this.form[key] = this.initValue[key];
                        }
                    } else { // 代表新增
                        if (this.form.hasOwnProperty(COMMON_EUM.OPERATOR)) { // 如果有操作员字段
                            this.form[COMMON_EUM.OPERATOR] = cache.get(SESSION_KEY.OPERATOR)
                        }
                    }
                }
            }
        }
    }

</script>
