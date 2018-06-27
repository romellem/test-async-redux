import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Article from './Article';
import ArticleList from './ArticleList';

class App extends Component {
    render() {
        return (
            // prettier-ignore
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/article"/>}
                />
                <Route
                    exact
                    path="/article"
                    component={Article}
                />
                <Route
                    path="/article/:id"
                    component={ArticleList}
                />
            </Switch>
        );
    }
}

export default App;
