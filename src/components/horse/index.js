import React from 'react';
import styled from 'styled-components';
import axios from "axios";

const HorseSprite = styled.rect`
    fill:black;stroke:${props => props.strokeColor};stroke-width:5;opacity:1
`

class Horse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:props.horse.name,
            width: window.innerWidth,
            height: window.innerHeight,
            direction: "east",
            step: 0,
            lap:0,
            x: 0,
            y: 0,
            horseId:props.horse.horseId,
            lapsToWin: 1,
            horseIndex: this.props.horseIndex || 0,
            rank: 0,
            running:false,
            finished: false,
            color:"",
            timeStart: null
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.placeWithStep = this.placeWithStep.bind(this);
        this.takeAStep = this.takeAStep.bind(this);
        this.setRandomHorseColor = this.setRandomHorseColor.bind(this);
        //this.takeAStepEachSecond();
        //this.takeAStepFromApi();
    }

    componentDidMount() {
        let laps = new URLSearchParams(window.location.search).get('laps');
        if(laps){
            this.setState({lapsToWin:laps});
        }
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentWillMount() {
        this.placeWithStep();
        this.setRandomHorseColor();
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    takeAStep() {
        if(this.state.step > 10 && (this.state.step + 1) % 100===0){
            this.setState({lap:(this.state.lap+1)})
        }
        this.setState({step: (this.state.step + 1) });
        this.placeWithStep()
    }

    takeAStepEachSecond() {
        setTimeout(() => {
            this.takeAStep();
            this.takeAStepEachSecond()
        }, 50)
    }

    updateStepsTaken(data){
        axios.put(`https://iahorserace.azurewebsites.net//games/`+this.props.roomid+`/horses/`+this.state.horseId+`/position`,data)
            .then(res => {
            }).catch(err=>{
            console.error(err.message)
        });
    }

    async takeAStepFromApi() {
        axios.post(`https://iahorserace.azurewebsites.net//games/`+this.props.roomid+`/horses/`+this.state.horseId+`/step`)
            .then(res => {
                this.takeAStep();
                if(this.state.lapsToWin <= this.state.lap){
                    this.setState({finished:true});
                    this.updateStepsTaken({finished:true,timeInMillis:Date.now()%900000,steps:this.state.step});
                }else {
                    this.takeAStepFromApi();
                    this.updateStepsTaken({timeInMillis:Date.now()%900000,steps:this.state.step});
                }
            }).catch(err=>{
                console.log(this.state.name+" just stumbled...");
            this.takeAStepFromApi();
        });
        // if(!this.state.race_started){
        //     setTimeout(()=>{this.obtainGameInfo()}, 5000)
        // }
    }

    placeWithStep() {
        let x = 0, y = 0, direction;
        let step = this.state.step % 100;
        let index = this.state.horseIndex;
        switch (step < 17 ? 1 : step < 33 ? 2 : step < 67 ? 3 : step < 83 ? 4 : 5) {
            case 1:
                direction = "east";
                x = this.state.width / 2 + 10 - (((24+(parseInt(index))*0.25) * step));
                y = this.state.height / 2 - 115 - index*4;
                break;
            case 2:
                direction = "south";
                x = this.state.width / 2 + 10 - (((24+(parseInt(index))*0.25) * 16));
                y = this.state.height /2 - 115 - index*4 + 22 * (step - 16);
                break;
            case 3:
                direction = "west";
                x = this.state.width / 2 + 10 - (((24+(parseInt(index))*0.25) * 16)) + (((21.5+(parseInt(index))*0.25) * (step-32)));
                y = this.state.height /2 - 115 - index*4 + 22 * (16);
                break;
            case 4:
                direction = "north";
                x = this.state.width / 2 + 10 - (((24+(parseInt(index))*0.25) * 16)) + (((21.5+(parseInt(index))*0.25) * (34)));
                y = this.state.height /2 - 115 - index*4 + 22 * (16) - 22 * (step - 66);
                break;
            case 5:
                direction = "east";
                x = this.state.width / 2 + 10 + (((21+(parseInt(index))*0.25) * 16)) + (83-step)*(21+(parseInt(index))*0.25);
                y = this.state.height /2 - 115 - index*4;
                break;
            default:
                break;
        }
        this.setState({direction: direction, x: x, y: y});
    }

    setRandomHorseColor(){
        if(this.state.color === "") {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            this.setState({color: color})
        }
    }

    render() {
        if(this.props.inProgress&&!this.state.running){
            this.setState({running:true});
            this.takeAStepFromApi();
            // this.takeAStepEachSecond();
        }
        return (
            <HorseSprite x={this.state.x} y={this.state.y} width="5" height="5" strokeColor={this.state.color}>
                <text x={this.state.x+10} y={this.state.y}>test</text>
            </HorseSprite>
        )
    }
}

export default Horse;