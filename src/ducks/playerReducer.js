const initialState = {
    player: {}
}

const SET_PLAYER = "SET_PLAYER"
const SET_IMAGE = "SET_IMAGE"

export function setPlayer(playerObj) {
    console.log(playerObj, 'PAYLOAD')
    return {
        type: SET_PLAYER,
        payload: playerObj
    }
}

export function setImage(profilePic) {
    console.log(profilePic, 'PAYLOAD')
    return {
        type: SET_IMAGE,
        payload: profilePic
    }
}

export default function reducer (state = initialState, action) {
    const {type, payload} = action

    switch(type){     
        case SET_PLAYER:
            return {...state, player: payload};
      
        case SET_IMAGE:
            return {...state, player: {...state.player, profile_pic: payload}};
        
        default:
            return state;
    }
}