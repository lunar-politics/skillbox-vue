import Vue from 'vue';
import App from './App.vue';
import { firstString, secondString } from './var';
import func from './func';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

func(firstString);
func(secondString);
