import {
    insertTableRow,
    deleteTableRow,
    tableSelect
} from '../../../api/table';
const formType = {
    text: 'input'
};
export default {
    data() {
        return {
            tableName: '', // 表名
            visible: false, // form表单展示与隐藏状态  true 展示  false 隐藏
            columns: [], // 表格列表
            dataSource: [], // 表格数据列表
            formData: [], // 表单数据
            initValue: {}, // 更新表格时的
            popoverValue: '' // 确认框状态
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.tableName && this.queryTable(this.tableName);
        })

    },
    methods: {
        // 查询表格
        queryTable(tableName) {
            tableSelect(tableName)
            .then(res => {
                this.columns = this.adapterColumns(res.headList);
                this.formData = this.adapterForm(res.headList);
                this.dataSource = res.contentList;
            })
            .catch(err => {
                console.log(err)
            });
        },
        // 获取确认框状态
        getPopoverStatus(id) {
            return this.popoverValue === id;
        },
        // 清空确认框状态
        clearPopoverStatus() {
            this.popoverValue = '';
        },
        // 适配表格列
        adapterColumns(data) {
            return data.map((item) => {
                return {
                    prop: item.headId,
                    label: item.headName,
                    width: item.width * 10
                }
            });
        },
        // 适配表单数据格式
        adapterForm(data) {
            // TODO 展示单词有错误 需要后台修改
            return data.filter((item) => (item.visiable)).map((item) => {
                return {
                    key: item.headId,
                    name: item.headName,
                    type: formType[item.editorType]
                }
            })
        },
        // 添加表格记录
        createRecord() {
            console.log('create---');
            this.visible = true;
        },
        // 更新表格记录
        updateRecord(data) {
            this.initValue = data;
            this.visible = true;
        },
        // 询问是否要删除此记录
        showPopover(id) {
            this.popoverValue = id;
        },
        // 删除表格记录
        deleteRecord(row, name) {
            this.clearPopoverStatus();
            deleteTableRow(row.id, name)
                .then(res => {})
                .catch(err => {
                    console.log(err)
                });
        },
        // 导出表格
        exportTable() {
            console.log('export---');
        },
        // 关闭对话框
        closeDialog() {
            this.visible = false;
        },
        insertRecord(data, tableName) {
            insertTableRow(data, tableName)
            .then(res => {})
            .catch(err => {
                console.log(err)
            });
        },
        // 确认提交信息
        confirm(data, tableName) {
            this.visible = false;
            if (Object.keys(this.initValue).length > 0) { // 更新数据
                deleteTableRow(this.initValue.id, tableName)
                .then(res => {
                    this.insertRecord(data, tableName);
                })
                .catch(err => {
                    console.log(err)
                });
                return;
            }
            this.insertRecord(data, tableName);
        }
    }
}
