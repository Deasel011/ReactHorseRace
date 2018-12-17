import React from 'react';
import styled from 'styled-components';
import Track from "../track";
import axios from 'axios';

const Background = styled.div`
  background-color:green;
  width:100%;
  height:100%;
  position:fixed;
`;



class Room extends React.Component{
    constructor(){
        super();

        this.state={room_id:0, race_started:false, horses:[]};

        this.obtainGameInfo = this.obtainGameInfo.bind(this)
    }

    componentWillMount(){
        this.setState({room_id:this.props.match.params.room_id});
        this.obtainGameInfo()
    }

    obtainGameInfo(){
        axios.get(`https://iahorserace.azurewebsites.net//games/`+this.props.match.params.room_id)
            .then(res => {
                if(!this.state.race_started)
                    this.setState({horses:res.data.horses});
                console.log(res)
            });
        if(!this.state.race_started){
            setTimeout(()=>{this.obtainGameInfo()}, 5000)
        }
    }

    render(){
        return(
            <div>
                <h1>
                    A Horse Race Room # {this.state.room_id}
                </h1>
                <Background>
                    <Track horses={this.state.horses}/>
                </Background>
            </div>
        )
    }
}

export default Room;