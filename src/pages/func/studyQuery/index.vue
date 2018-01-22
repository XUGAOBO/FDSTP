<template>
    <Layout>
        <div slot="operate">
            <el-date-picker v-model="checkDate" type="datetimerange" @change="changeDate" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" format="yyyy-MM-dd" size="small" align="right">
            </el-date-picker>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <p slot="finishRate" slot-scope="props">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="props.data.finishRate"></el-progress>
            </p>
            <p slot="operate">
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-dialog title="学习情况" :visible.sync="dialogVisible" top='50px'>
                            <div  slot="title" class="operate-table">
                                <span>学习情况</span>
                                <el-button @click="exportData(scope.row.id)" size="small">导出</el-button>
                            </div>
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
            const thisDate = new Date();
            thisDate.setDate(1);
            return {
                TABLE_NAME,
                dialogVisible: false,
                checkDate: [thisDate, new Date()]
            }
        },
        mounted() {
            this.tableName = TABLE_NAME;
            this.queryTable({
                    table: this.TABLE_NAME,
                    sDate: this.formatDate(this.checkDate[0]),
                    eDate: this.formatDate(this.checkDate[1])
                });
        },
        methods: {
            showPopover(id) {
                this.dialogVisible = true;
                this.querySignTable(id);
            }
        }
    }

</script>
