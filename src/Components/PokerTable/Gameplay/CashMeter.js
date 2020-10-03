import React, {useState, useEffect, useReducer} from 'react'
import {connect} from 'react-redux'
import {setPlayerTurn, setCurrentBet, setPot, checkPot} from '../../../ducks/cashReducer'
import {banker, movePhase, setBalance, setStatus} from '../../../ducks/pokerReducer'
import './CashMeter.scss'
import {FiPlusCircle} from 'react-icons/fi'


const CashMeter = (props) => {
    const {players} = props.game.poker
    const {whosTurn} = props.cash.status
    const {pot, currentBet} = props.cash.cashFlow

    const [bet, setBet] = useState(0)
    const [toggleMeter, setToggleMeter] = useState(false)
    const [phase, setPhase] = useState(0)
    const [active, setActive] = useState(0)
    const [minimum, setMinimum] = useState(0)
        let name = players[active].username        
    
    let tableBalance = [
        players[0].balance,
        players[1].balance,
        players[2].balance,
        players[3].balance
    ]
        let runningTotal = [...tableBalance]
        let activeBalance = runningTotal[active]

    let liveMoney = [
        players[0].cash,
        players[1].cash,
        players[2].cash,
        players[3].cash
    ]
        let activeMoney = liveMoney[active]

    useEffect(() => {
        !props.cards.pocket.length 
        ? setToggleMeter(false)
        : setToggleMeter(true)
    }, [props.cards.pocket])

    useEffect(() => {
        if (phase >= 4) {
            checkPotBalance()
        }
    }, [phase])

    useEffect(() => {
        setMinimum(newMinimum)
        setActive(whosTurn)
            console.log(`POT:${pot}, AMOUNT:${newMinimum}, RUNNING_TOTAL:${runningTotal}, LIVE_MONEY:${liveMoney}`)
    }, [whosTurn])

    const findMinimum = (arr) => {
        return Math.max(...arr)
    }
        let newMinimum = findMinimum(tableBalance)

    const setCall = () => {
        let community = minimum - activeBalance
        let pay = activeMoney - community
        //  REDUX =>>
        props.setStatus(active, 'isCalling', true)
        props.setBalance(minimum, active)
        props.setPot(pot + community)
        props.banker(pay, active)
        //  STATE =>>
        setPhase(phase + 1)
        turnCounter()        
    }

    const setFold = () => {
        props.setStatus(active, 'isFolding', true)
        runningTotal.splice(active, 1)
        setPhase(phase + 1)
        turnCounter()
    }
    
    const placeBet = () => {
        let updateBalance = bet
        let pay = activeMoney - updateBalance
        //  REDUX =>>
        props.setStatus(active, 'isBetting', true)
        props.setBalance(updateBalance, active)
        props.setPot(bet + pot)
        props.banker(pay, active)
        //  STATE =>>
        setPhase(phase + 1)
        turnCounter()        
    }

    const setRaise = () => {
        let updateBalance = bet + minimum
        let pay = activeMoney - updateBalance
        //  REDUX =>>
        props.setStatus(active, 'isRaising', true)
        props.setBalance(updateBalance, active)
        props.setPot(updateBalance + pot)
        props.banker(pay, active)
        //  STATE =>>
        setPhase(phase + 1)
        turnCounter()        
    }

    const goAllIn = () => {
        let updateBalance = activeMoney
        //  REDUX =>>
        props.setStatus(active, 'isAllIn', true)
        props.setBalance(updateBalance, active)
        props.setPot(updateBalance + pot)
        props.banker(0, active)
        //  STATE =>>
        setPhase(phase + 1)
        turnCounter()        
    }

    const setCheck = () => {
        setPhase(phase + 1)
        turnCounter()
    }

    const reset = () => {
        setBet(0)
    }

    const handleChange = () => {
        setBet(bet + 10)        
    }

    const turnCounter = () => {
        reset()
        active === 3
        ? props.setPlayerTurn(0)
        : props.setPlayerTurn(active + 1)
    }

    const checkPotBalance = () => {        
        let amount = (e => e === minimum)

        if (runningTotal.every(amount)) {
            props.movePhase(props.game.poker.phase + 1)
            props.checkPot(true)
            setPhase(0)
        }
    }

    return (
        <div className='slide-rule' >
            {
                toggleMeter ?
                <div className='counter-parent' >
                    <p id='whos-turn' style={{color: 'silver', fontWeight: 'bold'}}> {`${name}'s Move`} </p>
                    <p style={{color: 'silver', fontWeight: 'bold'}} > Pay to Play: ${minimum.toFixed(2)} </p>
                    <div className='modal-counter' >
                        <button
                            id='ticker-btn-increment'
                            onClick={handleChange}
                            > <FiPlusCircle id='ticker' />
                            </button>
                        <p> ${bet} </p>
                        <button 
                            id='ticker-btn-reset'
                            onClick={reset}
                            > Reset </button>
                    </div>
                    <div className='meter-actions' >
                        {
                            // activeMoney <= minimum ?
                            // <>
                            //     <button
                            //         id="ticker-btn"
                            //         onClick={setCall} >
                            //         {`Call ${minimum - activeBalance}`} </button>
                            //     <button
                            //         id="ticker-btn"
                            //         onClick={setFold} >
                            //         Fold </button>    
                            // </>
                            // :
                            activeBalance < minimum ?
                            <>
                                <button
                                    id="ticker-btn"
                                    onClick={setCall} >
                                    {`Call ${minimum - activeBalance}`} </button>
                                <button
                                    id="ticker-btn"
                                    onClick={setRaise} >
                                    Raise </button>
                                <button
                                    id="ticker-btn"
                                    onClick={goAllIn} >
                                    All-in </button>
                                <button
                                    id="ticker-btn"
                                    onClick={setFold} >
                                    Fold </button>    
                            </>
                            :
                            <>
                                 <button
                                    id="ticker-btn"
                                    onClick={setCheck} >
                                    Check </button>
                                <button
                                    id="ticker-btn"
                                    onClick={placeBet} >
                                    Bet </button>
                                <button
                                    id="ticker-btn"
                                    onClick={placeBet} >
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

 // useEffect(() => {
    //     if (phase % 4 === 0) {
    //         checkPotBalance()
    //     }
    // }, [phase])

    // useEffect(() => {
    //     console.log(props.cash.cashFlow.currentBet, 'AUDIT =>> REDUX')
    // }, [props.cash.cashFlow.currentBet])

    // // useEffect(() => {
    // //     setBet(bigBlind)
    // // }, [bigBlind])

    // useEffect(() => {
    //     console.log(currBet, 'SHOULD BE HIGHEST BET THUS FAR')
    //     // if (currBet > currentBet) {
    //     //     props.setCurrentBet((bet - currentBet) + currentBet)
    //     // }
    // }, [bet, currentBet, currBet])

    // const isBetting = () => {
    //     setBet(bet + 10)
    // }

    // const placeBet = () => {
    //     let money = bet + useBalance[active]
    //     let newBet = currentBet + bet
    //     props.setPot(bet + pot)
    //     props.banker(transaction, active)
    //     props.setCurrentBet(newBet)
    //     props.setBalance(money, active)
    //     // setBet()
    //     turnCounter()
    //     setPhase(phase + 1)
    // }

    // const checkRaise = () => {
    //     let money = bet + runningTotal[active]
    //     let newBet = (currentBet - bet) + currentBet
    //     props.setPot(bet + pot)
    //     props.banker(transaction, active)
    //     props.setCurrentBet(newBet)
    //     props.setBalance(money, active)
    //     turnCounter()
    //     setPhase(phase + 1)
    // }

    // const checkBet = () => {
    //     props.setStatus(active, 'isChecking', true)
    //     turnCounter()
    //     setPhase(phase + 1)
    // }

    // const checkFold = () => {
    //     props.setStatus(active, 'isFolding', true)
    //     turnCounter()
    //     setPhase(phase + 1)
    // }

    // const checkCall = () => {
    //     let money = players[active].cash - (currBet - runningTotal[active])
    //     let placing = currBet - runningTotal[active]
    //         console.log(placing, 'PLACING $')
    //     props.setStatus(active, 'isCalling', true)
    //     props.setPot(placing + pot)
    //     props.banker(money, active)
    //     props.setBalance(currentBet, active)
    //     turnCounter()
    //     setPhase(phase + 1)
    // }

    // const goAllIn = () => {
    //     let money = props.game.poker.players[active].cash
    //         console.log(money, '$$')
    //     props.setStatus(active, 'isAllIn', true)
    //     props.setPot(money + pot)
    //     props.banker(0, active)
    //     turnCounter()
    //     setPhase(phase + 1)
    // }

    