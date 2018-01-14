<template>
    <el-dialog :title="title" :visible.sync="visible" :before-close="close" top='50px'>
        <div class="form-modal" :style="{height: height + 'px'}">
            <el-form :model="form" ref="form" label-width="100px" size="mini" :inline="true">
                <el-form-item v-for="(item, index) in data" :key="index" :label="item.name">
                    <!-- 单行文本 -->
                    <el-input v-model="form[item.key]" v-if="item.type === EDITOR_TYPE['text']" :disabled="item.disabled"></el-input>
                    <!-- 下拉框 -->
                    <el-select v-model="form[item.key]" placeholder="请选择" v-if="item.type === EDITOR_TYPE['select']">
                        <el-option v-for="(item, index) in item.enum" :key="index" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 上传图片 -->
                    <input type="file" @change="fileUpload($event)" v-if="item.type === EDITOR_TYPE['photo'] " />
                    <!--
                        <el-upload class="avatar-uploader" ref="upload" :on-preview="handlePreview" :before-upload="beforeUpload" 
                        action="/" :file-list="fileList" :auto-upload="false" :multiple="false">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    -->
                    <!-- 时间选择框 -->
                    <el-date-picker v-model="form[item.key]" type="date" placeholder="请选择日期" v-if="item.type === EDITOR_TYPE['showDate']">
                    </el-date-picker>
                    <!-- 计数器 -->
                    <el-input-number v-model="form[item.key]" controls-position="right" v-if="item.type === EDITOR_TYPE['number']"></el-input-number>
                    <!-- 富文本 -->
                    <div v-if="item.type === EDITOR_TYPE['textArea']" class="form-modal__editor">
                        <Editor :id="`editor${index}`" :propKey="item.key" :content="form[item.key]" height=180 :isAppendTo="true" @get-content="getContent"
                        @get-text="getText"
                        />
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="confirm">提 交</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import cache from 'Utils/cache';
    import Editor from '../editor';
    import {
        SESSION_KEY,
        COMMON_EUM,
        EDITOR_TYPE
    } from 'Utils/constants';
    export default {
        components: {
            Editor
        },
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
            },
            plain: { // 是否获取纯文本
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                form: {},
                COMMON_EUM,
                EDITOR_TYPE,
                data: [],
                fileList: [], // 图片列表
                height: 500
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
            },
            beforeUpload(file) {
                this.fileList = [file];
            },
            // 图片上传
            handlePreview(file) {
                this.fileList = [file];
            },
            // 获取富文本
            getContent(data, key) {
                if (key && !this.plain) {
                    this.form[key] = data;
                }
            },
            getText(data, key) {
                if (key && this.plain) {
                    this.form[key] = data;
                }
            },
            // 图片上传
            fileUpload(event) {
                this.$set(this.form, 'photo', event.target.files[0])
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
                    for (let key of Object.keys(this.form)) {
                        this.form[key] = this.initValue[key];
                    }
                    if (Object.keys(val).length === 0 && this.form.hasOwnProperty(COMMON_EUM.OPERATOR)) { // 如果为新增 且有操作员字段
                        this.form[COMMON_EUM.OPERATOR] = cache.get(SESSION_KEY.OPERATOR)
                    }
                }
            },
            fileList(val) {
                console.error('val', val)
            }
        },
        mounted () {
            this.height = cache.session.get('height') - 230;
        }
    }

</script>
