export default {
    data () {
        return {
            visible: false,  // form表单展示与隐藏状态  true 展示  false 隐藏
            columns: [],  // 表格列表
            dataSource: [] // 表格数据列表
        }
    },
    methods: {
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
        // 删除表格记录
        deleteRecord(data) {
            console.log('delete---');
        },
        // 导出表格
        exportTable() {
            console.log('export---');
        },
        // 关闭对话框
        closeDialog() {
            this.visible = false;
        }
    }
}