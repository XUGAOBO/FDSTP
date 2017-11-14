<template>
    <div class="home">
        <Layout>
            <PageMenu slot="nav" />
            <header slot="header" />
            <div slot="content">
                <router-view></router-view>
            </div>
        </Layout>
    </div>
</template>
<script>
    import Layout from '../layout/index';
    import Editor from 'Components/editor/index';
    import PageMenu from '../menu/index';
    import TestTable from 'Components/table/index';
    export default {
        components: {
            Editor,
            PageMenu,
            TestTable,
            Layout
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
