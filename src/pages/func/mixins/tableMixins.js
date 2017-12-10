import {
    insertTableRow,
    deleteTableRow
} from '../../../api/table';
const formType = {
    text: 'input'
};
export default {
    data() {
        return {
            visible: false, // form表单展示与隐藏状态  true 展示  false 隐藏
            columns: [], // 表格列表
            dataSource: [], // 表格数据列表
            formData: [], // 表单数据
            popoverValue: '' // 确认框状态
        }
    },
    methods: {
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
            return data.filter((item) => (item.visible)).map((item) => {
                return {
                    key: item.headId,
                    name: item.headName,
                    type: formType[item.editorType]
                }
            });
        },
        // 添加表格记录
        createRecord() {
            console.log('create---');
            this.visible = true;
        },
        // 更新表格记录
        updateRecord(data) {
            console.log('update---');
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
        // 确认提交信息
        confirm(data, tableName) {
            this.visible = false;
            console.error('data', data);
            insertTableRow(data, tableName)
                .then(res => {})
                .catch(err => {
                    console.log(err)
                });
        }
    }
}
