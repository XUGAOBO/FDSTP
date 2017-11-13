<template>
    <div class="home">
        <!--
        <Editor 
            id="test1"
            :content="content"
            serverUrl="" 
            imageUrl="" 
            imageAccess="" 
            height=500
            :isAppendTo="isAppendTo"
            @get-content="getContent"
        />
        -->
        <TestTable :columns="columns" :dataSource="dataSource">
            <p slot="name" slot-scope="props">
                <span>{{props.data.name}}</span>
            </p>
            <p slot="operate">
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </p>
        </TestTable>
        <div class="nav">
            <!--
            <PageMenu />
            -->
        </div>
        <div class="container">
            <div class="header"></div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import Editor from 'Components/editor/index';
    import PageMenu from '../menu/index';
    import TestTable from 'Components/table/index';
    export default {
        components: {
            Editor,
            PageMenu,
            TestTable
        },
        data() {
            return {
                visible: false,
                content: 'aaaaaa',
                isAppendTo: false,
                columns: [{
                    prop: 'date',
                    label: '日期',
                    width: 180
                }, {
                    prop: 'name',
                    label: '姓名',
                    width: 250,
                    render: true
                }, {
                    prop: 'province',
                    label: '省份',
                    width: 180
                }, {
                    prop: 'city',
                    label: '城市',
                    width: 180
                }, {
                    prop: 'address',
                    label: '住址',
                    width: 250
                }, {
                    prop: 'zip',
                    label: '邮编',
                    width: 180
                }],
                dataSource: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        },
        methods: {
            getContent(data) {},
            click() {
                this.isAppendTo = true;
                this.content = 'bbbbbbbbbb'
            },
            handleClick(row) {
                console.log(row);
            }
        }
    }

</script>
