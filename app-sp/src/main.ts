import Vue from 'vue';
import App from './App.vue';
import routes from './router';
import store from './store';
import './public-path'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import './assets/reset.scss';

Vue.use(ElementUI)

Vue.config.productionTip = false;

let router = null;
let instance:any;
interface prop {
  [propName: string]: any
};

function render(props: prop = {}) {
  const { container } = props;
  router = new VueRouter({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/app-sp' : '',
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
  render();
}

export async function bootstrap() {
  console.log("bootstrap")
}

export async function mount(props: any) {
  console.log('mount', props)
  render(props)
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
