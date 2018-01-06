<template>
    <Editor id="weatherNotice" content="props.data.content" serverUrl="" imageUrl="" imageAccess="" />
</template>
<script>
import Editor from 'Components/editor/index';
    export default {
        components: {
            Editor
        }
    }

</script>
