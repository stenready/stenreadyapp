import Vue from 'vue'
 
/**add jquery */
import $ from 'jquery'
window.$ = $

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
