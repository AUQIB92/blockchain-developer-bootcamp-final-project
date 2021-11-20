import {
    defineState
} from 'redux-localstore';
const defaultState = {
    address: "0x",
    balance: 0,
    chainId: 0,
    realContract: "0x5500A05a87d5D2d63a98b3B3b86dC853bbfc49DD",
    mayor: null

};
const initialState = defineState(defaultState)('blockchainReducer');
export default function blockchainReducer(state = initialState, action) {
    switch (action.type) {
        case "change_address":
            return {
                ...state, address: action.payload
            };
        case "change_balance":
            return {
                ...state, balance: action.payload
            };
        case "change_chanId":
            return {
                ...state, chainId: action.payload
            };
        case "set_mayor":
            return {
                ...state, mayor: action.payload
            };
        default:
            return state

    }

}