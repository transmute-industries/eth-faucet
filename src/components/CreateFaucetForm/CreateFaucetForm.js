import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import CircularProgress from 'material-ui/CircularProgress'


export default class CreateFaucetForm extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      error: '',
      faucetName: ''
    }
  }

  handleCreateFaucet = () => {
    let cleanName = this.state.faucetName.toLowerCase().replace(/\s+/g, '-')
    this.props.onCreateFaucetSubmit({
      name: cleanName,
      fromAddress: this.props.faucet.defaultAddress
    })
  }

  onInputChange (event) {
    var errorText = /^[a-zA-Z\s]*$/.test(event.target.value) ? '' : 'Invalid name, please only use letters and spaces'
    this.setState({
      error: errorText,
      faucetName: event.target.value
    })
  }

  render () {
      let { faucet } = this.props;
      return (
        <Card>
          <CardTitle
            title='Create Faucet'
            subtitle='One per account address.'
            />
          <CardText>
            <TextField
              style={{ width: '100%' }}
              id='text-field-controlled'
              floatingLabelText='Name'
              value={this.state.faucetName}
              errorText={this.state.error}
              onChange={e => this.onInputChange(e)}
              />
          </CardText>
          <CardActions style={{textAlign: 'right'}}>
            <RaisedButton
              style={{marginRight: '0px'}}
              secondary={true}
              onClick={this.handleCreateFaucet}
              disabled={this.state.error.length > 0 || this.state.faucetName.trim().length === 0}
              label='Create' />
          </CardActions>
        </Card>
      )
  }
}
