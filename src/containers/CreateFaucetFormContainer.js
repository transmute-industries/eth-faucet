import { connect } from 'react-redux'
import CreateFaucetForm from '../components/CreateFaucetForm'
import { getAllFaucets, createFaucet } from '../actions/faucet'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFaucetFormSubmit: (name) => {
      event.preventDefault();
      dispatch(createFaucet(name))
    },
    onGetAllFaucets: () => {
      event.preventDefault();
      dispatch(getAllFaucets())
    }
  }
}

const CreateFaucetFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFaucetForm)

export default CreateFaucetFormContainer
