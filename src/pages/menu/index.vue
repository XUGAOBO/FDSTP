<template>
    <div class="page-menu">
        <el-menu @open="handleOpen" @close="handleClose" :default-openeds="openeds" :router="isRouter" 
        background-color="#33B5FF" text-color="#fff" active-text-color="#fff">
            <el-submenu index="1">
                <span slot="title">车队车辆信息管理</span>
                <el-menu-item index="team-info" :route="route">车队信息</el-menu-item>
                <el-menu-item index="vehicle-info">车辆信息</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <span slot="title">安全教育</span>
                <el-menu-item index="train-manage">教育培训</el-menu-item>
                <el-menu-item index="meeting-manage">安全会议</el-menu-item>
                <el-menu-item index="weather-notice">恶劣天气通知</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <span slot="title">车辆安全检查</span>
                <el-menu-item index="rules-check">设置车检内容</el-menu-item>
                <el-menu-item index="situation-query">车检复查</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <span slot="title">学习统计</span>
                <el-menu-item index="study-query">学习记录查询</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <span slot="title">责任状签订</span>
                <el-menu-item index="order-maintain">责任状维护</el-menu-item>
                <el-menu-item index="sign-query">签订状况查询</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <span slot="title">系统设置</span>
                <el-menu-item index="user-manage">用户管理</el-menu-item>
                <el-menu-item index="offical-certification">官方认证</el-menu-item>
                <el-menu-item index="func-maintain">功能权限维护</el-menu-item>
                <el-menu-item index="log-query">登录日志查询</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <span slot="title">系统设置</span>
                <el-menu-item index="learn-query">学习情况查询</el-menu-item>
                <el-menu-item index="enterprise-list">企业列表</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                route: {
                   name: 'team-info'
                },
                isRouter: true,
                openeds: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            }
        }
    }

</script>
