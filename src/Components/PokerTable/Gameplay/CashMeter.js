import React, {useState, useEffect, useReducer} from 'react'
import {connect} from 'react-redux'
import {setPlayerTurn, setCurrentBet, setPot} from '../../../ducks/cashReducer'
import {banker, setStatus} from '../../../ducks/pokerReducer'
import './CashMeter.scss'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {FiPlusCircle} from 'react-icons/fi'


const CashMeter = (props) => {
    const {bigBlind} = props.game.poker
    const {whosTurn} = props.cash.status
    const {pot, currentBet, minimum} = props.cash.cashFlow

    const [bet, setBet] = useState(0)
    const [minBet, setMinBet] = useState(0)
    const [active, setActive] = useState(0)
        let name = props.game.poker.players[active].username
        let transaction = props.game.poker.players[active].cash - bet
        // let transactionAll = props.game.poker.players[active].cash - bet

    const [tableBalances] = useState([
        props.game.poker.players[0].balance,
        props.game.poker.players[1].balance,
        props.game.poker.players[2].balance,
        props.game.poker.players[3].balance
    ])
        let activeBalances = [...tableBalances]

    const [toggleMeter, setToggleMeter] = useState(false)

    useEffect(() => {
        !props.cards.pocket.length 
        ? setToggleMeter(false)
        : setToggleMeter(true)
    }, [props.cards.pocket])

    useEffect(() => {
        setActive(whosTurn)
        console.log(props.game.poker.bigPosition, 'b_blind')
        console.log(props.cash.cashFlow.currentBet, 'current_bet')
    }, [whosTurn])

    useEffect(() => {
        setBet(bigBlind)
    }, [props])

    const isBetting = () => {
        setBet(bet + 10)
    }

    const placeBet = () => {
        props.setPot(bet + pot)
        props.banker(transaction, active)
        turnCounter()
    }

    const checkRaise = () => {
        props.setStatus(active, 'isRaising', true)
        turnCounter()
    }

    const checkBet = () => {
        props.setStatus(active, 'isChecking', true)
        turnCounter()
    }

    const checkFold = () => {
        props.setStatus(active, 'isFolding', true)
        turnCounter()
    }

    const goAllIn = () => {
        let money = props.game.poker.players[active].cash
            console.log(money, '$$')
        props.setStatus(active, 'isAllIn', true)
        props.setPot(money + pot)
        props.banker(0, active)
        turnCounter()
    }

    const reset = () => {
        setBet(bigBlind)
    }

    const turnCounter = () => {
        active === 3 
        ? props.setPlayerTurn(0)
        : props.setPlayerTurn(active + 1)
    }

    return (
        <div className='slide-rule' >
            {
                toggleMeter ?
                <div className='counter-parent' >
                    <p id='whos-turn' style={{color: 'silver', fontWeight: 'bold'}}> {`${name}'s Move`} </p>
                    {/* <p> ${currentBet} </p> */}
                    <div className='modal-counter' >
                        <button
                            id='ticker-btn-increment'
                            onClick={isBetting}
                            > <FiPlusCircle id='ticker' />
                            </button>
                        <p> ${bet} </p>
                        <button 
                            style={{backgroundColor: 'rgb(125, 40, 40)', color: 'white'}}
                            id='ticker-btn'
                            onClick={reset}
                            > Reset </button>
                    </div>
                    <div className='meter-actions' >
                        <button
                            id="ticker-btn"
                            onClick={checkBet} >
                            Check </button>
                        <button
                            id="ticker-btn"
                            onClick={placeBet} >
                            Bet </button>                        
                        <button
                            id="ticker-btn"
                            onClick={checkFold} >
                            Fold </button>
                        <button
                            id="ticker-btn"
                            onClick={goAllIn} >
                            All-in </button>
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setPlayerTurn,
    setPot,
    banker,
    setCurrentBet,
    setStatus
})(CashMeter)