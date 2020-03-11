<template>
    <transition>
        <div
            class="smart-mapping w-1/4 bg-gray md:bg-gray px-2 text-center pin-b md:pt-8 md:pin-t md:pin-l h-16 md:h-screen md:border-r-4 md:border-grey-dark"
        >
            <div class="w-full mb-2 md:relative mx-auto lg:float-right">
                <span class="w-full mb-2 font-semibold text-xl text-purple-900">Smart Mapping</span>
                <select
                    v-model="selected"
                    v-on:change="loadFields"
                    class="block w-full mb-2 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option disabled value="">Select a layer</option>
                    <option v-for="layer of layers" v-bind:key="layer.id" :value="layer.id">
                        {{ layer.title }}
                    </option>
                </select>

                <!-- Color -->
                <div class="w-full mb-2 border-solid border-grey-light rounded border shadow-sm">
                    <div class="bg-purple-700 text-white px-2 py-3 border-solid border-grey-light border-b">
                        Color
                    </div>
                    <div class="w-full p-3">
                        <select
                            v-if="fields.length > 0"
                            v-model="selectedColorField"
                            v-on:change="changeColor"
                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option disabled value="">Select Color field</option>
                            <option v-for="field of fields" v-bind:key="field.name + '-color'" :value="field.name">
                                {{ field.alias }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Opacity -->
                <div class="w-full mb-2 border-solid border-grey-light rounded border shadow-sm">
                    <div class="bg-purple-700 text-white px-2 py-3 border-solid border-grey-light border-b">
                        Opacity
                    </div>
                    <div class="w-full p-3">
                        <select
                            v-if="fields.length > 0"
                            v-model="selectedOpacityField"
                            v-on:change="changeOpacity"
                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option disabled value="">Select Opacity field</option>
                            <option v-for="field of fields" v-bind:key="field.name + '-opacity'" :value="field.name">
                                {{ field.alias }}
                            </option>
                        </select>
                    </div>
                </div>

                <t-button
                    class="w-full mb-1"
                    variant="secondary"
                    :disabled="layers.length < 1"
                    :aria-disabled="layers.length < 1"
                    v-on:click="saveMap"
                    >Save</t-button
                >
                <div v-if="state.state === 'saving'" class="loader">Loading...</div>
                <t-button class="w-full mb-1" variant="tertiary" v-if="state.webmapSaved" v-on:click="openWebMap"
                    >Open WebMap</t-button
                >
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import store from '../store/store';
import { isNumericField, isRenter, isSelected } from '../utils/helpers';

export default {
    name: 'SmartMapping',
    data: () => ({
        show: true,
        layers: store.state.layers,
        selected: '',
        selectedColorField: '',
        selectedOpacityField: '',
        fields: [],
        state: store.state
    }),
    methods: {
        loadFields() {
            this.fields.length = 0;
            const layer = this.layers.find(isSelected(this.selected));
            if (layer.fields) {
                this.fields = layer.fields.filter(isNumericField).filter(isRenter);
            }
        },
        changeColor() {
            const layer = this.layers.find(isSelected(this.selected));
            const field = this.selectedColorField;
            store.dispatch('colorRenderer', { layer, field });
        },
        changeOpacity() {
            const layer = this.layers.find(isSelected(this.selected));
            const field = this.selectedOpacityField;
            store.dispatch('opacityRenderer', { layer, field });
        },
        saveMap() {
            store.commit('saving');
            store.dispatch('saveWebMap');
        },
        openWebMap() {
            store.dispatch('openWebMap');
        }
    }
};
</script>

<style lang="scss" scoped>
.smart-mapping {
    max-height: 90vh;
}
/* animations */
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
.loader,
.loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
}
.loader {
    max-height: 50px;
    max-width: 50px;
    margin: 20px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(159, 122, 234, 0.2);
    border-right: 1.1em solid rgba(159, 122, 234, 0.2);
    border-bottom: 1.1em solid rgba(159, 122, 234, 0.2);
    border-left: 1.1em solid #6b46c1;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
