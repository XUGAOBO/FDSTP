<template>
    <div class="layout clearfix">
        <nav class="nav">
            <slot name="nav"></slot>
        </nav>
        <div class="container">
            <header class="header">
                <slot name="header"></slot>
            </header>
            <section class="content">
                <slot name="content"></slot>
            </section>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
