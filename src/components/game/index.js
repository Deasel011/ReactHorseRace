import React from 'react';

class Game extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <h1>
                    Game Lobby #{this.props.location.searchParams}
                </h1>
                <form name="roombox" target="#" method="get" action="/game">
                    <label>Enter the room you want to race in </label>
                    <input type="text" placeholder="abc12345" name="room"></input>
                    <input type="submit" value="Talk to me Goose!"/>
                </form>
            </div>
        )
    }
}

export default Game;