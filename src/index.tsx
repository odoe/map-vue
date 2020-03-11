import Vue from 'vue';
import VueTailwind from 'vue-tailwind';

Vue.use(VueTailwind);

import App from './App.vue';

new Vue({
    render() {
        return <App />;
    }
}).$mount('#root');
