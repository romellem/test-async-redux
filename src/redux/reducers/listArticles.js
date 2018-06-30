// prettier-ignore
import {
    LIST_ARTICLES_REQUEST,
    LIST_ARTICLES_FAILURE,
    LIST_ARTICLES_SUCCESS
} from '../actionTypes';

export const LIST_ARTICLES_LOADING_STATE = [];
export const LIST_ARTICLES_FAILURE_STATE = [];


const listArticles = (state = [], action) => {
    switch (action.type) {
        case LIST_ARTICLES_REQUEST:
            return LIST_ARTICLES_LOADING_STATE;
        case LIST_ARTICLES_SUCCESS:
            return [...action.payload];
        case LIST_ARTICLES_FAILURE:
            return LIST_ARTICLES_FAILURE_STATE;
        default:
            return state;
    }
};

export default listArticles;
