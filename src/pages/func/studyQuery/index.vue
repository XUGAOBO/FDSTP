<template>
    <Layout>
        <div slot="operate">
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <p slot="operate">
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-dialog title="学习情况" :visible.sync="dialogVisible" top='50px'>
                            <TableInfo :columns="signColumns" :dataSource="signDataSource">
                                <img slot="sign" slot-scope="props" :src="props.data.sign" width="150" />
                            </TableInfo>
                        </el-dialog>
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small">签到表</el-button>
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
    const TABLE_NAME = 'trainingRecord';
    export default {
        mixins: [mixin],
        components: {
            TableInfo,
            FormModal,
            Layout
        },
        data() {
            return {
                TABLE_NAME,
                dialogVisible: false
            }
        },
        mounted() {
            this.tableName = TABLE_NAME;
        },
        methods: {
            showPopover(id) {
                this.dialogVisible = true;
                this.querySignTable(id);
            }
        }
    }

</script>
