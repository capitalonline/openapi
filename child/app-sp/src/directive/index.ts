import Clipboard from './clipboard'
// import Vue from 'vue'
const install = function(Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  window.Vue.use(install); // eslint-disable-line
}

Clipboard['install'] = install
export default Clipboard
