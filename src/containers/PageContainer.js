import { connect } from 'react-redux'
import Page from '../components/Page'
import { loginUser, logoutUser } from '../actions/user'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: () => {
            event.preventDefault();
            dispatch(loginUser())
        },
        logoutUser: () => {
            event.preventDefault();
            dispatch(logoutUser())
        }
    }
}

const PageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)

export default PageContainer
