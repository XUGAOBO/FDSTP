<template>
    <Layout>
        <div slot="operate">
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <p slot="operate">
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-popover ref="popover" placement="top" width="160" :value="getResetStatus(scope.row.id)">
                            <p>您确定要重置 <span style="color: #f10215">{{scope.row.name}}</span> 的密码？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="popoverValueStatus = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="resetPassword(scope.row.id)">确定</el-button>
                            </div>
                        </el-popover>
                        <el-button @click="updateRecord(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small" v-popover:popover>重置密码</el-button>
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
    import {resetPass} from '../../../api/user';
    const TABLE_NAME = 'userManage';
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
                popoverValueStatus: ''
            }
        },
        mounted() {
            this.tableName = TABLE_NAME;
        },
        methods: {
            showPopover(id) {
                this.popoverValueStatus = id;
            },
            getResetStatus(id) {
                return this.popoverValueStatus === id;
            },
            // 重置密码
            resetPassword(id) {
                resetPass(id)
                    .then(res => {
                        this.$message({
                            message: '重置密码成功~',
                            type: 'success'
                        });
                        this.popoverValueStatus = '';
                    })
                    .catch(err => {
                        this.$message({
                            message: '重置密码失败~',
                            type: 'warning'
                        });
                        this.popoverValueStatus = '';
                    })
            }
        }
    }

</script>
