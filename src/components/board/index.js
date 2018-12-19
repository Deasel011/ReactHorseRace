import React from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import "react-table/react-table.css"
import axios from "axios";


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, horses: [], roomid:props.roomid };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.obtainGameInfo = this.obtainGameInfo.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.obtainGameInfo()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    obtainGameInfo(){
        axios.get(`https://iahorserace.azurewebsites.net//games/`+this.state.roomid)
            .then(res => {
                if(!this.state.race_started){
                    this.setState({horses:res.data.horses});
                }
            });
        if(!this.state.race_started){
            setTimeout(()=>{this.obtainGameInfo()}, 1000)
        }
    }

    render() {
        if(this.props.showResults) {
            const columns = [
                {Header:'Top Horses', accessor:'name'},
                {Header:'Steps Taken', accessor:'position.steps'},
                {Header:'Time Spent',accessor:'position.timeInMillis'}
            ];
            let width = this.state.width / 2 - 100;
            return (
                <ReactTable
                    data={this.state.horses}
                    columns={columns}
                    defaultPageSize={this.props.pageSize}
                    className="-striped"
                    style={{position: "absolute", left: width}}
                    showPagination={false}
                    loadingText=""
                    defaultSorted={[{id:'position.steps', desc:true},{id:'position.timeInMillis', desc:false}]}
                />
            )
        }
        return "";
    }
}

export default Board;