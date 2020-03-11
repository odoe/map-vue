<template>
    <button v-on:click="authenticate" class="bg-purple-500 hover:bg-purple-300 text-white py-2 px-4 rounded">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <svg class="fill-current w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path
                    fill="#fff"
                    d="M3 11.5V15h10v-3.5A3.504 3.504 0 0 0 9.5 8h-3A3.504 3.504 0 0 0 3 11.5zM6.5 9h3a2.503 2.503 0 0 1 2.5 2.5V14H4v-2.5A2.503 2.503 0 0 1 6.5 9zm4.3-5A2.8 2.8 0 1 0 8 6.8 2.803 2.803 0 0 0 10.8 4zM6.133 4A1.867 1.867 0 1 1 8 5.867 1.869 1.869 0 0 1 6.133 4z"
                />
                <path fill="none" d="M0 0h16v16H0z" />
            </svg>
            <span class="text-xl tracking-tight">{{ label }}</span>
        </div>
    </button>
</template>

<script lang="ts">
import { appId, portalUrl } from '../config';
import { checkCurrentStatus, initialize, signIn, signOut } from '../data/auth';
import store from '../store/store';

export default {
    name: 'Auth',
    // Lifecycle
    async beforeMount() {
        await initialize(appId, portalUrl);
        const cred = await checkCurrentStatus();
        if (cred) {
            store.dispatch('authenticate', cred);
        }
    },
    // Properties
    computed: {
        authenticated() {
            return Boolean(store.state.credential);
        },
        label() {
            return Boolean(store.state.credential) ? 'Sign Out' : 'Sign In';
        }
    },
    // Public Methods
    methods: {
        async authenticate() {
            if (!this.authenticated) {
                const cred = await signIn();
                store.dispatch('authenticate', cred);
            } else {
                await signOut();
                store.dispatch('authenticate', null);
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
