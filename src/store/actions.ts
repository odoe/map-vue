import { ActionTree } from 'vuex';

import { State } from './state';

import { loadPortal, loadPortalLayerItems } from '../data/portal';
import { addLayerItemToMap, removeLayerItemFromMap, view, saveWebMap, openWebMapExternal } from '../data/map';
import { createColorRenderer, createOpacityRenderer } from '../data/smartmapping';

import { portalUrl } from '../config';

interface SmartMappingParams {
    layer: __esri.FeatureLayer;
    field: string;
}

export const actions: ActionTree<State, any> = {
    async authenticate({ commit }, credential: __esri.Credential) {
        commit('credential', credential);
        if (credential) {
            const portal = await loadPortal(portalUrl);
            const { results } = await loadPortalLayerItems(portal);
            commit('portalItems', results);
        }
        return;
    },
    addItemToMap({}, item: __esri.PortalItem) {
        addLayerItemToMap(item);
    },
    removeItemFromMap({}, item: __esri.PortalItem) {
        removeLayerItemFromMap(item);
    },
    async colorRenderer({}, { layer, field }: SmartMappingParams) {
        const { renderer } = await createColorRenderer({ view, layer, field });
        layer.renderer = renderer;
    },
    async opacityRenderer({}, { layer, field }: SmartMappingParams) {
        const { renderer } = await createOpacityRenderer({ view, layer, field });
        layer.renderer = renderer;
    },
    async saveWebMap({ commit }) {
        await saveWebMap('Awesome WebMap');
        commit('webmapSaved');
    },
    openWebMap() {
        openWebMapExternal();
    }
};
