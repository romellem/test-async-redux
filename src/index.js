import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

window.log = (function(){
    var c = 0;
    return function(str) {
        console.log(`${++c}: ${str}`);
    };
})();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
