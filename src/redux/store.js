import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';

/**
 * Use 'thunk' middleware. This allows us to do things like:
 * ```
 * store.dispatch(function(dispatch) {
 *   dispatch({type: 'SOME_ACTION'})
 *   dispatch({type: 'SOME_OTHER_ACTION'})
 * 
 *   let data = api.get().then(response => {
 *     dispatch({type: 'SOME_ASYNC_ACTION', payload: response})
 *   })
 * })
 * ```
 * 
 * Essentially, this allows us to support Async actions, let
 * fetching data from an API, which we do all the time!
 */
import thunk from 'redux-thunk';

// Allow Chrome extension "Redux DevTools" to function properly
// @link https://github.com/zalmoxisus/redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension';

// prettier-ignore
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
