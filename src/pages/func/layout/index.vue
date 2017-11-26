<template>
    <div class="func clearfix">
        <div class="func-operate">
            <slot name="operate"></slot>
        </div>
        <div class="func-content">
            <div class="func-wrapper">
                <slot name="content"></slot>
            </div>
        </div>
        <slot name="form-modal"></slot>
    </div>
</template>
<script>
    import mixin from '../mixins/tableMixins';
    export default {
        mixins: [mixin],
        mounted() {}
    }

</script>
