import {defineState} from 'redux-localstore';
const defaultState = {
    address: "",
    balance: 0,
    chainId: 0,
    realContract: "0x9F5DE1EAcd0039a4F855e9414F5013b3c0d7bC5F",
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