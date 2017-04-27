import { connect } from 'react-redux'
import CreateFaucet from '../components/CreateFaucet'
import { getAllFaucets, createFaucet } from '../actions/faucet'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFaucetSubmit: (name) => {
      event.preventDefault();
      dispatch(createFaucet(name))
    },
    onGetAllFaucets: () => {
      event.preventDefault();
      dispatch(getAllFaucets())
    }
  }
}

const CreateFaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFaucet)

export default CreateFaucetContainer
