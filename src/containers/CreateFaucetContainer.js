import { connect } from 'react-redux'
import CreateFaucetForm from 'components/CreateFaucetForm'
import { getAllFaucetObjects, createFaucet } from 'store/ethereum/faucet'

const mapStateToProps = (state, ownProps) => {
  return {
    faucet: state.faucet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFaucetSubmit: (data) => {
      event.preventDefault()
      dispatch(createFaucet(data.name, data.fromAddress))
    },
    onGetAllFaucets: () => {
      event.preventDefault()
      dispatch(getAllFaucetObjects())
    }
  }
}

const CreateFaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFaucetForm)

export default CreateFaucetContainer
