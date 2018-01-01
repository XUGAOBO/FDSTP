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
                        <el-button @click="queryQuestion(scope.row)" type="text" size="small">出题</el-button>
                        <el-button @click="updateRecord(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small" v-popover:popover>删除</el-button>
                        <el-dialog title="题目" :visible.sync="topicVisible" width="60%" top='50px'>
                            <div slot="title" class="topic-title">
                                <span class="el-dialog__title">题目</span>
                                <div class="topic-title__btn">
                                    <el-button @click="addQuestion" size="small">添加题目</el-button>
                                </div>
                            </div>
                            <div class="topic-content">
                                <el-carousel :interval="50000000" arrow="always" height="150px">
                                    <el-carousel-item v-for="(item, index) in topicList" :key="index">
                                        <h3>{{ item.question }}</h3>
                                        <div v-if="item.choiceA">A: {{ item.choiceA }}</div>
                                        <div v-if="item.choiceB">B: {{ item.choiceB }}</div>
                                        <div v-if="item.choiceC">C: {{ item.choiceC }}</div>
                                        <div v-if="item.choiceD">D: {{ item.choiceD }}</div>
                                        <h3>正确答案: {{ item.rightAnswer }}</h3>
                                    </el-carousel-item>
                                </el-carousel>
                                <div class="topic-add">
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
        queryTopic
    } from '../../../api/topic';
    const TABLE_NAME = 'training';
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
                contentVisible: false, // 详细内容展示状态
                topicVisible: false, // 出题面板展示状态
                TABLE_NAME,
                topicList: []
            }
        },
        mounted() {
            this.tableName = TABLE_NAME;
        },
        methods: {
            // 出题
            queryQuestion(row) {
                queryTopic(row.id).then(res => {
                    this.topicVisible = true;
                    if (res.code === 0) { // 成功
                        let data = res.content || [];
                        this.topicList = data;
                    }
                })
            },
            // 添加题目
            addQuestion() {

            }
        }
    }

</script>
