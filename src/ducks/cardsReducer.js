const initialState = {
    deck: [],
    pocket: [],
    pocketAi1: [],
    pocketAi2: [],
    pocketAi3: [],
    flop: [],
    turn: [],
    river: [],
    community: [],
    used: [],
    burned: []
}


const SET_DECK = 'SET_DECK'
const SET_POCKET = 'SET_POCKET'
const SET_POCKET_AI1 = 'SET_POCKET_AI1'
const SET_POCKET_AI2 = 'SET_POCKET_AI2'
const SET_POCKET_AI3 = 'SET_POCKET_AI3'
const SET_FLOP = 'SET_FLOP'
const SET_TURN = 'SET_TURN'
const SET_RIVER = 'SET_RIVER'
const SET_BURNED = 'SET_BURNED'
const SET_COMMUNITY = 'SET_COMMUNITY'
const SET_USED = 'SET_USED'
const RESET = 'RESET'


export function setDeck(cards) {
    return {
        type: SET_DECK,
        payload: cards
    }
}
export function setPocket(cards) {
    return {
        type: SET_POCKET,
        payload: cards
    }
}
export function setPocketAi1(cards) {
    return {
        type: SET_POCKET_AI1,
        payload: cards
    }
}
export function setPocketAi2(cards) {
    return {
        type: SET_POCKET_AI2,
        payload: cards
    }
}
export function setPocketAi3(cards) {
    return {
        type: SET_POCKET_AI3,
        payload: cards
    }
}
export function setFlop(cards) {
    return {
        type: SET_FLOP,
        payload: cards
    }
}
export function setTurn(cards) {
    return {
        type: SET_TURN,
        payload: cards
    }
}
export function setRiver(cards) {
    return {
        type: SET_RIVER,
        payload: cards
    }
}
export function setBurned(cards) {
    return {
        type: SET_BURNED,
        payload: cards
    }
}
export function setCommunity(cards) {
    return {
        type: SET_COMMUNITY,
        payload: cards
    }
}
export function setUsed(cards) {
    return {
        type: SET_USED,
        payload: cards
    }
}
export function reset(emptyArr) {
    return {
        type: RESET,
        payload: emptyArr
    }
}

export default function cardsReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
    //  PLAYER 1
        case SET_DECK:
            return {...state, deck: payload}
        case SET_POCKET:
            return {...state, pocket: payload}
            
    //  AI PLAYERS
        case SET_POCKET_AI1:
            return {...state, pocketAi1: payload}
        case SET_POCKET_AI2:
            return {...state, pocketAi2: payload}
        case SET_POCKET_AI3:
            return {...state, pocketAi3: payload}
            
    //  HOUSE
        case SET_FLOP:
            return {...state, flop: payload}
        case SET_TURN:
            return {...state, turn: payload}
        case SET_RIVER:
            return {...state, river: payload}
        case SET_BURNED:
            return {...state, burned: payload}
        case SET_COMMUNITY:
            return {...state, community: payload}
        case SET_USED:
            return {...state, used: payload}

    //  SHUFFLE => RE-DEAL
        case RESET:
            return {
                ...state,
                deck: payload,
                pocket: payload,
                pocketAi1: payload,
                pocketAi2: payload,
                pocketAi3: payload,
                flop: payload,
                turn: payload,
                river: payload,
                community: payload,
                used: payload,
                burned: payload
            }
        
        default: 
            return state;
    }
}