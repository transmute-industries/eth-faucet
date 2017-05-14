import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Container, Row, Col } from 'react-grid-system'

import CircularProgress from 'material-ui/CircularProgress'
import TransactionSnackbar from '..//common/TransactionSnackbar'

import { has } from 'lodash'

export default class Faucet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultAddress: '',
      selectedAddress: '',
      selectedAddressError: '',
      donationAmount: '',
      donationError: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      selectedAddress: this.props.faucet.defaultAddress,
      defaultAddress: this.props.faucet.defaultAddress
    })
  }

  handleSendWei = () => {
    if (this.props.faucet.authorizedAddressReadModel !== null &&
      this.hasAccess(this.state.defaultAddress)) {
        this.props.onSendWeiFormSubmit(this.props.faucet.selected.address, this.state.selectedAddress, this.state.defaultAddress)
        this.setState({
          selectedAddress: ''
        })
    }
  }

  handleDonateWei = () => {
    this.props.onDonateWeiFormSubmit(this.props.faucet.selected.address, this.state.defaultAddress, this.state.donationAmount)
    this.setState({
      donationAmount: ''
    })
  }

  handleRequestAccess = () => {
    if (!this.isOwner() && (this.props.faucet.authorizedAddressReadModel === null ||
    !this.hasRequestedAccess(this.state.selectedAddress))) {
      this.props.onRequestFaucetAccess(this.props.faucet.selected.address, this.state.selectedAddress, this.state.defaultAddress)
    }
  }

  handleNavigateToAdmin = () => {
    if (this.isOwner()) {
      let path = '/faucets/' + this.props.faucet.selected.name + '/authorize-users'
      this.props.onNavigateToPath(path)
    }
  }

  hasRequestedAccess = (address) => {
    return has(this.props.faucet.authorizedAddressReadModel, address)
  }

  hasAccess = (address) => {
    return this.hasRequestedAccess(address) &&
    this.props.faucet.authorizedAddressReadModel[address] === 'Granted'
  }

  getStatus = (address) => {
    return this.props.faucet.authorizedAddressReadModel[address]
  }

  isOwner = () => {
    return this.props.faucet.isOwner
  }

  onSelectedAddressChange (event) {
    var errorText = (/^(0x)?[0-9a-f]{40}$/.test(event.target.value) || /^(0x)?[0-9A-F]{40}$/.test(event.target.value)) ? '' : 'Invalid address'
    this.setState({
      selectedAddressError: errorText,
      selectedAddress: event.target.value
    })
  }

  onDonationAmountChange (event) {
    var errorText = /^0*[1-9]\d*$/.test(event.target.value) ? '' : 'Invalid Amount, Please Input a Positive Whole Number'
    this.setState({
      donationError: errorText,
      donationAmount: event.target.value
    })
  }

  render () {
    const { selected, authorizedAddressReadModel } = this.props.faucet

    const isLoaded = () => {
      return authorizedAddressReadModel !== null
    }

    if (!isLoaded()) {
      return (
        <div style={{textAlign: 'center'}}>
          <CircularProgress mode='indeterminate' size={80} />
        </div>
      )
    } else {
      return (
        <Container>
          <Row>
            <Col xs={12} md={12} lg={6} className="">
              <Card>
                {selected &&
                  <CardTitle
                    title='Request Ether'
                    subtitle={'Balance: ' + selected.balance + ' Ether'}
                    />
                }
                <CardText>
                  <TextField
                    style={{ width: '100%' }}
                    floatingLabelText='Address'
                    value={this.state.selectedAddress}
                    errorText={this.state.selectedAddressError}
                    onChange={e => this.onSelectedAddressChange(e)}
                    />
                  <br />
                </CardText>

                <CardActions style={{ textAlign: 'right' }}>
                  {
                    this.isOwner() &&
                    <RaisedButton
                      primary
                      onClick={this.handleNavigateToAdmin}
                      label='Admin' />
                  }
                  {
                    !this.isOwner() && (authorizedAddressReadModel === null ||
                      !this.hasRequestedAccess(this.state.defaultAddress)) &&
                      <RaisedButton
                        primary
                        onClick={this.handleRequestAccess}
                        disabled={this.state.selectedAddressError.length > 0}
                        label='Request Access' />
                    }
                    {
                      !this.isOwner() &&
                      (this.hasRequestedAccess(this.state.defaultAddress) &&
                      !this.hasAccess(this.state.defaultAddress)) &&
                      <FlatButton
                        disabled
                        label='Access Pending' />
                    }
                    {
                      <RaisedButton
                        secondary
                        onClick={this.handleSendWei}
                        disabled={selected.balance === 0 ||
                          this.state.selectedAddressError.length > 0 ||
                          !this.hasAccess(this.state.defaultAddress)}
                          label='Request 1 Ether' />
                      }
                    </CardActions>
                  </Card>
                </Col>
                <Col xs={12} md={12} lg={6} className="">
                  <Card>
                    {selected &&
                      <CardTitle
                        title='Donate Ether'
                        subtitle={'Balance: ' + selected.balance + ' Ether'}
                        />
                    }
                    <CardText>
                      <TextField
                        style={{ width: '100%' }}
                        type='number'
                        floatingLabelText='Donation Amount'
                        value={this.state.donationAmount}
                        errorText={this.state.donationError}
                        onChange={e => this.onDonationAmountChange(e)}
                        />
                      <br />
                    </CardText>

                    <CardActions style={{ textAlign: 'right' }}>
                      {
                        <RaisedButton
                          secondary
                          onClick={this.handleDonateWei}
                          disabled={this.state.donationError.length > 0 || this.state.donationAmount.length === 0}
                          label={'Donate ' + this.state.donationAmount + ' Ether'} />
                      }
                    </CardActions>
                  </Card>
                </Col>
              </Row>
              <TransactionSnackbar
                faucet={selected}
              />
            </Container>
          )
        }
      }
    }
