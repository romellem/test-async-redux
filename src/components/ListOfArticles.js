import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticlesList } from '../redux/actions';

const mapStateToProps = state => ({
    listArticles: {
        ...state.listArticles
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
        let data;
        try {
            data = JSON.stringify(this.props.listArticles.data);
        } catch (e) {
            data = this.props.listArticles.data.toString();
        }
        return (
            <React.Fragment>
                <h1>List of Articles:</h1>
                <pre>{JSON.stringify(this.props, null, '  ')}</pre>
                {/*<ul>
                    <li>Loading: {this.props.loading.toString()}</li>
                    <li>Error: {this.props.error.toString()}</li>
                    <li>Data: {data}</li>
                </ul>*/}
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfArticles);
