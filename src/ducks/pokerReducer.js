const initialState = {
    poker: {
        prizeMoney: 0,
        players: [],
        XP: 0,
        round: 0,
        smallBlind: 0,
        smallPosition: 0,
        bigBlind: 0,
        bigPosition: 0,
        buttonIndex: 0,
        phase: 0,
        count: 0
    },
    
    status: {
        paidEntry: false,
        isShuffling: false,
        winner: '',
        winIndex: 0,
        gameOver: false,
        isSuited: false,
        handIsOver: false,
        lastManStanding: 0,
        wReady: false
    }
}


const W_READY = 'W_READY'
const HAND_IS_OVER = 'HAND_IS_OVER'
const PAY_ENTRY = 'PAY_ENTRY'
const SET_WINNER = 'SET_WINNER'
const IS_SHUFFLING = 'IS_SHUFFLING'
const ASSIGN_BUTTON = 'ASSIGN_BUTTON'
const GAIN_XP = 'GAIN_XP'
const COUNT_ROUND = 'COUNT_ROUND'
const SET_PLAYERS = 'SET_PLAYERS'
const SET_BIGBLIND = 'SET_BIGBLIND'
const SET_SMALLBLIND = 'SET_SMALLBLIND'
const SET_PURSE = 'SET_PURSE'
const IS_SUITED = 'IS_SUITED'
const ADD_CASH = 'ADD_CASH'
const ASSIGN_SM = 'ASSIGN_SM'
const ASSIGN_BG = 'ASSIGN_BG'
const BANKER = 'BANKER'
const SET_STATUS = 'SET_STATUS'
const SET_BALANCE = 'SET_BALANCE'
const MOVE_PHASE = 'MOVE_PHASE'
const SET_COUNT = 'SET_COUNT'
const END_HAND = 'END_HAND'
const SET_W_INDEX = 'SET_W_INDEX'


export function wReady(boolean) {
    return {
        type: W_READY,
        payload: boolean
    }
}

export function setWIndex(index) {
    return {
        type: SET_W_INDEX,
        payload: index
    }
}

export function endHand(index) {
    return {
        type: END_HAND,
        payload: index
    }
}

export function setStatus(index, condition, boolean) {

    return {
        type: SET_STATUS,
        payload: {index, condition, boolean}
    }
}

export function setCount(num) {
    return {
        type: SET_COUNT,
        payload: num
    }
}

export function movePhase(num) {
    return {
        type: MOVE_PHASE,
        payload: num
    }
}

export function clearAll(boolean) {
    
    return {
        type: SET_STATUS,
        payload: {boolean}
    }
}

export function setBalance(money, index) {
    return {
        type: SET_BALANCE,
        payload: {money, index}
    }
}

export function banker(money, index) {
    return {
        type: BANKER,
        payload: {money, index}
    }
}

export function assignSm(index) {
    
    return {
        type: ASSIGN_SM,
        payload: index
    }
}

export function assignBg(index) {
    
    return {
        type: ASSIGN_BG,
        payload: index
    }
}

export function addCash(pot) {
    return {
        type: ADD_CASH,
        payload: pot
    }
}

export function handIsOver(boolean) {
    return {
        type: HAND_IS_OVER,
        payload: boolean
    }
}

export function isSuited(boolean) {
    return {
        type: IS_SUITED,
        payload: boolean
    }
}

export function payEntry(boolean) {
    return {
        type: PAY_ENTRY,
        payload: boolean
    }
}
export function setWinner(username) {
    
    return {
        type: SET_WINNER,
        payload: username
    }
}

export function setPurse(num) {
    return {
        type: SET_PURSE,
        payload: num
    }
}
export function setBigBlind(num) {
    return {
        type: SET_BIGBLIND,
        payload: num
    }
}
export function setSmallBlind(num) {
    return {
        type: SET_SMALLBLIND,
        payload: num
    }
}

export function setPlayers(playerObj) {
    return {
        type: SET_PLAYERS,
        payload: playerObj
    }
}

export function countRound(num) {
    return {
        type: COUNT_ROUND,
        payload: num
    }
}

export function gainXP(num) {
    return {
        type: GAIN_XP,
        payload: num
    }
}

export function assignButton(index) {
    return {
        type: ASSIGN_BUTTON,
        payload: index
    }
}

export function isShuffling(boolean) {
    return {
        type: IS_SHUFFLING,
        payload: boolean
    }
}

export default function pokerReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case SET_PLAYERS:
            return {...state, poker: {...state.poker, players: payload}}

        case ASSIGN_BUTTON:
            return {...state, poker: {...state.poker, buttonIndex: payload}}
        
        case IS_SHUFFLING:
            return {...state, status: {...state.status, isShuffling: payload}}

        case GAIN_XP:
            return {...state, poker: {...state.poker, XP: payload}}
        
        case SET_SMALLBLIND:
            return {...state, poker: {...state.poker, smallBlind: payload}}    

        case SET_BIGBLIND:
            return {...state, poker: {...state.poker, bigBlind: payload}}
        
        case COUNT_ROUND:
            return {...state, poker: {...state.poker, round: payload + 1}}

        case SET_PURSE:
            return {...state, poker: {...state.poker, prizeMoney: payload}}

        case PAY_ENTRY:
            return {...state, status: {...state.status, paidEntry: payload}}

        case IS_SUITED:
            return {...state, status: {...state.status, isSuited: payload}}
            
        case HAND_IS_OVER:
            return {...state, status: {...state.status, handIsOver: payload}}
 
        case ADD_CASH:
            return {...state, poker: {...state.poker, players: payload}}

        case SET_WINNER:
            return {...state, status: {...state.status, winner: payload}}

        case SET_W_INDEX:
            return {...state, status: {...state.status, winIndex: payload}}

        case ASSIGN_SM:
            return {...state, poker: {...state.poker, smallPosition: payload}}

        case ASSIGN_BG:
            return {...state, poker: {...state.poker, bigPosition: payload}}

        case BANKER:
            let players = [...state.poker.players]
            players[payload.index].cash = payload.money
            
            return {...state, poker: {...state.poker, players}}

        case SET_STATUS:
            let actives = [...state.poker.players]
            actives[payload.index][`${payload.condition}`] = payload.boolean

            return {...state, poker: {...state.poker, actives}}

        case SET_BALANCE:
                let auditor = [...state.poker.players]
                auditor[payload.index].balance = payload.money
            return {...state, poker: {...state.poker, auditor}}

        case MOVE_PHASE:
            return {...state, poker: {...state.poker, phase: payload}}

        case SET_COUNT:
            return {...state, poker: {...state.poker, count: payload}}

        case END_HAND:
            return {...state, status: {...state.status, lastManStanding: payload}}

        case W_READY:
            return {...state, status: {...state.status, wReady: payload}}

        default:
            return state;
    }
}
