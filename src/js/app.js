var $ = require('jquery');
window.jQuery = $;
window.$ = $;

import { render } from 'react-dom';
import routes from './react-routes.js';

render(
    routes,
    document.getElementById('app')
);