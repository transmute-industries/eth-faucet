import React from 'react';


import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';

class FaucetTable extends React.Component {

    // Material-UI Alpha Documentation
    // https://material-ui-1dab0.firebaseapp.com/

    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: false,
            showFooter: false,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: 'auto',
        };
    }

    onRowSelection = (index) => {
        // do nothing
    };

    renderTableHeaderFooter() {
        return (
            <TableRow>
                <TableHeaderColumn tooltip="Address">Address</TableHeaderColumn>
            </TableRow>
        );
    }

    render() {
        return (
            <div>
                <Table
                    height={this.state.height}
                    onRowSelection={this.onRowSelection}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    bodyStyle={{ overflow: 'visible' }}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        {this.renderTableHeaderFooter()}
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.props.faucet.addresses.map((row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{row.address}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default FaucetTable