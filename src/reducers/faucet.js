
import { RECEIVE_FAUCETS, FAUCET_CREATED } from '../actions/faucet';

const initialState = {
    addresses: [],
    selected: null
};

const faucetReducer = (state = initialState, action) => {

    if (action.type === RECEIVE_FAUCETS) {
        return Object.assign(...state, state, {
            addresses: action.payload == 0 ? [] : action.payload
        })
    }

    if (action.type === FAUCET_CREATED) {
        return Object.assign(...state, state, {
            addresses: state.addresses.concat(action.payload.logs[0].address)
        })
    }

    return initialState;
}

export default faucetReducer;
