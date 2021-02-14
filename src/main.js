import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebaseconfig from './components/firebase-config.js';

createApp(App)
  .use(store)
  .use(router)
  .use(firebaseconfig)
  .mount('#app');
