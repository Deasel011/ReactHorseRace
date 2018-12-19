import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Landing from '../landing';
import Game from '../game';
import Room from '../room';

class routes extends Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/game" component={Game} />
                    <Route path="/room" component={Room}/>
                    <Route path="/" component={Landing} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default (routes);