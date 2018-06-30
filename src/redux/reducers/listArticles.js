// prettier-ignore
import {
    LIST_ARTICLES_REQUEST,
    LIST_ARTICLES_FAILURE,
    LIST_ARTICLES_SUCCESS
} from '../actionTypes';

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
                data: [...action.payload],
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

export default listArticles;
