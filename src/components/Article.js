import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticleById } from '../redux/actions';

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
        let article = this.props.articlesById[id];

        if (!article) {
            return (
                <React.Fragment>
                    {/* <h4>Loading...</h4> */}
                    <pre>{JSON.stringify(this.props, null, '  ')}</pre>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <h1>{article.title}</h1>
                <h5>Article {id}</h5>
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Article);
