import Vue from 'vue'
import App from './App'
import request from '@/utils/request.js'
import requestbuffer from '@/utils/requestbuffer.js'
import uView from 'uview-ui';
import api from './api/api.js'
Vue.prototype.$api = api
Vue.use(uView);
Vue.prototype.$request = request
Vue.prototype.$requestbuffer = requestbuffer
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
