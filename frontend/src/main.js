import { createApp } from 'vue';
import App from './App.vue';

import Step1 from '@/components/Step1.vue';
import Step2 from '@/components/Step2.vue';

const app = createApp(App);

app.component('step-1', Step1);
app.component('step-2', Step2);

app.mount('#app');
