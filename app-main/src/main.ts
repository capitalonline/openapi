import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import startQiankun from './apps';
import { getUserInfo } from './init';
import './assets/reset.scss';

Vue.config.productionTip = false;

async function Init() {
  await getUserInfo()

  startQiankun({sandbox: {strictStyleIsolation: true}})

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

Init()