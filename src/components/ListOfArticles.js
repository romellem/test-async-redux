import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticlesList } from '../redux/actions';
import {
    LIST_ARTICLES_LOADING_STATE as LOADING_STATE,
    LIST_ARTICLES_FAILURE_STATE as FAILURE_STATE
} from '../redux/reducers/listArticles';

const mapStateToProps = state => ({
    listArticles: [...state.listArticles]
});
const mapDispatchToProps = dispatch => ({
    onFetchArticles: () => dispatch(fetchArticlesList()),
});

class ListOfArticles extends Component {
    componentDidMount() {
        this.props.onFetchArticles();
    }

    render() {
        let { listArticles } = this.props;

        if (listArticles === LOADING_STATE) {
            return <h6>Loading...</h6>;
        } else if (listArticles === FAILURE_STATE) {
            return <h6 style={{ color: 'red' }}>An error occured!</h6>;
        }

        // Otherwise, we have data to display!
        return (
            <React.Fragment>
                <h1>List of Articles:</h1>
                <ul>
                    {listArticles.map(article => (
                        <li key={article.id}>
                            <Link to={`/article/${article.id}`}>{article.title}</Link>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfArticles);
