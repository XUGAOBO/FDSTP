<template>
    <Layout>
        <div slot="operate">
            <el-date-picker v-model="checkDate" type="datetimerange" @change="changeDate" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" format="yyyy-MM-dd" size="small" align="right">
            </el-date-picker>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <div slot="content" style="">
            <TableInfo :columns="columns" :dataSource="dataSource"  style="width:20%;float:left" @row-click="linkCompany" >
            </TableInfo>
            <div style="width:79%;float:left;">
                <TableInfo :columns="columnsDetail" :dataSource="dataSourceDetail" :searchVisible=false style="height:120px" >
                </TableInfo>
                <TableInfo :columns="columnsDetail" :dataSource="dataSourceDetail" style="height:300px">
                </TableInfo>
            </div>
        </div>
        
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    const TABLE_NAME = 'govermentcorpList';
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
                checkDate: [thisDate, new Date()],
                corpId: ''
            }
        },
        mounted () {
            this.tableName = TABLE_NAME;
            this.queryTable({
                table: this.TABLE_NAME,
                sDate: this.formatDate(this.checkDate[0]),
                eDate: this.formatDate(this.checkDate[1])
            });
            this.queryDetailTable({
                companyId: '',
                companyName: '',
                table: 'govermentStatistics',
                sDate: this.formatDate(this.checkDate[0]),
                eDate: this.formatDate(this.checkDate[1])
            });
        },
        methods: {
            showPopover(id) {
                this.dialogVisible = true;
                this.queryLetterTable(id);
            },
            linkCompany (row, event, column) {
                this.queryDetailTable({
                    companyId: row.id,
                    companyName: row.corpName,
                    table: 'govermentStatistics',
                    sDate: this.formatDate(this.checkDate[0]),
                    eDate: this.formatDate(this.checkDate[1])
                });
            },
            exportTable () {
                debugger
                 this.queryDetailTable({
                    companyId: '',
                    download: true,
                    table: 'govermentTraining',
                    sDate: this.formatDate(this.checkDate[0]),
                    eDate: this.formatDate(this.checkDate[1])
                });
            }
            
        }
    }

</script>
