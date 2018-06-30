import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticleById } from '../redux/actions';
import {
    FETCH_ARTICLE_LOADING_STATE as LOADING_STATE,
    FETCH_ARTICLE_FAILURE_STATE as FAILURE_STATE
} from '../redux/reducers/cacheArticles';

const mapStateToProps = state => ({
    articlesById: state.articlesById,
});
const mapDispatchToProps = dispatch => ({
    onFetchArticleById: id => dispatch(fetchArticleById(id)),
});

class Article extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        let { id } = this.props.match.params;
        if (prevProps.match.params.id !== id) {
            this.props.onFetchArticleById(id);
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        this.props.onFetchArticleById(id);
    }

    render() {
        // Get ID from Route
        let { id } = this.props.match.params;
        let { articlesById } = this.props;
        let article = articlesById[id];

        if (articlesById === LOADING_STATE) {
            return <h6>Loading...</h6>;
        } else if (articlesById === FAILURE_STATE) {
            return <h6 style={{ color: 'red' }}>An error occured!</h6>;
        } else if (!article) {
            return <h6 style={{ color: 'red' }}>The article was not found!</h6>;
        }

        return (
            <React.Fragment>
                <h1>{article.title}</h1>
                <h5 style={{ color: 'gray' }}>Article {id}</h5>
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Article);
