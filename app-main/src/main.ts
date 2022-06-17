import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import startQiankun from './apps';
import { getUserInfo } from './init';
import { 
  Button, 
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Tooltip
} from 'element-ui';
import './assets/reset.scss';
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";


Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Icon);
Vue.use(Tooltip);

async function Init() {

  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      Vue,
      dsn: 'https://f9e96eb66f5c4a00a8ec4f6f655651f1@sentry.capitalonline.net/5',
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          tracingOrigins: ['http://cloudos-sp-front.capitalonline.net/', /^\//],
        }),
      ],
      tracesSampleRate: 1.0
    })
  }

  await getUserInfo()

  startQiankun({sandbox: {experimentalStyleIsolation: true}})
  // startQiankun()
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

Init()