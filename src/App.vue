<template>
    <div class="page-container">
        <Header :app-title="title" />
        <section class="app-container">
            <portal-items />
            <web-map />
            <smart-mapping />
        </section>
    </div>
</template>

<script lang="ts">
import Header from './components/Header.vue';
import WebMap from './components/WebMap.vue';
import PortalItems from './components/PortalItems.vue';
import SmartMapping from './components/SmartMapping.vue';

import { title } from './config';
import store from './store/store';

export default {
    name: 'App',
    components: { Header, PortalItems, WebMap, SmartMapping },
    data: () => ({
        title,
        items: store.state.portalItems
    }),
    async mounted() {
        const { webmap } = await import('./data/map');
        webmap.layers.on('change', () => {
            store.commit('updateLayers');
        });
    }
};
</script>

<style lang="scss" scoped>
.page-container {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
.app-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}
</style>
