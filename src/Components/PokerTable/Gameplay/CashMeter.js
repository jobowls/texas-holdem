import React, {useState, useEffect, useReducer} from 'react'
import {connect} from 'react-redux'
import {setPlayerTurn, setCurrentBet, setPot, checkPot} from '../../../ducks/cashReducer'
import {banker, movePhase, setBalance, setStatus} from '../../../ducks/pokerReducer'
import './CashMeter.scss'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {FiPlusCircle} from 'react-icons/fi'


const CashMeter = (props) => {
    const {bigBlind, players} = props.game.poker
    const {whosTurn} = props.cash.status
    const {pot, currentBet} = props.cash.cashFlow

    const [bet, setBet] = useState(0)
    const [active, setActive] = useState(0)
    const [toggleMeter, setToggleMeter] = useState(false)
        let runningTotal = [players[0].balance, players[1].balance, players[2].balance, players[3].balance]
            let sorted = [...runningTotal].sort((a, b) => a - b).reverse()
            let currBet = sorted[0]
        let name = props.game.poker.players[active].username
        let transaction = props.game.poker.players[active].cash - bet
        let raiseAmount = (currentBet - runningTotal[active]) + bet
    
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        !props.cards.pocket.length 
        ? setToggleMeter(false)
        : setToggleMeter(true)
    }, [props.cards.pocket])

    useEffect(() => {
        setActive(whosTurn)
        console.log(`=>> running_total ${runningTotal}`)
        // console.log(`=>> running_total ${tableBalances}`)
    }, [whosTurn])

    useEffect(() => {
        if (phase === 4) {
            checkPotBalance()
        }
    }, [phase])

    useEffect(() => {
        console.log(props.cash.cashFlow.currentBet, 'AUDIT =>> REDUX')
    }, [props.cash.cashFlow.currentBet])

    // useEffect(() => {
    //     setBet(bigBlind)
    // }, [bigBlind])

    useEffect(() => {
        console.log(currBet, 'SHOULD BE HIGHEST BET THUS FAR')
        if (currBet > currentBet) {
            props.setCurrentBet((bet - currentBet) + currentBet)
        }
    }, [bet, currentBet, currBet])

    const isBetting = () => {
        setBet(bet + 10)
    }

    const placeBet = () => {
        let money = bet + runningTotal[active]
        props.setPot(bet + pot)
        props.banker(transaction, active)
        props.setCurrentBet(currentBet + bet)
        props.setBalance(money, active)
        setBet(bigBlind)
        turnCounter()
        setPhase(phase + 1)
    }

    const checkRaise = () => {
        let money = bet + runningTotal[active]
        props.setStatus(active, 'isRaising', true)
        props.setPot(raiseAmount + pot)
        props.banker(transaction, active)
        props.setBalance(money, active)
        turnCounter()
        setPhase(phase + 1)
    }

    const checkBet = () => {
        props.setStatus(active, 'isChecking', true)
        turnCounter()
        setPhase(phase + 1)
    }

    const checkFold = () => {
        props.setStatus(active, 'isFolding', true)
        turnCounter()
        setPhase(phase + 1)
    }

    const checkCall = () => {
        let money = players[active].cash - (currBet - runningTotal[active])
        let placing = currBet - runningTotal[active]
            console.log(placing, 'PLACING $')
            // console.log(money, 'SHOULD BE THE CORRECT FUCKING DOLLAR AMOUNT!!!')
        props.setStatus(active, 'isCalling', true)
        props.setPot(placing + pot)
        props.banker(money, active)
        props.setBalance(currentBet, active)
        turnCounter()
        setPhase(phase + 1)
    }

    const goAllIn = () => {
        let money = props.game.poker.players[active].cash
            console.log(money, '$$')
        props.setStatus(active, 'isAllIn', true)
        props.setPot(money + pot)
        props.banker(0, active)
        turnCounter()
        setPhase(phase + 1)
    }

    const checkPotBalance = () => {
        let amount = pot / players.length
            console.log('amount', amount, 'currBet', currBet)

        if (pot / players.length === currBet) {
            props.movePhase(props.game.poker.phase + 1)
            props.checkPot(true)
            setPhase(0)
        }
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
                        {
                            runningTotal[active] < currBet ?
                            <>
                                <button
                                    id="ticker-btn"
                                    onClick={checkCall} >
                                    {`Call ${currBet - runningTotal[active]}`} </button>
                                <button
                                    id="ticker-btn"
                                    onClick={checkRaise} >
                                    Raise </button>
                                <button
                                    id="ticker-btn"
                                    onClick={checkFold} >
                                    Fold </button>    
                            </>
                            :
                            <>
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
                            </>
                        }                       
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
    setStatus,
    setBalance,
    checkPot,
    movePhase
})(CashMeter)