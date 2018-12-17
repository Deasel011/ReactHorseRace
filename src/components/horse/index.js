import React from 'react';
import styled from 'styled-components';

const HorseSprite = styled.rect`
    fill:black;stroke:${props => props.strokeColor};stroke-width:5;opacity:1
`

class Horse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            width: window.innerWidth,
            height: window.innerHeight,
            direction: "east",
            step: 0,
            x: 0,
            y: 0,
            horseIndex: this.props.horseIndex || 0,
            horseId: 0,
            rank: 0,
            finished: false,
            color:"",
            timeStart: null
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.placeWithStep = this.placeWithStep.bind(this);
        this.takeAStep = this.takeAStep.bind(this);
        this.setRandomHorseColor = this.setRandomHorseColor.bind(this);
        //this.takeAStepEachSecond();
    }

    componentDidMount() {
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
        this.setState({step: (this.state.step + 1) % 100});
        this.placeWithStep()
    }

    takeAStepEachSecond() {
        setTimeout(() => {
            this.takeAStep();
            this.takeAStepEachSecond()
        }, 50)
    }

    placeWithStep() {
        let x = 0, y = 0, direction;
        let step = this.state.step;
        let index = this.state.horseIndex;
        switch (step < 20 ? 1 : step < 30 ? 2 : step < 70 ? 3 : step < 80 ? 4 : 5) {
            case 1:
                direction = "east";
                x = this.state.width / 2 + 10 - (((18+(parseInt(index))*0.25) * step));
                y = this.state.height / 2 - 115 - index*4;
                break;
            case 2:
                direction = "south";
                x = this.state.width / 2 + 10 - (((18+(parseInt(index))*0.25) * 20));
                y = this.state.height /2 - 115 - index*4 + 35 * (step - 20);
                break;
            case 3:
                direction = "west";
                x = this.state.width / 2 + 10 - (((18+(parseInt(index))*0.25) * 20)) + (((18+(parseInt(index))*0.25) * (step-30)));
                y = this.state.height /2 - 115 - index*4 + 35 * (30 - 20);
                break;
            case 4:
                direction = "north";
                x = this.state.width / 2 + 10 - (((18+(parseInt(index))*0.25) * 20)) + (((18+(parseInt(index))*0.25) * (39)));
                y = this.state.height /2 - 115 - index*4 + 35 * (30 - 20) - 35 * (step - 70);
                break;
            case 5:
                direction = "east";
                x = this.state.width / 2 + 10 - (((18+(parseInt(index))*0.25) * 20)) + (((18+(parseInt(index))*0.25) * (39)))- (((18+(parseInt(index))*0.25) * (step-80)));
                y = this.state.height /2 - 115 - index*4 + 35 * (30 - 20) - 35 * (80 - 70);
                break;
            default:
                break;
        }
        this.setState({direction: direction, x: x, y: y});
    }

    setRandomHorseColor(){
        if(this.state.color === "") {
            console.log("setting color");
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            this.setState({color: color})
        }
    }

    render() {
        return (
            <HorseSprite x={this.state.x} y={this.state.y} width="5" height="5" strokeColor={this.state.color}/>
        )
    }
}

export default Horse;