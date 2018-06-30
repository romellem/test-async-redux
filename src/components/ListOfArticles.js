import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticlesList } from '../redux/actions';

const mapStateToProps = state => ({
    listArticles: {
        ...state.listArticles,
    },
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

        if (listArticles.loading) {
            return <h6>Loading...</h6>;
        } else if (listArticles.error) {
            return <h6 style={{ color: 'red' }}>An error occured!</h6>;
        }

        // Otherwise, we have data to display!
        return (
            <React.Fragment>
                <h1>List of Articles:</h1>
                <ul>
                    {listArticles.data.map(article => (
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
