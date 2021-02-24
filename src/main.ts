import app from './app';
import store from './store';

app.use(store);

// keys(directives).forEach(name => {
//   app.directive(name, directives[name]);
// });

app.mount('#app');
