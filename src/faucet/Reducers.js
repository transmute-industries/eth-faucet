
import RECEIVE_FAUCETS from './Actions'

const faucetReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_FAUCETS:
            return {
                ...state,
                faucets: action.addresses
            }
        default:
            return state
    }
}

export default faucetReducer;
