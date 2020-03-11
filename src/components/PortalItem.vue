<template>
    <t-card
        class="portal-card max-w-xs"
        header-class="px-6 py-3 text-l border-b truncate"
        footer-class="px-3 py-3 border-t"
        v-bind:header="item.title || item.name"
    >
        <img class="w-full" v-bind:src="item.thumbnailUrl" alt="Sunset in the mountains" />
        <template v-slot:footer>
            <div class="flex items-baseline justify-end">
                <t-button size="sm" class="mr-2" variant="success" v-on:click="addItem">Add</t-button>
                <t-button size="sm" class="mr-2" variant="danger" v-on:click="removeItem">Remove</t-button>
            </div>
        </template>
    </t-card>
</template>

<script lang="ts">
import store from '../store/store';

export default {
    name: 'PortalItem',
    props: ['item'],
    methods: {
        addItem() {
            store.dispatch('addItemToMap', this.item);
        },
        removeItem() {
            store.dispatch('removeItemFromMap', this.item);
        }
    }
};
</script>

<style lang="scss" scoped></style>
