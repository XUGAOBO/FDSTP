<template>
    <Layout>
        <div slot="operate">
            <el-button @click="createRecord" size="small">新增</el-button>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <p slot="content" slot-scope="props">
                <el-button type="text" @click="contentVisible = true">点击查看内容</el-button>
                <el-dialog title="详细内容" :visible.sync="contentVisible" width="60%" top='50px'>
                    <div class="detail-content__size">
                        <Editor id="trainManage" :content="props.data.content" serverUrl="" :readonly="true" imageUrl="" imageAccess="" />
                    </div>
                </el-dialog>
            </p>
            <p slot="operate">
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-popover ref="popover" placement="top" width="160" :value="getPopoverStatus(scope.row.id)">
                            <p>您确定删除吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="clearPopoverStatus">取消</el-button>
                                <el-button type="primary" size="mini" @click="deleteRecord(scope.row, TABLE_NAME)">确定</el-button>
                            </div>
                        </el-popover>
                        <el-button @click="queryQuestion(scope.row.id)" type="text" size="small">出题</el-button>
                        <el-button @click="updateRecord(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small" v-popover:popover>删除</el-button>
                        <el-dialog title="题目" :visible.sync="topicVisible" width="60%" top='50px'>
                            <div slot="title" class="topic-title">
                                <span class="el-dialog__title">题目</span>
                                <!--
                                <div class="topic-title__btn">
                                    <el-button @click="addQuestion" size="small">添加题目</el-button>
                                </div>
                                -->
                            </div>
                            <div class="topic-content">
                                
                                    <el-carousel :interval="50000000" arrow="always" height="150px">
                                        <el-carousel-item v-for="(item, index) in topicList" :key="index">
                                            <div class="topic-carousel">
                                                <h3>{{ item.question }}</h3>
                                                <div v-if="item.choiceA">A: {{ item.choiceA }}</div>
                                                <div v-if="item.choiceB">B: {{ item.choiceB }}</div>
                                                <div v-if="item.choiceC">C: {{ item.choiceC }}</div>
                                                <div v-if="item.choiceD">D: {{ item.choiceD }}</div>
                                                <h3>正确答案: {{ item.rightAnswer }}</h3>           
                                            </div>
                                        </el-carousel-item>
                                    </el-carousel>
                                <div class="topic-add">
                                    <el-form :model="form" ref="form" label-width="100px" size="mini">
                                        <el-form-item label="题目">
                                            <el-input v-model="form.question"></el-input>
                                        </el-form-item>
                                        <el-form-item label="A">
                                            <el-input v-model="form.choiceA"></el-input>
                                        </el-form-item>
                                        <el-form-item label="B">
                                            <el-input v-model="form.choiceB"></el-input>
                                        </el-form-item>
                                        <el-form-item label="C">
                                            <el-input v-model="form.choiceC"></el-input>
                                        </el-form-item>
                                        <el-form-item label="D">
                                            <el-input v-model="form.choiceD"></el-input>
                                        </el-form-item>
                                        <el-form-item label="正确答案">
                                            <el-radio-group v-model="form.rightAnswer">
                                                <el-radio label="A"></el-radio>
                                                <el-radio label="B"></el-radio>
                                                <el-radio label="C"></el-radio>
                                                <el-radio label="D"></el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <div class="topic-submit__btn">
                                            <el-form-item>
                                                <el-button type="primary" @click="onSubmit">提 交</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                            </div>
                        </el-dialog>
                    </template>
                </el-table-column>
            </p>
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
    import {
        queryTopic,
        addTopic
    } from '../../../api/topic';
    const TABLE_NAME = 'training';
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
            Layout
        },
        data() {
            return {
                form: { ...formTemplate
                },
                contentVisible: false, // 详细内容展示状态
                topicVisible: false, // 出题面板展示状态
                TABLE_NAME,
                topicList: [],
                rowId: '' // 选中行id
            }
        },
        mounted() {
            this.tableName = TABLE_NAME;
        },
        methods: {
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
