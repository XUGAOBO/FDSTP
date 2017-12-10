<template>
    <Layout>
        <div slot="operate">
            <el-button @click="createRecord" size="small">新增</el-button>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
            <p slot="name" slot-scope="props">
                <span>hello world</span>
                <span>{{props.data.name}}</span>
            </p>
            <p slot="operate">
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="updateRecord(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="deleteRecord(scope.row, TABLE_NAME)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </p>
        </TableInfo>
        <FormModal :dataSource="formData" @closeDialog="closeDialog" @confirm="confirm" :tableName="TABLE_NAME" :visible="visible" slot="form-modal" />
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    import {
        tableSelect
    } from '../../../api/table';
    const TABLE_NAME = 'training';
    export default {
        mixins: [mixin],
        components: {
            TableInfo,
            FormModal,
            Layout
        },
        data() {
            return {
                TABLE_NAME
            }
        },
        mounted() {
            tableSelect(TABLE_NAME)
                .then(res => {
                    this.columns = this.adapterColumns(res.headList);
                    this.formData = this.adapterForm(res.headList);
                    this.dataSource = res.contentList;
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

</script>
