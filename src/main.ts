import App from '@/modules/common/components/App.vue';
import pinia from '@/plugins/pinia';
import '@/styles/globals.css';
import router, { routes } from '@/plugins/router';
import { toastPlugin } from '@/plugins/toasts';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import {
  CoMoon,
  CoSun,
  PxCheck,
  PxEdit,
  PxRemoveBox,
} from 'oh-vue-icons/icons';
import { createApp } from 'vue';

const app = createApp(App);

addIcons(CoMoon, CoSun, PxRemoveBox, PxEdit, PxCheck);

app.component('v-icon', OhVueIcon);
app.use(pinia);
app.use(router);
app.use(toastPlugin);

app.config.globalProperties.$routes = routes;

app.mount('#app');
