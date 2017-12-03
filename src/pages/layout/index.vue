<template>
    <div class="layout clearfix">
        <nav class="nav">
            <div class="img">
                <slot name="img"></slot>
            </div>
            <div class="menu">
                <slot name="nav"></slot>
            </div>
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
