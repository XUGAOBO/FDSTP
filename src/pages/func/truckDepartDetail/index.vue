<template>
    <Layout>
        <div slot="operate">
            <el-date-picker v-model="checkDate" type="datetimerange" @change="changeDate" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" format="yyyy-MM-dd" size="small" align="right">
            </el-date-picker>
            <el-button @click="exportTable" size="small">导出</el-button>
        </div>
        <TableInfo :columns="columns" :dataSource="dataSource" slot="content">
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
        </TableInfo>
        <FormModal :dataSource="formData" :initValue="initValue" @closeDialog="closeDialog" @confirm="confirm" :tableName="TABLE_NAME" :visible="visible" slot="form-modal" />
    </Layout>
</template>
<script>
    import TableInfo from 'Components/table/index';
    import Layout from '../layout/index';
    import mixin from '../mixins/tableMixins';
    import FormModal from 'Components/formModal/index';
    const TABLE_NAME = 'truckDepartCheckRecordDetail';
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
                selectId: '',
                photoColumn: []
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
                this.selectId = id;
            }
        }
    }

</script>
