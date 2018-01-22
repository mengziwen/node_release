// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global_ from './commen/global'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.prototype.GLOBAL = global_;
Vue.config.productionTip = false
Vue.prototype.HOST = '/api';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})