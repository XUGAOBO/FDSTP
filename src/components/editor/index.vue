<template>
    <script :id="id" name="content" type="text/plain" style="overflow-x: hidden">
    </script>
</template>
<script>
    export default {
        props: {
            id: String, // 富文本id
            serverUrl: String, // 上传图片时后端提供的接口
            imageUrl: String,  // 图片上传地址
            imageAccess: String, // 获取图片上传地址
            content: { // 富文本内容
                type: String,
                default: ''
            },
            maximumWords: {    // 允许最大字符
                type: Number,
                default: 10000
            },
            readonly: { // 是否允许编辑
                type: Boolean,
                default: false
            },
            wordCount: { // 是否开启字数统计
                type: Boolean,
                default: true
            },
            lang: { // 编码方式
                type: String,
                default: 'zh-cn'
            },
            width: {
                type: [Number, String],
                default: '100%'
            },
            height: { // 高度
                type: [Number, String],
                default: '100%'
            },
            zIndex: {
                type: Number,
                default: 0
            },
            isAppendTo: { // 是否追加内容
                type: Boolean,
                default: false
            },
            toolbars: {
                type: Array,
                default: function() {
                    return [
                        [
                            'fullscreen', 'source', '|', 'undo', 'redo', '|',
                            'bold', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript',
                            'removeformat', 'formatmatch', 'autotypeset', 'blockquote', '|',
                            'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
                            'customstyle', 'paragraph', 'fontfamily', 'fontSize', '|',
                            'link', 'unlink', 'anchor', '|',
                            'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                            'simpleupload', '|',
                            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                            'charts', '|',
                            'preview'
                        ]
                    ]
                }
            },
            insertorderedlist: {
                type: Object,
                default: function() {
                    return {
                        'decimal': '', //'1,2,3...'
                        'lower-alpha': '', // 'a,b,c...'
                        'lower-roman': '', //'i,ii,iii...'
                        'upper-alpha': '', //'A,B,C'
                        'upper-roman': '' //'I,II,III...'
                    }
                }
            },
            insertunorderedlist: {
               type: Object,
               default: function() {
                   return { //自定的样式
                        'circle': '', // '○ 小圆圈'
                        'disc': '', // '● 小圆点'
                        'square': '' //'■ 小方块'
                    }
               }
            }
        },
        data() {
            return {
                editor: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initEditor();
            })
        },
        methods: {
            // 初始化富文本
            initEditor() {
                if (!this.id) {
                    return;
                }
                let ue = window.UE.getEditor(this.id, {
                    toolbars: this.toolbars,
                    lang: this.lang, // 编码
                    insertorderedlist: this.insertorderedlist,
                    insertunorderedlist: this.insertunorderedlist,
                    serverUrl: this.serverUrl,
                    imageUrl: this.imageUrl,
                    imageAccess: this.imageAccess, // 获取图片地址
                    enableAutoSave: false,
                    initialFrameWidth: this.width,
                    initialFrameHeight: this.height,
                    readonly: this.readonly,          // 是否允许编辑
                    wordCount: this.wordCount, // 字数统计
                    maximumWords: this.maximumWords, // 允许最大字符
                    zIndex: this.zIndex
                });
                this.editor = ue;
                this.editor.ready((ueditor) => {
                    if (!ueditor) {
                        // 如果初始化后ueditor不存在 删除后重新调用
                        window.UE.delEditor(this.id);
                        this.initEditor();
                    }
                    this.editor.addListener('contentChange', () => {
                        this.getContent();
                    });
                    this.setContent(this.content, this.isAppendTo);
                })
            },
            // 写入内容｜追加内容
            setContent(appendContent, isAppendTo = false) {
                if (this.editor && this.editor.body && this.editor.body.innerHTML && appendContent) {
                    this.editor.setContent(appendContent, isAppendTo);
                }
            },
            // 获取富文本内容
            getContent() {
                this.editor && this.$emit('get-content', this.editor.getContent())
            },
            // 获得带格式的纯文本
            getPlainTxt() {
                if (this.editor) {
                    return this.editor.getPlainTxt();
                }
                return '';
            },
            // 判断是否有内容
            hasContent() {
                if (this.editor && this.editor.body) {
                    return this.editor.hasContents();
                }
                return false;
            },
            // 插入给定的html
            insertHtml(content) {
                if (this.editor) {
                    this.editor.execCommand('insertHtml', content);
                }
            },
            // 编辑器是否获取焦点
            hasFocus() {
                if (this.editor) {
                    return this.editor.isFocus();
                }

                return false;
            },
            // 设置高度
            setHeight(height) {
                if (this.editor) {
                    this.editor.setHeight(height);
                }
            }
        },
        watch: {
            content(val, oldVal) {
                if (val !== oldVal) {
                    this.setContent(val, this.isAppendTo);
                }
            }
        }
    }
</script>
