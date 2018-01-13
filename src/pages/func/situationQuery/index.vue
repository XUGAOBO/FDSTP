<template>
    <Layout>
        <div slot="operate">
            <el-button @click="exportTable" size="small">导出</el-button>
            <el-date-picker
                v-model="checkDate"
                type="datetimerange"
                @change="changeDate"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                size="small"
                align="right">
            </el-date-picker>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <template slot="photo" slot-scope="props">
                <el-popover ref="popover1" placement="top" width="450">
                    <div>
                        <img :src="props.data.photo" />
                    </div>
                </el-popover>
                <img :src="props.data.photo" v-popover:popover1 />
            </template>
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
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small" v-popover:popover>删除</el-button>
                    </template>
                </el-table-column>
            </p>
        </TableInfo>
        <FormModal :dataSource="formData" :initValue="initValue" @closeDialog="closeDialog" @confirm="ruleCheck" :tableName="TABLE_NAME"
            :visible="visible" slot="form-modal" />
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    import { format as formatDate } from 'Utils/date';
    const TABLE_NAME = 'truckDepartCheckRecord';
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
                checkDate: [thisDate, new Date()]
            }
        },
        mounted() {
            this.tableName = TABLE_NAME;
            this.queryTable(this.formatTableParam(this.checkDate));
        },
        methods: {
            // 校验规则维护
            ruleCheck(data, tableName) { // &sDate=20180101&eDate=20181231
                this.visible = false;
                console.error('data', data);
                this.busRecheckTable();
            },
            formatTableParam (dateArr) {
                return {
                    table: this.TABLE_NAME,
                    sDate: this.formatDate(dateArr[0]),
                    eDate: this.formatDate(dateArr[1])
                };
            },
            changeDate (date) {
                this.queryTable(this.formatTableParam(date));
            },

            formatDate (date) {
                return formatDate(date, 'YYYYMMDD');
            }
        }
    }

</script>
