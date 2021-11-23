import {defineState} from 'redux-localstore';
const defaultState = {
    address: "0x",
    balance: 0,
    chainId: 0,
    realContract: "0x9601cD9DeDE694A0a933856a406Da5Ab53EC5894",
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