import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';

import '@/style.css';
import router from "@/router";

import { fakeBackend } from './helpers';
fakeBackend();

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')