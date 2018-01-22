<template>
    <Layout>
        <div slot="operate">
            <el-select v-model="motorcadeSelect" placeholder="请选择" size="small">
                <el-option v-for="item in motorcadeList" :key="item.id" :label="item.motorcadeName" :value="item.id">
                </el-option>
            </el-select>
            <el-button @click="createMotorcade" size="small">新增车队</el-button>
            <el-button @click="deleteMotorcade" size="small">删除车队</el-button>
            <el-button @click="createRecord" size="small">新增车辆</el-button>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <p slot="operate">
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-popover ref="popover" placement="top" width="160" :value="getPopoverStatus(scope.row.id)">
                            <p>您确定删除吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="clearPopoverStatus">取消</el-button>
                                <el-button type="primary" size="mini" @click="deleteRecord(scope.row, TABLE_NAME)">确定</el-button>
                            </div>
                        </el-popover>
                        <el-button @click="updateRecord(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="showPopover(scope.row.id)" type="text" size="small" v-popover:popover>删除</el-button>
                    </template>
                </el-table-column>
            </p>
        </TableInfo>
        <FormModal :dataSource="formData" :initValue="initValue" @closeDialog="closeDialog" @confirm="confirm" :tableName="TABLE_NAME"
            :visible="visible" slot="form-modal" />
        <FormModal :dataSource="motorcadeFormData" @closeDialog="formVisible = false" @confirm="confirmMotorcade" tableName="motorcade"
            :visible="formVisible" slot="motorcade" />
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    const TABLE_NAME = 'truck';
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
                formVisible: false
            }
        },
        mounted() {
            this.tableName = TABLE_NAME;
            this.getRacingTeam();
        },
        watch: {
            motorcadeList(val) {
                if (!this.motorcadeSelect && val && val.length > 0) {
                    this.motorcadeSelect = val[0].id;
                }
            },
            motorcadeSelect(val) {
                this.queryTable({
                    table: this.tableName,
                    motorcadeId: val
                });
            }
        },
        methods: {
            createMotorcade() {
                this.formVisible = true;
                this.initValue = {}; // 在新增时,清空数据
            },
            confirmMotorcade(data) {
                for (let value of Object.values(data)) {
                    if (!value) {
                        this.$message({
                            message: '请完善表单信息~',
                            type: 'warning'
                        });
                        return;
                    }
                }
                this.formVisible = false;
                this.insertRecord(data, 'motorcade')
                    .then(res => {
                        this.$message({
                            message: '车队添加成功~',
                            type: 'success'
                        });
                        this.getRacingTeam();
                    })
            },
            deleteMotorcade() {
                this.$router.push('team-info');
            }
        }
    }

</script>
