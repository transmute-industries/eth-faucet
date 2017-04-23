import { LOCATION_CHANGE } from 'react-router-redux'
import { RECEIVE_FAUCET, RECEIVE_FAUCETS, FAUCET_CREATED } from '../actions/faucet';
import { without } from 'lodash';
import { getFaucetByName } from '../actions/faucet';

const initialState = {
    addresses: [],
    selected: null
};

const faucetReducer = (state = initialState, action) => {

    if (action.type === RECEIVE_FAUCET) {
        return Object.assign(...state, state, {
            selected: action.payload
        })
    }

    if (action.type === LOCATION_CHANGE) {
        var parts = decodeURI(action.payload.pathname).split('/');
        if (parts.length == 3 &&
            parts[1].toLowerCase() == "faucets" &&
            parts[2].trim().length != 0) {
            var str = parts[2].trim();
            console.log("str:", str);
            console.log("str trimmed:", str.trim());
            getFaucetByName(parts[2].trim());
        }
    }

    if (action.type === RECEIVE_FAUCETS) {
        return Object.assign(...state, state, {
            addresses: without(action.payload, 0)
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
