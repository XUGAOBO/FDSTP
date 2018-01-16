<template>
    <Layout>
        <div slot="operate">
            <el-date-picker v-model="checkDate" type="datetimerange" @change="changeDate" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" format="yyyy-MM-dd" size="small" align="right">
            </el-date-picker>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <!-- <template :slot="column" slot-scope="props" v-for="(column, index) in photoColumn">
                <el-popover :ref="index" placement="top" width="450">
                    <div>
                        <img :src="props.data[column]" />
                    </div>
                </el-popover>
                <img :src="props.data[column]" :popover="0"/>
            </template> -->
            <template :slot="0" slot-scope="props" v-if="0 < photoColumn.length">
                <el-popover ref="0" placement="top" width="450">
                    <div>
                        <img :src="props.data[0]" />
                    </div>
                </el-popover>
                <img :src="props.data[0]" v-popover:0 />
            </template>
            <template :slot="1" slot-scope="props" v-if="1 < photoColumn.length">
                <el-popover ref="1" placement="top" width="450">
                    <div>
                        <img :src="props.data[1]" />
                    </div>
                </el-popover>
                <img :src="props.data[1]" v-popover:1 />
            </template>
            <template :slot="2" slot-scope="props" v-if="2 < photoColumn.length">
                <el-popover ref="2" placement="top" width="450">
                    <div>
                        <img :src="props.data[2]" />
                    </div>
                </el-popover>
                <img :src="props.data[2]" v-popover:2 />
            </template>
            <template :slot="3" slot-scope="props" v-if="3 < photoColumn.length">
                <el-popover ref="3" placement="top" width="450">
                    <div>
                        <img :src="props.data[3]" />
                    </div>
                </el-popover>
                <img :src="props.data[3]" v-popover:3 />
            </template>
            <template :slot="4" slot-scope="props" v-if="4 < photoColumn.length">
                <el-popover ref="4" placement="top" width="450">
                    <div>
                        <img :src="props.data[4]" />
                    </div>
                </el-popover>
                <img :src="props.data[4]" v-popover:4 />
            </template>
            <template :slot="5" slot-scope="props" v-if="5 < photoColumn.length">
                <el-popover ref="5" placement="top" width="450">
                    <div>
                        <img :src="props.data[5]" />
                    </div>
                </el-popover>
                <img :src="props.data[5]" v-popover:5 />
            </template>
            <p slot="operate">
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-popover ref="popover" placement="top" width="360" :value="getPopoverStatus(scope.row.id)">
                            <p style="marginBottom: 30px">请输入退回原因</p>
                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reason">
                            </el-input>
                            <div style="text-align: right; margin: 0; marginTop: 30px">
                                <el-button size="mini" type="text" @click="clearPopoverStatus">取消</el-button>
                                <el-button type="primary" size="mini" @click="submitBusCheck(false, scope.row.id)">确定</el-button>
                            </div>
                        </el-popover>
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small" v-popover:popover>退回</el-button>
                        <el-button @click="submitBusCheck(true, scope.row.id)" type="text" size="small">确认</el-button>
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
    import {
        busRecheck
    } from '../../../api/table';
    import FormModal from 'Components/formModal/index';
    import {
        format as formatDate
    } from 'Utils/date';
    import cache from 'Utils/cache';
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
                checkDate: [thisDate, new Date()],
                photoColumn: [],
                reason: ''
            }
        },
        watch: {
            columns(data) {
                const photos = data.filter(item => {
                    return item.prop.match(/\d/)
                });
                this.photoColumn = photos.map(item => item.prop);
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
            formatTableParam(dateArr) {
                return {
                    table: this.TABLE_NAME,
                    sDate: this.formatDate(dateArr[0]),
                    eDate: this.formatDate(dateArr[1])
                };
            },
            changeDate(date) {
                this.queryTable(this.formatTableParam(date));
            },
            submitBusCheck(confirm, rowId) {
                const {
                    reason = ''
                } = this;
                if (!confirm && !reason) {
                    this.$message.error('请输入退回原因');
                    return;
                }
                this.clearPopoverStatus();
                const operator = cache.session.get('operator');
                const param = `operator=${operator}&id=${rowId}&checkMsg=${reason}`;
                busRecheck(param).then(data => {
                    if (data === 1) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        })
                    } else {
                        this.$message.error('操作失败，请重试');
                    }
                    this.reason = '';
                    this.queryTable(this.formatTableParam(this.checkDate));
                });

            },
            formatDate(date) {
                return formatDate(date, 'YYYYMMDD');
            }
        }
    }

</script>
