
import { RECEIVE_FAUCETS, FAUCET_CREATED } from '../actions/faucet';

const initialState = {
    addresses: []
};

const faucetReducer = (state = initialState, action) => {

    if (action.type === RECEIVE_FAUCETS) {
        return Object.assign(...state, state, {
            addresses: action.payload
        })
    }

    if (action.type === FAUCET_CREATED) {
        console.log("payload: ", action.payload);
        return Object.assign(...state, state, {
            addresses: state.addresses.concat(action.payload.logs[0].address)
        })
    }

    return initialState;
}

export default faucetReducer;
