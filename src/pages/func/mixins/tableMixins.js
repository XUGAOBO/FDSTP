export default {
    data () {
        return {
            visible: false  // form表单展示与隐藏状态  true 展示  false 隐藏
        }
    },
    methods: {
        // 更新表格记录
        updateRecord(data) {
            console.error('data', data);
            this.visible = true;
        },
        // 删除表格记录
        deleteRecord(data) {

        },
        // 关闭对话框
        closeDialog() {
            this.visible = false;
        }
    }
}