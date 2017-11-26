<template>
    <div class="home">
        <Layout>
            <!--
            <PageMenu slot="nav" />
            <img src="../../assets/images/avatar.jpg" slot="img" />
            <PageHeader slot="header">
            </PageHeader>
            -->
            <router-view slot="content"></router-view>
        </Layout>
    </div>
</template>
<script>
    import Layout from '../layout/index';
    import PageMenu from '../menu/index';
    import PageHeader from '../header/index';
    export default {
        components: {
            PageMenu,
            Layout,
            PageHeader
        }
    }

</script>
