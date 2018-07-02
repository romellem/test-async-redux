// prettier-ignore
import {
    FETCH_ARTICLE_REQUEST,
    FETCH_ARTICLE_UNMOUNT,
    FETCH_ARTICLE_FAILURE,
    FETCH_ARTICLE_SUCCESS,
} from '../actionTypes';

const cacheArticles = (state = { loading: true, error: null, data: {} }, action) => {
    switch (action.type) {
        case FETCH_ARTICLE_REQUEST:
        case FETCH_ARTICLE_UNMOUNT:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ARTICLE_SUCCESS:
            return {
                ...state,
                data: {
                    // Spread the rest of the data to keep a cache of previous articles
                    ...state.data,

                    // Store article under its ID
                    [action.payload.id]: action.payload,
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

export default cacheArticles;
