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
