import React, { Component } from 'react';
import { connect } from 'react-redux';

class ArticleList extends Component {
    render() {
        // Get ID from Route
        let { id } = this.props.match.params;
        return (
            <h1>Article {id}</h1>
        );
    }
}

export default ArticleList;
