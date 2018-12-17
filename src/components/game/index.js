import React from 'react';
import {Form, Text} from "informed";

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            horse: null,
            horse_list: []
        };
        this.obtainHorseNameFromQuery = this.obtainHorseNameFromQuery.bind(this)
    }

    obtainHorseNameFromQuery() {
        return new URLSearchParams(this.props.location.search).get('horse');
    }

    componentWillMount() {
        this.setState({
            horse: this.obtainHorseNameFromQuery()
        })
    }

    render() {


        return (
            <div>
                <h1>
                    Game Lobby #{new URLSearchParams(this.props.location.search).get('room')}
                </h1>
                <GameLobbyContainer parent_props={this.state} history={this.props.history}/>
            </div>
        )
    }
}

class GameLobbyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    addHorse(name) {
        this.props.history.push(window.location.pathname + window.location.search + '&horse=' + name)
        this.setState({horse: name})
    }

    componentWillMount() {
        this.setState(this.props.parent_props)
    }

    render() {
        console.log(this.state);
        if (this.state.horse != null) {
            return <div>
                <h2>{this.state.horse.charAt(0).toUpperCase() + this.state.horse.slice(1)}</h2>
                <p>Is being watched by you!</p>
            </div>
        }
        return <Form id="formbox" name="horsebox" method="get">

            <label htmlFor="horse-id-field">Enter a horse name </label>
            <Text field="name" id="horse-id-field" placeholder="James"/>
            <button type="submit" onClick={() => this.addHorse(document.getElementById('horse-id-field').value)}>
                Talk to me Goose!
            </button>
        </Form>
    }

}

export default Game;