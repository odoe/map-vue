<template>
    <nav class="flex items-center justify-between flex-wrap bg-purple-700 p-2">
        <span class="font-semibold text-xl tracking-tight text-white" ref="title">{{ appTitle }}</span>
        <Auth />
    </nav>
</template>

<script lang="ts">
import Auth from './Auth.vue';

export default {
    name: 'Header',
    components: { Auth },
    props: {
        appTitle: {
            type: String,
            default: 'Header'
        }
    }
};
</script>

<style lang="scss" scoped></style>
