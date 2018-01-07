<template>
    <Layout>
        <div slot="operate">
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <template slot="businessLicensePic" slot-scope="props">
                <el-popover ref="popover1" placement="top" width="450">
                    <div>
                        <img :src="props.data.businessLicensePic" />
                    </div>
                </el-popover>
                <img :src="props.data.businessLicensePic" v-popover:popover1 width="100" height="50" />
            </template>
            <template slot="roadLicensePic" slot-scope="props">
                <el-popover ref="popover2" placement="top" width="450">
                    <div>
                        <img :src="props.data.roadLicensePic" />
                    </div>
                </el-popover>
                <img :src="props.data.roadLicensePic" v-popover:popover2 width="100" height="50" />
            </template>
            <p slot="operate">
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-popover ref="popover" placement="top" width="160" :value="getPopoverStatus(scope.row.id)">
                            <p>您确定认证吗?</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="clearPopoverStatus">取消</el-button>
                                <el-button type="primary" size="mini" @click="auth(scope.row.id)">确定</el-button>
                            </div>
                        </el-popover>
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small" v-popover:popover :disabled="getAuthStatus(scope.row)">{{getAuthStatus(scope.row) ? '已认证' : '认证'}}</el-button>
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
    import {authOffical} from '../../../api/user';
    const TABLE_NAME = 'officalManage';
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
            // 重置密码
            auth(id) {
                this.clearPopoverStatus();
                authOffical(id)
                    .then(res => {
                        this.$message({
                            message: '认证成功~',
                            type: 'success'
                        });
                        this.queryTable(this.tableName);
                    })
                    .catch(err => {
                        this.$message({
                            message: '认证失败~',
                            type: 'warning'
                        });
                    })
            },
            // 获取认证状态
            getAuthStatus(data) {
                return data.checkOrNot.indexOf('已') > -1;
            }
        }
    }

</script>
