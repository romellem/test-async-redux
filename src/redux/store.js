import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Allow Chrome extension "Redux DevTools" to function properly
// @link https://github.com/zalmoxisus/redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension';

// prettier-ignore
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
