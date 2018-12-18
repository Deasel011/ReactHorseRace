import React from 'react';
import {Form,Text} from 'informed';

class Landing extends React.Component{
    constructor(){
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
    let id = document.getElementById('game-id-field').value
        alert("HELLO "+id);
        this.props.history.push('/game')
    }

    render(){
        return(
            <div>
                <h1>
                    HorseRace Group Insurance
                </h1>
                <Form id="formbox" name="roombox" method="get">

                    <label htmlFor="game-id-field">Enter the room you want to race in </label>
                    <Text field="name" id="game-id-field"  placeholder="69"/>
                    <button type="submit" onClick={()=>this.props.history.push('/game?room='+document.getElementById('game-id-field').value)}>
                        Talk to me Goose!
                    </button>
                </Form>
                <button onClick={this.props.history.push('/game')}>Room</button>
            </div>
        )
    }
}

export default Landing;