import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'leaflet/dist/leaflet.css';

Vue.use(axios);
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  render: h => h(App)
})