import React from 'react';
import { connect } from 'react-redux'
import Faucet from '../components/Faucet'
import { sendWei } from '../actions/faucet'

const mapStateToProps = (state, ownProps) => {
  console.log("state:", state);
  return {
    faucet: state.faucet,
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSendWeiFormSubmit: (_faucetAddress, _recipientAddress) => {
      event.preventDefault();
      dispatch(sendWei(_faucetAddress, _recipientAddress))
    }
  }
}

const FaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faucet)

export default FaucetContainer
