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
        <Table />
         -->
         <div class="nav">
             <PageMenu />
         </div>
    </div>
</template>
<script>
    import Editor from 'Components/editor/index';
    import PageMenu from '../menu/index';
    export default {
        components: {
            Editor,
            PageMenu
        },
        data() {
            return {
                visible: false,
                content: 'aaaaaa',
                isAppendTo: false
            }
        },
        methods: {
            getContent(data) {},
            click() {
                this.isAppendTo = true;
                this.content = 'bbbbbbbbbb'
            }
        }
    }

</script>
