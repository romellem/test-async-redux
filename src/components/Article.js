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
        window.log('COMPONENT WAS UPDATED...');
        if (prevProps.match.params.id !== id) {
            window.log('\tTRIGGERED ARTICLE REFETCH: ' + id);
            this.props.onFetchArticleById(id);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        window.log('INSIDE `shouldComponentUpdate`...');
        console.log(this.props);
        console.log(nextProps);
        
        // let current_id = this.props.match.params.id;
        // let next_id = nextProps.match.params.id;
        // if (next_id !== current_id) {
        //     window.log(`PREVENTING AN UPDATE, ${next_id} !== ${current_id}`);
        //     return false;
        // }
        
        // window.log(`UPDATE ALLOWED`);
        return true;
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        this.props.onFetchArticleById(id);
    }

    render() {
        window.log('RENDER TRIGGERED...');
        // Get ID from Route
        let { id } = this.props.match.params;
        let { articlesById } = this.props;
        let article = articlesById.data[id];

        if (articlesById.loading) {
            window.log('\tLOADING');
            return <h6>Loading...</h6>;
        } else if (articlesById.error) {
            window.log('\tERROR');
            return <h6 style={{ color: 'red' }}>An error occured!</h6>;
        } else if (!article) {
            window.log('\tARTICLE NOT FOUND');
            return <h6 style={{ color: 'red' }}>The article was not found!</h6>;
        }

        window.log('\tSUCCESS');
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
