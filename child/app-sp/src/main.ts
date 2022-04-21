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

Vue.use(ElementUI)

Vue.config.productionTip = false;

let router = null;
let instance: any;
interface prop {
  [propName: string]: any
}

function render (props: prop = {}) {
  const { container } = props;
  const routes = [];
  for (const item of all_routes) {
    if (store.state.auth_info[item.name]) {
      routes.push(item)
    } else if (item.meta.no_auth) {
      routes.push(item)
    } else {
      for (const key in store.state.auth_info) {
        if (store.state.auth_info[key].includes(item.name)) {
          routes.push(item)
        }
      }
    }
  }
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
  // Sentry.init({
  //   Vue,
  //   dsn: 'http://807ce19725244499a99480d12cef58be@sentry.yun-paas.net:9000/14',
  //   integrations: [
  //     new Integrations.BrowserTracing({
  //       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
  //       tracingOrigins: ['http://cloudos-sp-front.gic.test/', /^\//]
  //     })
  //   ],
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0
  // });
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

export function mount (props: any) {
  store.commit('SET_QIANKUN', true)
  props.onGlobalStateChange((state, prev) => {
    store.commit('SET_AUTH_INFO', state.permission_dict);
  }, true);
  render(props)
}

export async function unmount () {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
