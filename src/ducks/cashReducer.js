const initialState = {
    status: {
        isBetting: false,
        isChecking: false,
        isRaising: false,
        isCalling: false,
        isFolding: false,
        isAllIn: false,
        showAllHands: false
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

        
        default:
            return state;
    }
}

