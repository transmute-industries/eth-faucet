import { connect } from 'react-redux'
import Faucet from 'components/Faucet/Faucet'
import { sendWei, getFaucetByName } from 'store/ethereum/faucet'

const mapStateToProps = (state, ownProps) => {
  return {
    faucet: state.faucet,
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFaucetByName: (cleanName) => {
      event.preventDefault()
      dispatch(getFaucetByName(cleanName))
    },
    onSendWeiFormSubmit: (_faucetAddress, _recipientAddress, _fromAddress) => {
      event.preventDefault()
      dispatch(sendWei(_faucetAddress, _recipientAddress, _fromAddress))
    }
  }
}

const FaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faucet)

export default FaucetContainer
