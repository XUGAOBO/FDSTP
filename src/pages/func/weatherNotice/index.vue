<template>
    <Layout>
        <div slot="operate">
            <el-button @click="createRecord" size="small">新增</el-button>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <p slot="content" slot-scope="props">
                <el-button type="text" @click="showContent(props.data.id)">点击查看内容</el-button>
                <el-dialog title="详细内容" :visible="getContentStatus(props.data.id)" width="60%" top='50px' @close="closeContentStatus">
                    <div class="detail-content__size">
                        <Editor :id="props.data.id" :content="props.data.content" :readonly="true" />
                    </div>
                </el-dialog>
            </p>
            <p slot="operate">
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <Motorcade :dataSource="motorcadeList" :row="scope.row" :tableName="TABLE_NAME" />
                    </template>
                </el-table-column>
            </p>
        </TableInfo>
        <FormModal :dataSource="formData" :plain="true" :initValue="initValue" @closeDialog="closeDialog" @confirm="confirm" :tableName="TABLE_NAME" :visible="visible" slot="form-modal" />
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    import Editor from 'Components/editor/index';
    import Motorcade from 'Components/motorcade/index';
    const TABLE_NAME = 'weather';
    export default {
        mixins: [mixin],
        components: {
            TableInfo,
            FormModal,
            Layout,
            Editor,
            Motorcade
        },
        data() {
            return {
                TABLE_NAME,
                contentVisible: false,
                contentId: ''
            }
        },
        mounted () {
            this.tableName = TABLE_NAME;
            this.getRacingTeam();
        },
        methods: {
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
            }
        }
    }

</script>
