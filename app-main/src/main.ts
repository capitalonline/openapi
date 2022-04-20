import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import startQiankun from './apps';
import { getUserInfo } from './init';

Vue.config.productionTip = false;

async function Init() {
  await getUserInfo()

  startQiankun()

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

Init()