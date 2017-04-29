import { connect } from 'react-redux'
import FaucetAdminTable from 'components/Faucet/FaucetAdminTable'
import { authorizeFaucetAccess } from 'store/ethereum/faucet'

const mapStateToProps = (state, ownProps) => {
  return {
    faucet: state.faucet,
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthorizeFaucetAccess: (_requestorAddress, _faucetAddress) => {
      event.preventDefault()
      dispatch(authorizeFaucetAccess(_requestorAddress, _faucetAddress))
    }
  }
}

const AdminContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FaucetAdminTable)

export default AdminContainer
