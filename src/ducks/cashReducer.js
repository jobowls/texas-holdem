const initialState = {
    status: {        
        showAllHands: false,
        whosTurn: 0,
        potIsGood: false
    },

    cashFlow: {
        chipCount: 0,
        pot: 0,
        sidePot: 0,
        currentBet: 0,
    }
}

const SET_CHIP_COUNT = 'SET_CHIP_COUNT'
const SHOW_ALL_HANDS = 'SHOW_ALL_HANDS'
const SET_POT = 'SET_POT'
const SET_PLAYER_TURN = 'SET_PLAYER_TURN'
const SET_CURRENT_BET = 'SET_CURRENT_BET'
const SET_PLAYER_STATUS = 'SET_PLAYER_STATUS'
const CHECK_POT = 'CHECK_POT'

export function checkPot(boolean) {
    return {
        type: CHECK_POT,
        payload: boolean
    }
}

export function setPlayerStatus(boolean) {
    return {
        type: SET_PLAYER_STATUS,
        payload: boolean
    }
}

export function setCurrentBet(money) {
    return {
        type: SET_CURRENT_BET,
        payload: money
    }
}

export function setPlayerTurn(index) {
    return {
        type: SET_PLAYER_TURN,
        payload: index
    }
}

export function setPot(chips) {
    return {
        type: SET_POT,
        payload: chips
    }
}

export function showAllHands(boolean) {
    return {
        type: SHOW_ALL_HANDS,
        payload: boolean
    }
}

export function setChipCount(num) {
    return {
        type: SET_CHIP_COUNT,
        payload: num
    }
}

export default function cashReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case SET_CHIP_COUNT:
            return {...state, cashFlow: {...state.cashFlow, chipCount: payload}};

        case SHOW_ALL_HANDS:
            return {...state, status: {...state.status, showAllHands: payload}};
        
        case SET_POT:
            return {...state, cashFlow: {...state.cashFlow, pot: payload}};

        case SET_PLAYER_TURN:
            return {...state, status: {...state.status, whosTurn: payload}};

        case SET_CURRENT_BET:
            return {...state, cashFlow: {...state.cashFlow, currentBet: payload}};

        case CHECK_POT:
            return {...state, status: {...state.status, potIsGood: payload}};
        
        default:
            return state;
    }
}

