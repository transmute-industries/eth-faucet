import { connect } from 'react-redux'
import ProfileForm from '../components/ProfileForm'
import { updateUser } from '../actions/user'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: (name) => {
      event.preventDefault();
      dispatch(updateUser(name))
    }
  }
}

const ProfileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)

export default ProfileFormContainer
