import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { signUpUser } from '../actions/user'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginFormSubmit: (name) => {
      event.preventDefault();
      dispatch(signUpUser(name))
    }
  }
}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default LoginFormContainer
