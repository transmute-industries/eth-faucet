
import { RECEIVE_FAUCETS, FAUCET_CREATED } from './Actions';

const initialState = {
    lastCreated: null,
    addresses: []
};

const faucetReducer = (state = initialState, action) => {

    if (action.type === RECEIVE_FAUCETS) {
        state.addresses = action.payload;
    }

    if (action.type === FAUCET_CREATED) {
        state.lastCreated = action.payload;
    }

    return state;
}

export default faucetReducer;
