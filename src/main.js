import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');

const config = {
  apiKey: 'AIzaSyCZeHssWkGWkLNS4K3b2rHECacbn8IEfN4',
  authDomain: 't-beck-vue4.firebaseapp.com',
  projectId: 't-beck-vue4',
  storageBucket: 't-beck-vue4.appspot.com',
  messagingSenderId: '555386115864',
  appId: '1:555386115864:web:16f81ad69b6964ef50f06d',
};

firebase.initializeApp(config);