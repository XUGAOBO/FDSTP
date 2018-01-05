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
                        <Editor id="weatherNotice" :content="props.data.content" serverUrl="" :readonly="true" imageUrl="" imageAccess="" />
                    </div>
                </el-dialog>
            </p>
            <p slot="operate">
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-popover ref="popover" placement="top" width="160" :value="getPopoverStatus(scope.row.id)">
                            <p>您确定删除吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="clearPopoverStatus">取消</el-button>
                                <el-button type="primary" size="mini" @click="deleteRecord(scope.row, TABLE_NAME)">确定</el-button>
                            </div>
                        </el-popover>
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small" v-popover:popover>下发</el-button>
                    </template>
                </el-table-column>
            </p>
        </TableInfo>
        <FormModal :dataSource="formData" :initValue="initValue" @closeDialog="closeDialog" @confirm="confirm" :tableName="TABLE_NAME" :visible="visible" slot="form-modal" />
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    import Editor from 'Components/editor/index';
    const TABLE_NAME = 'weather';
    export default {
        mixins: [mixin],
        components: {
            TableInfo,
            FormModal,
            Layout,
            Editor
        },
        data() {
            return {
                TABLE_NAME,
                contentVisible: false
            }
        },
        mounted () {
            this.tableName = TABLE_NAME;
        }
    }

</script>
