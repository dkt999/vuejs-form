import './assets/main.css'
import "@mdi/font/css/materialdesignicons.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from "./i18n";
import { vRipple } from "@/directives/ripple.js"; 
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n);
app.directive("ripple", vRipple);
app.mount('#app')
