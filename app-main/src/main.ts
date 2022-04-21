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

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Icon);
Vue.use(Tooltip);

async function Init() {
  await getUserInfo()

  startQiankun({sandbox: {experimentalStyleIsolation: true}})

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

Init()