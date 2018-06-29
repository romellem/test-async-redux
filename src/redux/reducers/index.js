import { combineReducers } from 'redux';
import listArticles from './listArticles';
import cacheArticles from './cacheArticles';

export default combineReducers({
    listArticles,
    articlesById: cacheArticles,
});
