<template>
    <div class="portal-items w-1/4 mb-2 border-solid border-grey-light rounded border shadow-sm">
        <div class="bg-purple-700 text-white px-2 py-3 border-solid border-grey-light border-b">
            Living Atlas
        </div>
        <div class="w-full p-1">
            <div class="portal-items overflow-auto max-w-xs">
                <div v-for="item of items" v-bind:key="item.id">
                    <portal-item :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import PortalItem from './PortalItem.vue';
import store from '../store/store';

export default {
    name: 'PortalItems',
    components: { PortalItem },
    data: () => ({
        items: store.state.portalItems
    })
};
</script>

<style lang="scss" scoped>
.portal-items {
    max-height: 85vh;
}
</style>
