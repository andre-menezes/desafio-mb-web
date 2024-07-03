import { createApp } from 'vue';
import App from './App.vue';

import Step1 from '@/components/Step1.vue';

const app = createApp(App);

app.component('step-1', Step1);

app.mount('#app');
