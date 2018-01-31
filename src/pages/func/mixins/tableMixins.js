import {
    insertTableRow,
    deleteTableRow,
    tableSelect,
    updateTableRow,
    queryRacingTeam,
    querySign,
    queryletter,
    busRecheck,
    tableExport,
    signTableExport
} from '../../../api/table';
import { format } from 'Utils/date';
import { EDITOR_TYPE, NOT_INIT } from 'Utils/constants';
export default {
    data() {
        return {
            tableName: '', // 表名
            visible: false, // form表单展示与隐藏状态  true 展示  false 隐藏
            columns: [], // 表格列表
            dataSource: [], // 表格数据列表
            dataSourceDetail: [],
            columnsDetail: [],
            formData: [], // 表单数据
            initValue: {}, // 更新表格时的
            popoverValue: '', // 确认框状态
            recordId: '', // 当前操作的行记录id
            motorcadeList: [], //  车队列表
            motorcadeFormData: [],
            signColumns: [], // 签到表格
            signDataSource: [], // 签到数据
            tempName: '',
            motorcadeSelect: '' // 选中的车队id
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (NOT_INIT.indexOf(this.tableName) === -1) {
                this.tableName && this.queryTable({
                    table: this.tableName
                });
            }
        })

    },
    methods: {
        // 查询表格
        queryTable(params) {
            tableSelect(params)
                .then(res => {
                    this.columns = this.adapterColumns(res.headList);
                    this.formData = this.adapterForm(res.headList);
                    this.dataSource = res.contentList;
                })
                .catch(err => {
                    console.log(err)
                });
        },
        queryDetailTable(params) {
            tableSelect(params)
            .then(res => {
                this.columnsDetail = this.adapterColumns(res.headList);
                this.dataSourceDetail = res.contentList;
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
                let tempPo = {
                    prop: item.headId,
                    label: item.headName,
                    width: item.width * 10,
                    filters: item.colFilters,
                    minWidth: 0
                };
                if (item.headId === 'photo' || item.headId === 'content' || item.headId === 'sign' || item.headId === 'signImage' || item.headId === 'finishRate' || item.headId === 'roadLicensePic' || item.headId === 'businessLicensePic') { // photo 需要图片展示  content 内容展示 sign 签字
                    tempPo.render = true;
                }
                if (item.editorType === 'photo') {
                    tempPo.render = true;
                }
                return tempPo;
            });
        },
        // 适配表单数据格式
        adapterForm(data) {
            return data.filter((item) => (item.visible)).map((item) => {
                let po = {
                    key: item.headId,
                    name: item.headName,
                    type: EDITOR_TYPE[item.editorType],
                    enum: this.getEnum(item.selectValue)
                }
                if (item.headId === 'operator') { // 操作员不可编辑
                    po.disabled = true;
                }
                return po;
            })
        },
        // 获取枚举值
        getEnum(data) {
            if (!data) {
                return;
            }
            return (data.split(';') || []).map(item => {
                return {
                    key: item.split(':')[0],
                    value: item.split(':')[1]
                }
            })
        },
        // 添加表格记录
        createRecord(tableName) {
            this.visible = true;
            this.initValue = {}; // 在新增时,清空数据
        },
        // 更新表格记录
        updateRecord(data) {
            this.initValue = data;
            this.recordId = data.id;
            this.visible = true;
        },
        // 询问是否要删除此记录
        showPopover(id) {
            this.popoverValue = id;
        },
        // 删除表格记录
        deleteRecord(row, name) {
            this.clearPopoverStatus();
            this.queryRepeat(deleteTableRow(row.id, name)
                .then(res => {})
                .catch(err => {
                    console.log(err)
                }));
        },
        // 导出表格
        exportTable() {
            tableExport({
                table: this.tableName
            });
        },
        // 导出签到表
        exportData(id) {
            signTableExport(id)
        },
        // 关闭对话框
        closeDialog() {
            this.visible = false;
        },
        insertRecord(data, tableName) {
            return insertTableRow(data, tableName)
                .then(res => {})
                .catch(err => {
                    console.log(err)
                });
        },
        // 确认提交信息
        confirm(data, tableName) {
            for (let [key, value] of Object.entries(data)) {
                if (key.indexOf('date') === 0 && !value) {
                    this.$message({
                        message: '请完善表单信息~',
                        type: 'warning'
                    });
                    return;
                }
            }
            this.visible = false;
            if (data['endDate']) {
                data.endDate = format(new Date(data.endDate).getTime(), 'YYYY-MM-DD HH:mm:ss');
            }
            if (this.motorcadeSelect) { // 用来添加车辆
                data.motorcadeId = this.motorcadeSelect;
            }
            if (Object.keys(this.initValue).length > 0) { // 更新数据
                data.id = this.recordId;
                this.queryRepeat(updateTableRow(data, tableName));
                return;
            }
            this.queryRepeat(this.insertRecord(data, tableName))
        },
        // 操作后再次查询表格
        queryRepeat(func) {
            let po = {
                table: this.tableName
            }
            this.syncMethod(() => (func))
                .then(res => {
                    if (this.motorcadeSelect) {
                        po.motorcadeId = this.motorcadeSelect
                    }
                    this.queryTable(po);
                })
        },
        // 同步请求操作方法
        syncMethod(func) {
            return new Promise((resolve, reject) => {
                resolve(func())
            })
        },
        // 获取车队列表
        getRacingTeam() {
            queryRacingTeam()
            .then(res => {
                this.motorcadeList = res.contentList;
                this.motorcadeFormData = this.adapterForm(res.headList);
            })
        },
        // 查询签到表
        querySignTable(id) {
            querySign(id)
            .then(res => {
                this.signColumns = this.adapterColumns(res.headList);
                this.signDataSource = res.contentList;
            })
        },
        // 查询责任状
        queryLetterTable(id) {
            queryletter(id)
            .then(res => {
                this.signColumns = this.adapterColumns(res.headList);
                this.signDataSource = res.contentList;
            })
        },
        busRecheckTable(param) {
            busRecheck(param)
            .then(res => {
                this.signColumns = this.adapterColumns(res.headList);
                this.signDataSource = res.contentList;
            })
        },
        // 统计查询
        changeDate(date) {
            this.queryTable({
                table: this.TABLE_NAME,
                sDate: this.formatDate(date[0]),
                eDate: this.formatDate(date[1])
            });
        },
        // 格式化时间
        formatDate(date) {
            return format(date, 'YYYYMMDD');
        }
    }
}
