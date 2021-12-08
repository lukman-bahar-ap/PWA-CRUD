import 'regenerator-runtime/runtime';
import 'lazysizes/lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import swRegister from './utils/sw-register';
import Auth from './views/auth';

// loadAuth();
const container = document.querySelector('#main-content');
const auth = new Auth({ content: container });
auth.loadAuth();

// code back on mobile device
window.addEventListener('load', () => window.history.pushState({}, ''));
// call service worker register
window.addEventListener('DOMContentLoaded', swRegister);
// disable right click
window.addEventListener('contextmenu', (event) => event.preventDefault());
