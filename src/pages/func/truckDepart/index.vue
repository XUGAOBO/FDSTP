<template>
    <Layout>
        <div slot="operate">
            <el-date-picker v-model="checkDate" type="datetimerange" @change="changeDate" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" format="yyyy-MM-dd" size="small" align="right">
            </el-date-picker>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
        </TableInfo>
        <FormModal :dataSource="formData" :initValue="initValue" @closeDialog="closeDialog" @confirm="confirm" :tableName="TABLE_NAME"
            :visible="visible" slot="form-modal" />
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    import Editor from 'Components/editor/index';
    import Motorcade from 'Components/motorcade/index';
        import {
        format as formatDate
    } from 'Utils/date';
    import {
        queryTopic,
        addTopic
    } from '../../../api/topic';
    const TABLE_NAME = 'truckDepartCheckRecordStatistic';
    const formTemplate = {
        question: '', // 题目
        choiceA: '', // 题目A
        choiceB: '',
        choiceC: '',
        choiceD: '',
        rightAnswer: '' // 正确答案
    };
    export default {
        mixins: [mixin],
        components: {
            TableInfo,
            FormModal,
            Editor,
            Layout,
            Motorcade
        },
        data() {
            const thisDate = new Date();
            thisDate.setDate(1);
            return {
                form: { ...formTemplate
                },
                checkDate: [thisDate, new Date()],
                contentVisible: false, // 详细内容展示状态
                topicVisible: false, // 出题面板展示状态
                TABLE_NAME,
                contentId: '',
                topicList: [],
                rowId: '' // 选中行id
            }
        },
        mounted() {
            this.tableName = TABLE_NAME;
            this.queryTable(this.formatTableParam(this.checkDate));
        },
        methods: {
            formatTableParam(dateArr) {
                return {
                    table: this.TABLE_NAME,
                    sDate: this.formatDate(dateArr[0]),
                    eDate: this.formatDate(dateArr[1])
                };
            },
            formatDate(date) {
                return formatDate(date, 'YYYYMMDD');
            },
            showContent(id) {
                this.contentVisible = true;
                this.contentId = id;
            },
            getContentStatus(id) {
                return this.contentVisible && this.contentId === id;
            },
            closeContentStatus() {
                this.contentVisible = false;
                this.contentId = '';
            },
            // 查询题目
            queryQuestion(id) {
                this.rowId = id;
                queryTopic(id).then(res => {
                    this.topicVisible = true;
                    if (res.code === 0) { // 成功
                        let data = res.content || [];
                        this.topicList = data;
                    }
                })
            },
            // 添加题目
            addQuestion() {

            },
            // 提交题目
            onSubmit() {
                let {
                    question,
                    choiceA,
                    choiceB,
                    choiceC,
                    choiceD,
                    rightAnswer
                } = this.form;
                if (!question) {
                    this.warnTip('题目不能为空!');
                    return;
                }
                if ((!choiceA) && (!choiceB) && (!choiceC) && (!choiceD)) {
                    this.warnTip('至少有一个题目!');
                    return;
                }
                if (!rightAnswer) {
                    this.warnTip('正确答案不能为空!');
                    return;
                }
                addTopic(this.rowId, this.form)
                    .then(res => {
                        this.form = { ...formTemplate
                        };
                        this.queryQuestion(this.rowId);
                        this.successTip('添加成功!');
                    });
            },
            warnTip(tip) {
                this.$message({
                    message: tip,
                    type: 'warning'
                });
            },
            successTip(tip) {
                this.$message({
                    message: tip,
                    type: 'success'
                });
            }
        }
    }

</script>
