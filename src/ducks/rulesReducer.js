const initialState = {
    listOfHands: []
}


const SET_RULES = 'SET_RULES'


export function setRules(arr) {
    return {
        type: SET_RULES,
        payload: arr
    }
}

export default function rulesReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case SET_RULES:
            return {...state, listOfHands: payload}
        
        default:
            return state;
    }
}