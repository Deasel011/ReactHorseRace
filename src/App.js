import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './components/routes';


class App extends Component {
    render() {
        return (
            <div className="App">

                <Routes/>
            </div>
        );
    }
}

export default App;
