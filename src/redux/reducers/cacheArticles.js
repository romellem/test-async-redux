// prettier-ignore
import {
    FETCH_ARTICLE_REQUEST,
    FETCH_ARTICLE_FAILURE,
    FETCH_ARTICLE_SUCCESS,
} from '../actionTypes';

export const FETCH_ARTICLE_LOADING_STATE = {};
export const FETCH_ARTICLE_FAILURE_STATE = {};

const cacheArticles = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ARTICLE_REQUEST:
            return FETCH_ARTICLE_LOADING_STATE;
        case FETCH_ARTICLE_SUCCESS:
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        case FETCH_ARTICLE_FAILURE:
            return FETCH_ARTICLE_FAILURE_STATE;
        default:
            return state;
    }
};

export default cacheArticles;
