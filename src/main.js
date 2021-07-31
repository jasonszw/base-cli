import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import './utils/server'
import vconsole from "vconsole";
import { Popup, NoticeBar } from 'vant';
let v = getQueryVariable("v");
if (v) {
  new vconsole();
}

Vue.config.productionTip = false;
Vue.use(Popup).use(NoticeBar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
