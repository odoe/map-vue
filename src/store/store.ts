import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { state, State } from './state';
import { actions } from './actions';
import { mutations } from './mutations';

Vue.use(Vuex);

const store = new Store<State>({
    state,
    mutations,
    actions
});

export default store;
