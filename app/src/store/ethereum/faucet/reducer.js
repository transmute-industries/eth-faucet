// import { LOCATION_CHANGE } from 'react-router-redux'

// if (action.type === LOCATION_CHANGE) {
//     var parts = decodeURI(action.payload.pathname).split('/');
//     if (parts.length == 3 &&
//         parts[1].toLowerCase() == "faucets" &&
//         parts[2].length != 0) {
//         store.dispatch(getFaucetByName(parts[2].toLowerCase().replace(/\s+/g, "-")));
//     }
// }
// import { getFaucetByName } from './actions';
// import store from 'store';

import {
    RECEIVE_FAUCET,
    RECEIVE_FAUCETS,
    FAUCET_CREATED,
    FAUCET_UPDATED,
    SEND_WEI
} from './actions';
import { without } from 'lodash';

export const initialState = {
    addresses: [],
    selected: null
};

export const faucetReducer = (state = initialState, action) => {

    if (action.type === RECEIVE_FAUCET) {
        return Object.assign({}, state, {
            selected: action.payload
        })
    }

    if (action.type === RECEIVE_FAUCETS) {
        return Object.assign({}, state, {
            addresses: without(action.payload, 0)
        })
    }

    if (action.type === FAUCET_CREATED) {
        return Object.assign({}, state, {
            addresses: state.addresses.concat(action.payload.logs[0].address)
        })
    }

    if (action.type === FAUCET_UPDATED) {
        console.log("state.selected:", state.selected.balance);
        return Object.assign({}, state, {
            selected: {
                ...state.selected,
                balance: state.selected.balance - 1
            }
        })
    }

    return state;
}

