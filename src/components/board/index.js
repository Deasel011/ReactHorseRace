import React from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import "react-table/react-table.css"


class Board extends React.Component {
    constructor() {
        super();
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

    render() {
        if(this.props.showResults) {
            const columns = [
                {Header: 'Position', accessor: 'position.rank'},
                {Header: 'Name', accessor: 'name'}
            ];
            let width = this.state.width / 2 - 100;
            return (
                <ReactTable
                    data={this.props.horses}
                    columns={columns}
                    defaultPageSize={this.props.pageSize}
                    className="-striped"
                    style={{position: "absolute", left: width}}
                    showPagination={false}
                    loadingText=""
                    defaultSorted={[{id: 'position.rank'}]}
                />
            )
        }
        return "";
    }
}

export default Board;