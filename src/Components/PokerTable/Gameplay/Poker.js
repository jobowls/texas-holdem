    //  NPM
import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
    //  LOCAL
import Game from './Game'
import Status from './Status'
    //  STYLES
import './Poker.scss'
    //  ACTIONS
import {assignSm, assignBg, payEntry, isShuffling, assignButton, gainXP, countRound, setPlayers, setBigBlind, setSmallBlind, setPurse} from '../../../ducks/pokerReducer'
import {setChipCount, setAlive} from '../../../ducks/cashReducer'
import {setRules} from '../../../ducks/rulesReducer'

const player1 = {
    username: 'Player1',
    cash: 500,
    isDealer: false,
    balance: 0,
    isBetting: false,
    isChecking: false,
    isRaising: false,
    isCalling: false,
    isFolding: false,
    isAllIn: false
}

const bots = [
    {
        username: "Hamilton",
        cash: 500,
        isDealer: false,
        balance: 0,
        isBetting: false,
        isChecking: false,
        isRaising: false,
        isCalling: false,
        isFolding: false,
        isAllIn: false
    },
    {
        username: "Burr",
        cash: 500,
        isDealer: false,
        balance: 0,
        isBetting: false,
        isChecking: false,
        isRaising: false,
        isCalling: false,
        isFolding: false,
        isAllIn: false
    },
    {
        username: "Jefferson",
        cash: 500,
        isDealer: false,
        balance: 0,
        isBetting: false,
        isChecking: false,
        isRaising: false,
        isCalling: false,
        isFolding: false,
        isAllIn: false
    }
]

const Poker = (props) => {
    const {cash} = props.user.player
    const [buyIn, setBuyIn] = useState(500)

            //  REDUX
    const launchGame = () => {

        props.setPlayers([{...player1} || props.user.player, ...bots])
        props.setSmallBlind(5)
        props.setBigBlind(10)
        props.setChipCount(buyIn)
        props.countRound(0)
        props.assignButton(0)
        props.assignSm(1)
        props.assignBg(2)
            let seats = `${buyIn}`
            let tablePurse = seats * 4
            
        props.setPurse(tablePurse)
        props.payEntry(true)
        props.isShuffling(true)
        props.setAlive([0, 1, 2, 3])

        axios.get('/api/rules')
        .then(list => props.setRules(list.data))
        .catch(err => console.log(err))
    }
    
    return (
        <div className='poker-master' >     
            {
                props.game.status.paidEntry === false 
                ? <div className='poker-master' > <Status launchGame={launchGame} /> </div>
                : <Game  />
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(
    mapStateToProps, {
        assignButton, 
        countRound, 
        gainXP,
        setBigBlind,
        setSmallBlind, 
        setChipCount,
        setPlayers, 
        setPurse, 
        isShuffling,
        payEntry,
        setRules,
        assignSm,
        assignBg,
        setAlive
    })(withRouter(Poker))