<template>
    <div class="home">
        <Layout>
            <PageMenu slot="nav" />
            <!--
            <img src="../../assets/images/avatar.jpg" slot="img" />
            -->
            <PageHeader slot="header">
            </PageHeader>
            <router-view slot="content"></router-view>
            <div slot="footer" class="footer">
                <span class="footer-title">Copyright&nbsp;©&nbsp;2004&nbsp;-&nbsp;2018&nbsp;&nbsp;智慧先齐&nbsp;版权所有</span>
                <span class="footer-title">联系方式：1351234567</span>
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37010302000590" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                    <img src="../../assets/images/beian.png" style="float:left;"/>
                    <p class="footer-title">鲁公网安备 37010302000590号</p>
                </a>
            </div>
        </Layout>
    </div>
</template>
<script>
    import Layout from '../layout/index';
    import PageMenu from '../menu/index';
    import PageHeader from '../header/index';
    import {
        login
    } from '../../api/login';
    export default {
        components: {
            PageMenu,
            Layout,
            PageHeader
        },
        mounted() {
            login()
                .then(res => {
                    console.log('登录成功');
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

</script>
