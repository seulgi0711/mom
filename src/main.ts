import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import app from './app';

library.add(faUserSecret);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
