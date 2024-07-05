import { createApp } from 'vue';
import App from './App.vue';

import '@/styles/main.css';

import Step1 from '@/components/Step1.vue';
import Step2 from '@/components/Step2.vue';
import Step3 from '@/components/Step3.vue';
import Step4 from '@/components/Step4.vue';
import CustomButton from '@/components/CustomButton.vue';

const app = createApp(App);

app.component('step-1', Step1);
app.component('step-2', Step2);
app.component('step-3', Step3);
app.component('step-4', Step4);
app.component('custom-button', CustomButton);

app.mount('#app');
