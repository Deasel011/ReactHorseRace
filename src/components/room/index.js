import React from 'react';
import styled from 'styled-components';
import Track from "../track";
import Horse from "../horse";

const Background = styled.div`
  background-color:green;
  width:100%;
  height:100%;
  position:fixed;
`;



class Room extends React.Component{
    constructor(){
        super();

        this.state={room_id:0}
    }

    componentWillMount(){
        this.setState({room_id:this.props.match.params.room_id})
    }

    render(){
        return(
            <div>
                <h1>
                    A Horse Race Room # {this.state.room_id}
                </h1>
                <Background>
                    <Track/>
                </Background>
            </div>
        )
    }
}

export default Room;