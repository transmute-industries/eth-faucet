import { connect } from 'react-redux'
import FaucetAuthorizeTable from 'components/FaucetAuthorizeTable'

import { authorizeFaucetAccess, getFaucetByName } from 'store/ethereum/faucet'

const mapStateToProps = (state, ownProps) => {
    return {
        faucet: state.faucet
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetFaucetByName: (cleanName) => {
            event.preventDefault()
            dispatch(getFaucetByName(cleanName))
        },
        onAuthorizeFaucetAccess: (authorizeFaucetAccessBindingModel) => {
            event.preventDefault()
            console.log('check these obj params...', authorizeFaucetAccessBindingModel)
            dispatch(authorizeFaucetAccess(
                authorizeFaucetAccessBindingModel.requestorAddress,
                authorizeFaucetAccessBindingModel.faucetAddress,
                authorizeFaucetAccessBindingModel.fromAddress
            ))
        }
    }
}

const FaucetAuthorizeTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FaucetAuthorizeTable)

export default FaucetAuthorizeTableContainer
