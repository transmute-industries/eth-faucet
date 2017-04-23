import { web3, getRandomAddress } from '../env'

export const initialState = {
    defaultAddress: null,
    addresses: []
}

import {
    RECEIVE_WEB3_ACCOUNTS,
} from '../actions/web3'

export function web3Reducer(state = initialState, action) {
    if (action.type === RECEIVE_WEB3_ACCOUNTS) {
        return Object.assign({}, state, {
            addresses: action.payload,
            defaultAddress: getRandomAddress(action.payload)
        })
    }
    return state;
}
