import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import CircularProgress from 'material-ui/CircularProgress'


class FaucetAuthorizeTable extends React.Component {

  constructor(props) {
    super(props)

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
      dialogOpen: false,
      selectedRequestor: null
    }
  }

  onRowSelection = (index) => {
    var requestorAddress = this.props.faucet.selected.requestorAddresses[index]

    if (requestorAddress) {
      this.setState({
        dialogOpen: true,
        selectedRequestor: requestorAddress
      })
    }


  }

  renderTableHeaderFooter() {
    return (
      <TableRow>
        <TableHeaderColumn tooltip='Address'>Address</TableHeaderColumn>
      </TableRow>
    )
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
      selectedRequestor: null
    })
  }

  handleAuthorizeRequestorAddress = () => {
    this.props.onAuthorizeFaucetAccess({
      faucetAddress: this.props.faucet.selected.address,
      requestorAddress: this.state.selectedRequestor,
      fromAddress: this.props.faucet.defaultAddress
    })
  }


  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label='Confirm'
        primary
        keyboardFocused
        onTouchTap={this.handleAuthorizeRequestorAddress}
      />
    ]

    const isLoaded = () => {
      return this.props.faucet.selected !== null;
    }
    
    if (!isLoaded()){
      return (
        <div style={{textAlign: 'center'}}>
          <CircularProgress mode='indeterminate' size={80} />
        </div>
      );
    } else {
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
            {isLoaded() && this.props.faucet.selected.requestorAddresses.map((address, index) => (
              <TableRow key={index}>
                <TableRowColumn>{address}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          title='Grant Access?'
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleCloseDialog}
        >
          Are you sure you want to grant {this.state.selectedRequestor !== null && this.state.selectedRequestor} access to this faucet?
        </Dialog>
      </div>
    )
    } 
  }
}

export default FaucetAuthorizeTable
