import Vue from 'vue';
import App from './App.vue';
import all_routes from './router';
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
let routes = [];
function FnHandleRoutes(data) {
  data.forEach((item, index) => {
    if (item.children && store.state.auth_info[item.name]) {
      const children = []
      item.children.forEach(child => {
        if (store.state.auth_info[item.name].includes(child.name)) {
          children.push(child)
        }
      })
      routes.push({
        ...item,
        children: children
      })
    } else if (store.state.auth_info[item.name]) {
      routes.push(item)
    } else if (item.meta?.no_auth) {
      routes.push(item)
    }
  })
}
function render (props: prop = {}) {
  const { container } = props;
  FnHandleRoutes(all_routes)
  router = new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/under-app-op' : '/child/app-op',
    routes
  })
  router.beforeEach((to, from, next) => {
    if (!to.name) {
      next({ name: routes[0].name })
    } else {
      next()
    }
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
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
  routes=[]
}
