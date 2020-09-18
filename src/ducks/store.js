import {createStore, combineReducers} from 'redux'
import playerReducer from './playerReducer'
import cardsReducer from './cardsReducer'
import scoringReducer from './scoringReducer'
import cashReducer from './cashReducer'
import pokerReducer from './pokerReducer'
import rulesReducer from './rulesReducer'
import dealerReducer from './dealerReducer'

const rootReducer = combineReducers({
    user: playerReducer,
    cards: cardsReducer,
    score: scoringReducer,
    cash: cashReducer,
    game: pokerReducer,
    rules: rulesReducer,
    dealer: dealerReducer
})

export default createStore(rootReducer)