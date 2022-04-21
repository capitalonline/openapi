import Vue from 'vue';
import App from './App.vue';
import routes from './router';
import store from './store';
import './public-path';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import './assets/reset.scss';
import './assets/common.scss';
import { getUserInfo } from '../src/init';
import Clipboard from 'v-clipboard';

Vue.use(ElementUI)
Vue.use(Clipboard)

Vue.config.productionTip = false;

let router = null;
let instance: any;
interface prop {
  [propName: string]: any
};

function render(props: prop = {}) {
  const { container } = props;
  router = new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/under-app-op' : '/child/app-op',
    routes,
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if(!window.__POWERED_BY_QIANKUN__) {
  getUserInfo().then(() => {
    render();
  })
}

export async function bootstrap() {
}

export async function mount(props: any) {
  store.commit('SET_QIANKUN', true)
  props.onGlobalStateChange((state, prev) => {
    store.commit('SET_AUTH_INFO', state.permission_dict);
  }, true);
  render(props)
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
