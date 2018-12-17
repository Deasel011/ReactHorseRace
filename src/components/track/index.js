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

class Track extends React.Component{
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    render(){
        return(
               <svg style={{width:"100%", height:"100%",display:"block", margin:"auto"}}>
                   <RectA x={((this.state.width/2)-500).toString()} y={((this.state.height/2)-250).toString()} rx="20" ry="20" width="1000" height="500"/>
                   <RectB x={((this.state.width/2)-350).toString()} y={((this.state.height/2)-100).toString()} rx="20" ry="20" width="700" height="200"/>
                   <StartLine x1={(this.state.width/2).toString()} y1={((this.state.height/2)-250).toString()} x2={(this.state.width/2).toString()} y2={((this.state.height/2)-100).toString()} />
                   <StartLineDecal x1={(this.state.width/2).toString()} y1={((this.state.height/2)-250+5).toString()} x2={(this.state.width/2).toString()} y2={((this.state.height/2)-100+5).toString()} />
                    <Horse step="0" lap="0" horseIndex="1"/>
                    <Horse step="0" lap="0" horseIndex="2"/>
                   <Horse step="0" lap="0" horseIndex="3"/>
                   <Horse step="0" lap="0" horseIndex="4"/>
                   <Horse step="0" lap="0" horseIndex="5"/>
                   <Horse step="0" lap="0" horseIndex="6"/>
                   <Horse step="0" lap="0" horseIndex="7"/>
                   <Horse step="0" lap="0" horseIndex="8"/>
                   <Horse step="0" lap="0" horseIndex="9"/>
                   <Horse step="0" lap="0" horseIndex="10"/>
                   <Horse step="0" lap="0" horseIndex="11"/>
                   <Horse step="0" lap="0" horseIndex="12"/>
                   <Horse step="0" lap="0" horseIndex="13"/>
                   <Horse step="0" lap="0" horseIndex="14"/>
                   <Horse step="0" lap="0" horseIndex="15"/>
                   <Horse step="0" lap="0" horseIndex="16"/>
                   <Horse step="0" lap="0" horseIndex="17"/>
                   <Horse step="0" lap="0" horseIndex="18"/>
                   <Horse step="0" lap="0" horseIndex="19"/>
                   <Horse step="0" lap="0" horseIndex="20"/>
                   <Horse step="0" lap="0" horseIndex="21"/>
                   <Horse step="0" lap="0" horseIndex="22"/>
                   <Horse step="0" lap="0" horseIndex="23"/>
                   <Horse step="0" lap="0" horseIndex="24"/>
                   <Horse step="0" lap="0" horseIndex="26"/>
                   <Horse step="0" lap="0" horseIndex="27"/>
                   <Horse step="0" lap="0" horseIndex="28"/>
                   <Horse step="0" lap="0" horseIndex="29"/>
                   <Horse step="0" lap="0" horseIndex="30"/>
               </svg>
        )
    }
}

export default Track;