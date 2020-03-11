import { MutationTree } from 'vuex';

import { State } from './state';
import { webmap } from '../data/map';

export const mutations: MutationTree<State> = {
    credential(state, credential: __esri.Credential) {
        state.credential = credential;
    },
    portalItems(state, portalItems: __esri.PortalItem[]) {
        for (let item of portalItems) {
            state.portalItems.push(item);
        }
    },
    updateLayers(state) {
        state.layers.length = 0;
        for (let layer of webmap.layers.toArray()) {
            state.layers.push(layer as __esri.FeatureLayer);
        }
    },
    saving(state) {
        state.state = 'saving';
    },
    webmapSaved(state) {
        state.webmapSaved = true;
        state.state = 'saved';
    }
};
