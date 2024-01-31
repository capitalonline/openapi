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
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import VueClipboard  from 'vue-clipboard2';
import "./assets/aliIconfont/iconfont.css"
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard);
Vue.use(ElementUI)
// Vue.use(Clipboard)
Vue.config.productionTip = false;

let router = null;
let instance: any;
interface prop {
  [propName: string]: any
}

function render (props: prop = {}) {
  const { container } = props;
  const routes = [];
  // if(props){
  //   props.onGlobalStateChange((state, prev) => {
  //     // state: 变更后的状态; prev 变更前的状态

  //   },true)
  // }
  // 函数来检查inn是否应该被保留
  function shouldRouteBeKept(inn) {
    // 如果路由有meta属性中的no_auth字段，则始终保留
    if (inn.meta && inn.meta.no_auth) {
      return true;
    }
    // 如果路由在auth_info中有定义，则保留
    if (store.state.auth_info[inn.name]) {
      return true;
    }
    // 否则，检查auth_info的每个key，看是否包含当前路由的name
    for (const key in store.state.auth_info) {
      if (store.state.auth_info[key].includes(inn.name)) {
        return true;
      }
    }
    // 如果以上条件都不满足，则不应该保留该路由
    return false;
  }
// 遍历routes数组，处理每个路由及其children
  all_routes.forEach(item => {
    // 处理children
    if (item.children && item.children.length > 0) {
      item.children = item.children.filter(inn => shouldRouteBeKept(inn));
      // 如果children中还有剩余的路由，则将其添加到routes中
      if (item.children.length > 0) {
        routes.push({
          ...item,
          children: item.children
        });
      }
    }
  });
  console.log(routes)
  router = new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/under-app-sp' : '/child/app-sp',
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
if (!window.__POWERED_BY_QIANKUN__) {
  store.commit('SET_QIANKUN', false)
  getUserInfo().then(() => {
    render();
  })
}

export async function bootstrap () {
}

export function mount (props: any={}) {
  store.commit('SET_QIANKUN', true)
  if(props){
    props.onGlobalStateChange((state, prev) => {
      store.commit('SET_TOKEN',state.token)
      store.commit('SET_AUTH_INFO', state.permission_dict);
    }, true);
  }

  render(props)
}

export async function unmount () {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
