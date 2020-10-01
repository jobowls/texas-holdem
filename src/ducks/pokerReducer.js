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
        phase: 0
    },
    
    status: {
        paidEntry: false,
        isShuffling: false,
        winner: '',
        gameOver: false,
        isSuited: false,
        handIsOver: false
    }
}

// const HAND_IS_OVER = 'HAND_IS_OVER'
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
const CLEAR_ALL = 'CLEAR_ALL'
const SET_BALANCE = 'SET_BALANCE'
const MOVE_PHASE = 'MOVE_PHASE'

export function setStatus(index, condition, boolean) {
console.log(`${index} = i, ${condition} = cond, ${boolean} = bool`, 'PAYLOAD-STATUS')
    return {
        type: SET_STATUS,
        payload: {index, condition, boolean}
    }
}

export function movePhase(num) {
    // console.log(money, index, 'PAYLOAD-BANKER')
    return {
        type: MOVE_PHASE,
        payload: num
    }
}

export function clearAll(boolean) {
    // console.log(money, index, 'PAYLOAD-BANKER')
    return {
        type: SET_STATUS,
        payload: {boolean}
    }
}

export function setBalance(money, index) {
    console.log(money, index, 'PAYLOAD-BALANCE')
    return {
        type: SET_BALANCE,
        payload: {money, index}
    }
}

export function banker(money, index) {
    console.log(money, index, 'PAYLOAD-BANKER')
    return {
        type: BANKER,
        payload: {money, index}
    }
}

export function assignSm(index) {
    // console.log(index, 'SM-INDEX')
    return {
        type: ASSIGN_SM,
        payload: index
    }
}

export function assignBg(index) {
    // console.log(index, 'BG-INDEX')
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
    // console.log(username, 'WINNER-WINNER')
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
            return {...state, poker: {...state.poker, players: payload}};

        case ASSIGN_BUTTON:
            return {...state, poker: {...state.poker, buttonIndex: payload + 1}};
        
        case IS_SHUFFLING:
            return {...state, status: {...state.status, isShuffling: payload}};

        case GAIN_XP:
            return {...state, poker: {...state.poker, XP: payload}};
        
        case SET_SMALLBLIND:
            return {...state, poker: {...state.poker, smallBlind: payload}};    

        case SET_BIGBLIND:
            return {...state, poker: {...state.poker, bigBlind: payload}};
        
        case COUNT_ROUND:
            return {...state, poker: {...state.poker, round: payload + 1}};

        case SET_PURSE:
            return {...state, poker: {...state.poker, prizeMoney: payload}};

        case PAY_ENTRY:
            return {...state, status: {...state.status, paidEntry: payload}};

        case IS_SUITED:
            return {...state, status: {...state.status, isSuited: payload}};
            
        case HAND_IS_OVER:
            return {...state, status: {...state.status, handIsOver: payload}};
 
        case ADD_CASH:
            return {...state, poker: {...state.poker, players: payload}};

        case SET_WINNER:
            return {...state, status: {...state.status, winner: payload}};

        case ASSIGN_SM:
            return {...state, poker: {...state.poker, smallPosition: payload + 1}};

        case ASSIGN_BG:
            return {...state, poker: {...state.poker, bigPosition: payload + 1}};

        case BANKER:
                let players = [...state.poker.players]
                players[payload.index].cash = payload.money
            return {...state, poker: {...state.poker, players}};

        case SET_STATUS:
                let actives = [...state.poker.players]
                actives[payload.index][`${payload.condition}`] = payload.boolean
                console.log(actives)
            return {...state, poker: {...state.poker, actives}};

        case SET_BALANCE:
                let auditor = [...state.poker.players]
                auditor[payload.index].balance = payload.money
            return {...state, poker: {...state.poker, auditor}};

        case MOVE_PHASE:
            return {...state, poker: {...state.poker, phase: payload}};

        default:
            return state;
    }
}
