import React from 'react';
import {Form, Text} from "informed";
import Board from "../board";
import axios from "axios/index";

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            gameid:null,
            horse: null,
            horse_list: []
        };
        this.setGameId=this.setGameId.bind(this);
        this.obtainHorseNameFromQuery = this.obtainHorseNameFromQuery.bind(this)
    }

    obtainHorseNameFromQuery() {
        console.log(new URLSearchParams(this.props.location.search).get('horse'))
        return new URLSearchParams(this.props.location.search).get('horse');
    }

    setGameId(id){
        this.setState({gameid:id})
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
                    Game Lobby #{this.state.gameid||"??"}
                </h1>
                <GameLobbyContainer parent_props={this.state} history={this.props.history} setGameId={this.setGameId}/>
                {this.state.gameid &&
                <Board showResults={true} roomid={this.state.gameid} pageSize={30}/>}
            </div>
        )
    }
}

class GameLobbyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameid:this.props.gameid}

        this.validateHorseNameAvailable = this.validateHorseNameAvailable.bind(this)
    }

    componentWillMount() {
    }

    validateHorseNameAvailable(name,callback){
        axios.get(`https://iahorserace.azurewebsites.net//games/`+this.state.gameid)
            .then(res => {
                let index = res.data.horses.findIndex(x=>x.name===name);
                console.log(index);
                if(index<0){
                    let data = {name:name};
                    axios.post(`https://iahorserace.azurewebsites.net//games/`+this.state.gameid+`/horses`,data).then(()=>{
                        callback()
                    })

                }else{
                    alert("Name:" + name + " is already in the game!")
                }

            });
    }

    render() {
        console.log(this.state.gameid);
        if(this.state.gameid==null){
            return(
                <div>
                    <h1>
                        HorseRace Group Insurance
                    </h1>
                    <Form id="formbox" name="roombox" method="get">

                        <label htmlFor="game-id-field">Enter the room you want to race in </label>
                        <Text field="name" id="game-id-field"  placeholder="69"/>
                        <button type="submit" onClick={()=>{this.props.setGameId(document.getElementById('game-id-field').value);
                        this.setState({gameid:document.getElementById('game-id-field').value})}}>
                            Talk to me Goose!
                        </button>
                    </Form>
                </div>
            )
        }
        if(this.state.horse == null){
            return <Form id="formbox" name="horsebox" method="get">

                <label htmlFor="horse-id-field">Enter a horse name </label>
                <Text field="name" id="horse-id-field" placeholder="James"/>
                <button type="submit" onClick={() => this.validateHorseNameAvailable(document.getElementById('horse-id-field').value,()=>{this.setState({horse:document.getElementById('horse-id-field').value})})}>
                    Talk to me Goose!
                </button>
            </Form>
        }
        if (this.state.horse !== null) {
            console.log("horse not null");
            return <div>
                <h2>{this.state.horse.charAt(0).toUpperCase() + this.state.horse.slice(1)}</h2>
                <p>Look out for your horse!!</p>
            </div>
        }
        console.log("horse not null");

    }

}

export default Game;