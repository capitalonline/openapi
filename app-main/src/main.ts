import Vue from 'vue';
import App from './App.vue';
import router from './router';
import startQiankun from './apps';

Vue.config.productionTip = false;

startQiankun();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
