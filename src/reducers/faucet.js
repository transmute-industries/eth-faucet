import { LOCATION_CHANGE } from 'react-router-redux'
import {
  RECEIVE_FAUCET,
  RECEIVE_FAUCETS,
  FAUCET_CREATED,
  FAUCET_UPDATED,
  SEND_WEI
} from '../actions/faucet';
import { without } from 'lodash';
import { getFaucetByName } from '../actions/faucet';
import store from '../store';

const initialState = {
    addresses: [],
    selected: null
};

const faucetReducer = (state = initialState, action) => {

    if (action.type === RECEIVE_FAUCET) {
        return Object.assign({}, state, {
            selected: action.payload
        })
    }

    if (action.type === LOCATION_CHANGE) {
        var parts = decodeURI(action.payload.pathname).split('/');
        if (parts.length == 3 &&
            parts[1].toLowerCase() == "faucets" &&
            parts[2].length != 0) {
            store.dispatch(getFaucetByName(parts[2].toLowerCase().replace(/\s+/g, "-")));
        }
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

export default faucetReducer;
