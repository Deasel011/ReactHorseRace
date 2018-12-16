import React, {Component} from 'react';
import { HashRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Landing from '../landing';

class routes extends Component {
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" component={Landing} />
                </Switch>
            </HashRouter>
        );
    }
}

export default (routes);