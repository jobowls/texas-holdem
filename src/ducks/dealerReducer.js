const initialState = {
    actionReady: false,
}

const SET_NEXT_MOVE = 'SET_NEXT_MOVE'

export function setNextMove(boolean) {
    return {
        type: SET_NEXT_MOVE,
        payload: boolean
    }
}

export default function dealerReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case SET_NEXT_MOVE:
            return {...state, actionReady: payload};
        default:
            return state;
    }
}