import { connect } from 'react-redux'
import Faucet from 'components/Faucet/Faucet'

import { browserHistory } from 'react-router'

import { sendWei, donateWei, getFaucetByName, requestFaucetAccess } from 'store/ethereum/faucet'

const mapStateToProps = (state, ownProps) => {
  return {
    faucet: state.faucet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFaucetByName: (cleanName) => {
      dispatch(getFaucetByName(cleanName))
    },
    onSendWeiFormSubmit: (_faucetAddress, _recipientAddress, _fromAddress) => {
      dispatch(sendWei(_faucetAddress, _recipientAddress, _fromAddress))
    },
    onDonateWeiFormSubmit: (_faucetAddress, _fromAddress, _amountInEther) => {
      dispatch(donateWei(_faucetAddress, _fromAddress, _amountInEther))
    },
    onRequestFaucetAccess: (_faucetAddress, _requestorAddress, _fromAddress) => {
      console.log('_faucetAddress, _requestorAddress, _fromAddress')
      console.log(_faucetAddress, _requestorAddress, _fromAddress)
      dispatch(requestFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress))
    },
    onNavigateToPath: (path) => {
      browserHistory.push(path)
    }
  }
}

const FaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faucet)

export default FaucetContainer
