import React from 'react';
import styled from 'styled-components';
import Track from "../track";
import Board from "../board";
import axios from 'axios';
import StartButton from "../startbutton";

const Background = styled.div`
  background-color:green;
  width:100%;
  height:100%;
  position:fixed;
`;



class Room extends React.Component{
    constructor(){
        super();

        this.state={room_id:0, race_started:false, horses:[], inProgress:false};
        this.startRace = this.startRace.bind(this);
        this.obtainGameInfo = this.obtainGameInfo.bind(this)
    }

    componentWillMount(){
        this.setState({room_id:this.props.match.params.room_id});
        this.obtainGameInfo()
    }

    obtainGameInfo(){
        axios.get(`https://iahorserace.azurewebsites.net//games/`+this.props.match.params.room_id)
            .then(res => {
                if(!this.state.race_started){
                    this.setState({horses:res.data.horses});
                }
            });
        if(!this.state.race_started){
            setTimeout(()=>{this.obtainGameInfo()}, 5000)
        }
    }

    startRace(){
        this.setState({inProgress:true,race_started:true})
    }

    render(){
        let room = this;
        return(
            <div>
                <h1>
                    A Horse Race Room # {this.state.room_id}
                </h1>
                <Background>
                    <StartButton inProgress={this.state.inProgress} start={this.startRace}/>
                    <Board horses={this.state.horses} showResults={this.state.inProgress} roomid={this.state.room_id} pageSize={5}/>
                    <Track horses={this.state.horses} inProgress={this.state.inProgress} roomid={this.state.room_id}/>
                </Background>
            </div>
        )
    }
}

export default Room;