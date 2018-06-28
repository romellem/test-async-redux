import { combineReducers } from 'redux';
import {
    LIST_ARTICLES_REQUEST,
    LIST_ARTICLES_FAILURE,
    LIST_ARTICLES_SUCCESS,
    
    FETCH_ARTICLE_REQUEST,
    FETCH_ARTICLE_FAILURE,
    FETCH_ARTICLE_SUCCESS,
} from './actionTypes';

const listArticles = (state = { loading: false, data: [], error: null }, action) => {
    switch (action.type) {
        case LIST_ARTICLES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LIST_ARTICLES_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
                loading: false,
                error: null,
            };
        case LIST_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const cacheArticles = (state = { loading: false, error: null, data: {} }, action) => {
    switch (action.type) {
        case FETCH_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ARTICLE_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.id]: {
                        ...action.payload
                    },
                },
                loading: false,
                error: null,
            };
        case FETCH_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default combineReducers({
    listArticles,
    articlesById: cacheArticles,
});
