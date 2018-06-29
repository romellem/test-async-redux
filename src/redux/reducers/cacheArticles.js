// prettier-ignore
import {
    FETCH_ARTICLE_REQUEST,
    FETCH_ARTICLE_FAILURE,
    FETCH_ARTICLE_SUCCESS,
} from '../actionTypes';

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
                        ...action.payload,
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

export default cacheArticles;
