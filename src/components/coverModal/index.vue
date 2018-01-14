<template>
    <div class="coverModal">
        <slot name="content"></slot>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }

</script>
