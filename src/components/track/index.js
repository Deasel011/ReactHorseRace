import React from 'react';
import styled from 'styled-components';
import Horse from "../horse";

const RectA = styled.rect`
fill:#6f3f16;stroke:black;stroke-width:5;opacity:1
`;
const RectB = styled.rect`
fill:green;stroke:black;stroke-width:5;opacity:1
`;

const StartLine = styled.line`
fill:red;stroke:white;stroke-width:5;opacity:1;stroke-dasharray:5,5
`;
const StartLineDecal = styled.line`
fill:red;stroke:red;stroke-width:5;opacity:1;stroke-dasharray:5,5
`;

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0, horseList: []};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.makeHorsesRun = this.makeHorsesRun.bind(this);
        this.updateHorseList = this.updateHorseList.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.makeHorsesRun();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    makeHorsesRun() {
        for(let horse in this.props.horses){
            horse.takeAStepFromApi()
        }
    }

    updateHorseList(name){
        let horseList = this.state.horseList.slice();
        let indx = horseList.findIndex(x=>x.name===name);
        if(indx<0){
            horseList.push({name:name,time:Date.now()});
            this.setState({horseList:horseList});
        }
    }


    render() {
        let horseCount = this.props.horses.length;
        return (
            <svg style={{width: "100%", height: "100%", display: "block", margin: "auto"}}>
                <RectA x={((this.state.width / 2) - 500).toString()} y={((this.state.height / 2) - 250).toString()}
                       rx="20" ry="20" width="1000" height="500"/>
                <RectB x={((this.state.width / 2) - 350).toString()} y={((this.state.height / 2) - 100).toString()}
                       rx="20" ry="20" width="700" height="200"/>
                <StartLine x1={(this.state.width / 2).toString()} y1={((this.state.height / 2) - 250).toString()}
                           x2={(this.state.width / 2).toString()} y2={((this.state.height / 2) - 100).toString()}/>
                <StartLineDecal x1={(this.state.width / 2).toString()}
                                y1={((this.state.height / 2) - 250 + 5).toString()}
                                x2={(this.state.width / 2).toString()}
                                y2={((this.state.height / 2) - 100 + 5).toString()}/>
                {
                    this.props.horses.map((horse, i) => {
                        this.updateHorseList(horse.name);
                        return <Horse key={i} step="0" lap="0" horseIndex={horseCount <= 5 ? i * 6 : horseCount <= 10 ? i * 3 : i}
                                      horse={horse} inProgress={this.props.inProgress} roomid={this.props.roomid}/>
                    })
                }
            </svg>
        )
    }
}

export default Track;