// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

Vue.use(Viewer);
Vue.config.productionTip = false
    //使用element-ui
Vue.use(ElementUI);
Vue.prototype.$http = Axios
Vue.prototype.$echarts = echarts
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})