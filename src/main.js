import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
// import Vuelazyload from 'vue-lazyload'


const app = createApp(App)
// app.use(Vuelazyload);
app.config.globalProperties.$bus = new mitt();

// app.config.globalProperties.$Toast = Toast

app.use(store).use(router).mount('#app')