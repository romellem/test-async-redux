import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Article from './Article';
import ListOfArticles from './ListOfArticles';

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
                    component={ListOfArticles}
                />
                <Route
                    path="/article/:id"
                    component={Article}
                />
            </Switch>
        );
    }
}

export default App;
