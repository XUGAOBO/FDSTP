<template>
    <div class="page-menu">
        <el-menu @open="handleOpen" @close="handleClose" :default-openeds="openeds" background-color="#001529"
            text-color="#fff" active-text-color="#33B5FF" :unique-opened="true" :router="true">
            <el-menu-item index="welcome" v-show="hasShow('welcome')">首页</el-menu-item>
            <el-menu-item index="vehicle-info" v-show="hasShow('vehicle-info')">信息录入</el-menu-item>
            <!--
            <el-submenu index="1">
                <span slot="title">车队车辆信息管理</span>
                <el-menu-item index="team-info" :route="route">车队信息</el-menu-item>
                <el-menu-item index="vehicle-info">车辆信息</el-menu-item>
            </el-submenu>
            -->
                <el-menu-item index="train-manage" v-show="hasShow('train-manage')">教育培训</el-menu-item>

            <el-menu-item index="meeting-manage" v-show="hasShow('meeting-manage')">安全会议</el-menu-item>
            <el-menu-item index="order-maintain" v-show="hasShow('order-maintain')">责任状</el-menu-item>
            <!-- <el-submenu index="2">
                <span slot="title">安全教育</span>
            </el-submenu> -->
            <el-menu-item index="weather-notice" v-show="hasShow('weather-notice')">恶劣天气通知</el-menu-item>
            <el-submenu index="4" v-show="hasShow('rules-check') || hasShow('situation-query')">
                <span slot="title">车辆安全检查</span>
                <el-menu-item index="rules-check" v-show="hasShow('rules-check')">设置车检内容</el-menu-item>
                <el-menu-item index="situation-query" v-show="hasShow('situation-query')">车检复查</el-menu-item>
            </el-submenu>
            <el-submenu index="3" v-show="hasShow('study-query-save') || hasShow('study-query') || hasShow('sign-query') || hasShow('weather-query') || hasShow('truckcheck-query') || hasShow('truckcheck-queryDetail')">
                <span slot="title">统计</span>
                <el-menu-item index="study-query-save" v-show="hasShow('study-query-save')">教育培训</el-menu-item>
                <el-menu-item index="study-query" v-show="hasShow('study-query')">安全会议</el-menu-item>
                <el-menu-item index="sign-query" v-show="hasShow('sign-query')">责任状签订</el-menu-item>
                <el-menu-item index="weather-query" v-show="hasShow('weather-query')">恶劣天气</el-menu-item>
                <el-menu-item index="truckcheck-query" v-show="hasShow('truckcheck-query')">车辆检查</el-menu-item>
                <el-menu-item index="truckcheck-queryDetail" v-show="hasShow('truckcheck-queryDetail')">出车记录</el-menu-item>

            </el-submenu>
            <!-- <el-submenu index="5">
                <span slot="title">责任状签订</span>
                
            </el-submenu> -->

                <!--
            <el-submenu index="6">
                <span slot="title">系统设置</span>
                <el-menu-item index="func-maintain">功能权限维护</el-menu-item>
                
                <el-menu-item index="log-query">登录日志查询</el-menu-item>
            </el-submenu>
                -->

            <el-menu-item index="user-manage" v-show="hasShow('user-manage')">管理员-用户管理</el-menu-item>
            <el-menu-item index="offical-certification" v-show="hasShow('offical-certification')">管理员-官方认证</el-menu-item>
            <el-menu-item index="govermentcorpList" v-show="hasShow('govermentcorpList')">公司信息</el-menu-item>
            <el-menu-item index="govermentTraining" v-show="hasShow('govermentTraining')">通知列表</el-menu-item>
            <el-menu-item index="govermentMeeting" v-show="hasShow('govermentMeeting')">会议培训统计</el-menu-item>
            <!--
            <el-submenu index="7">
                <span slot="title">系统设置</span>
                <el-menu-item index="learn-query">学习情况查询</el-menu-item>
                <el-menu-item index="enterprise-list">企业列表</el-menu-item>
            </el-submenu>
            -->
        </el-menu>
    </div>
</template>
<script>
import {
        getAuth
    } from '../../api/user';
    export default {
        data() {
            return {
                route: {
                    name: 'team-info'
                },
                openeds: [1, 2, 3, 4, 5, 6, 7],
                menuList: []
            }
        },
        methods: {
            handleOpen(key, keyPath) {},
            handleClose(key, keyPath) {},
            // 是否展示menu菜单
            hasShow(item) {
                return this.menuList.indexOf(item) > -1;
            }
        },
        mounted () {
            getAuth()
            .then(res => {
                if (res !== '请登录') {
                    this.menuList = res.menuList;
                }
            })
        }
    }

</script>
