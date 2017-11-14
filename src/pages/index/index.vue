<template>
    <div class="home">
        <Layout>
            <PageMenu slot="nav" />
            <PageHeader slot="header">   
            </PageHeader>
            <div slot="content">
                <router-view></router-view>
            </div>
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
