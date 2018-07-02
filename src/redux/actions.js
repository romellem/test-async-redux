import agent from '../agent';
import {
    LIST_ARTICLES_REQUEST,
    LIST_ARTICLES_FAILURE,
    LIST_ARTICLES_SUCCESS,
    FETCH_ARTICLE_REQUEST,
    FETCH_ARTICLE_FAILURE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_UNMOUNT,
} from './actionTypes';

export const listArticlesRequest = () => ({
    type: LIST_ARTICLES_REQUEST,
});
export const listArticlesSuccess = posts => ({
    type: LIST_ARTICLES_SUCCESS,
    payload: posts,
});
export const listArticlesFailure = err => ({
    type: LIST_ARTICLES_FAILURE,
    error: true,
    payload: err,
});

// @type thunk
export const fetchArticlesList = () => async dispatch => {
    dispatch(listArticlesRequest());
    try {
        const articles = await agent.Article.list();
        dispatch(listArticlesSuccess(articles));
    } catch (err) {
        dispatch(listArticlesFailure(err));
    }
};

export const fetchArticleRequest = id => ({
    type: FETCH_ARTICLE_REQUEST,
    payload: id,
});
export const fetchArticleSuccess = article => ({
    type: FETCH_ARTICLE_SUCCESS,
    payload: article,
});
export const fetchArticleFailure = err => ({
    type: FETCH_ARTICLE_FAILURE,
    error: true,
    payload: err,
});
export const fetchArticleUnmount = err => ({
    type: FETCH_ARTICLE_UNMOUNT
});

// @type thunk
export const fetchArticleById = id => async (dispatch, getState) => {
    const state = getState();
    const articlesById = state.articlesById.data;

    if (articlesById[id]) {
        // console.log('Article cached!');
        return dispatch(fetchArticleSuccess(articlesById[id]));
    }

    // If the article isn't cached, request it from the API
    dispatch(fetchArticleRequest(id));
    try {
        const article = await agent.Article.get(id);
        dispatch(fetchArticleSuccess(article));
    } catch (err) {
        let error_msg = `Error in loading Article ${id}`;
        dispatch(fetchArticleFailure(new Error(error_msg)));
    }
};
