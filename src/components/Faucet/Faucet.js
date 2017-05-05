import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import CircularProgress from 'material-ui/CircularProgress'

export default class Faucet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      address: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.address === '' && this.props.faucet.defaultAddress) {
      this.state = {
        address: this.props.faucet.defaultAddress
      }
    }
  }

  handleSendWei = () => {
    this.props.onSendWeiFormSubmit(this.props.faucet.selected.address, this.state.address, this.props.faucet.defaultAddress)
  }

  handleRequestAccess = () => {
    this.props.onRequestFaucetAccess(this.props.faucet.selected.address, this.state.address, this.props.faucet.defaultAddress)
  }

  handleNavigateToAdmin = () => {
    let path = '/faucets/' + this.props.faucet.selected.name + '/authorize-users'
    this.props.onNavigateToPath(path)
  }

  onInputChange (event) {
    this.setState({
      address: event.target.value
    })
  }

  render () {
    const { selected } = this.props.faucet

    const isLoaded = () => {
      return selected !== null
    }

    if (!isLoaded()) {
      return (
        <div style={{textAlign: 'center'}}>
          <CircularProgress mode='indeterminate' size={80} />
        </div>
      )
    } else {
      return (
        <Card>
          {selected &&
            <CardTitle
              title={selected.name + ' Faucet'} style={{ 'textTransform': 'capitalize' }}
              subtitle={'Balance: ' + selected.balance + ' Ether'}
              />
          }
          <CardText>
            <TextField
              style={{ width: '100%' }}
              id='text-field-controlled'
              floatingLabelText='Address'
              value={this.state.address}
              errorText={this.state.error}
              onChange={e => this.onInputChange(e)}
              />
            <br />
          </CardText>

          <CardActions style={{ textAlign: 'right' }}>
            <RaisedButton
              primary
              onClick={this.handleNavigateToAdmin}
              label='Admin' />
            <RaisedButton
              primary
              onClick={this.handleRequestAccess}
              label='Request Access' />
            <RaisedButton
              secondary
              style={{ marginRight: '0px' }}
              onClick={this.handleSendWei}
              label='Request 1 Ether' />
          </CardActions>
        </Card>
      )
    }
  }
}
