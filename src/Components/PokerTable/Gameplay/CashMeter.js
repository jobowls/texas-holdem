import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {watchTotal, startBetting, setAlive, setPlayerTurn, setCurrentBet, setPot, checkPot} from '../../../ducks/cashReducer'
import {banker, movePhase, setBalance, setStatus} from '../../../ducks/pokerReducer'
import './CashMeter.scss'
import {FiPlusCircle} from 'react-icons/fi'

const CashMeter = (props) => {
    const {players, bigPosition} = props.game.poker
    const {whosTurn, tableReady} = props.cash.status
    const {pot, currentBet, isActive, watcher} = props.cash.cashFlow
        let copy = [...isActive]
        let copyWatcher = [...watcher]

    const [bet, setBet] = useState(0)
    const [toggleMeter, setToggleMeter] = useState(false)
    const [phase, setPhase] = useState(0)
    const [key, setKey] = useState([])
        let name = players[whosTurn].username        
    
    let tableBalance = [
        players[0].balance,
        players[1].balance,
        players[2].balance,
        players[3].balance
    ]
        let runningTotal = [...tableBalance]
        let activeBalance = runningTotal[whosTurn]        

    let liveStatus = [
        players[0].isFolding,
        players[1].isFolding,
        players[2].isFolding,
        players[3].isFolding
    ]
        let currentStatus = [...liveStatus]

    let liveMoney = [
        players[0].cash,
        players[1].cash,
        players[2].cash,
        players[3].cash
    ]
        let activeMoney = liveMoney[whosTurn]

    useEffect(() => {
        // phase >= copy.length
        // ? checkPotBalance(copyWatcher)
        // : checkPulse()
        checkPulse()
    }, [phase])

    useEffect(() => {
        let newMin = findMinimum(watcher)
        props.setCurrentBet(newMin)
        // setActive(whosTurn)
        console.log(`
            POKER_PHASE:${props.game.poker.phase}, 
            PHASE:${phase}, 
            COPY_LENGTH:${copy.length}, 
            POT:${pot}, 
            MINIMUM:${currentBet},
            BIGGY:${bigPosition},
            ACTIVE:${whosTurn},
            isACTIVE:${isActive},
            KEY:${key},
            LIVE_MONEY:${liveMoney},
            LIVE_STATUS:${liveStatus},
            WATCHER:${watcher},
            TABLE_READY:${tableReady}
        `)
    }, [whosTurn])

    useEffect(() => {
        checkPulse()
    }, [props.game.poker.phase])

    useEffect(() => {
        !props.cards.pocket.length 
        ? setToggleMeter(false)
        : setToggleMeter(true)
    }, [props.cards.pocket])


    const checkPulse = () => {
        let indexed = []
        let remainingBalance = []
        
        for (let i = 0; i < currentStatus.length; i++) {
            if (currentStatus[i] === false) {
                indexed.push(i)
                remainingBalance.push(runningTotal[i])
            }
        }

        props.watchTotal([...remainingBalance])
        console.log('YES')
        setKey([...indexed])
        props.setAlive([...indexed])

        if (props.game.poker.phase === 0 && phase > bigPosition) {
            console.log('FIRED')
            checkPotBalance(remainingBalance)            
        } else {
            phase >= copy.length
            ? checkPotBalance(remainingBalance)
            : console.log('STOPPED')
        }
    }

    const findMinimum = (arr) => {
        return Math.max(...arr)
    }

    const setCall = () => {
        let community = currentBet - activeBalance
        let pay = activeMoney - community
        //  REDUX =>>
        props.setStatus(whosTurn, 'isCalling', true)
        props.setBalance(currentBet, whosTurn)
        props.setPot(pot + community)
        props.banker(pay, whosTurn)
        // props.
        //  STATE =>>
        setPhase(phase + 1)
        turnCounter()        
    }

    const setFold = () => {
        props.setStatus(whosTurn, 'isFolding', true)
        setPhase(phase + 1)
        turnCounter()
    }
    
    const placeBet = () => {
        let updateBalance = bet
        let pay = activeMoney - updateBalance
        //  REDUX =>>
        props.setStatus(whosTurn, 'isBetting', true)
        props.setBalance(updateBalance, whosTurn)
        props.setPot(bet + pot)
        props.banker(pay, whosTurn)
        //  STATE =>>
        setPhase(phase + 1)
        turnCounter()        
    }

    const setRaise = () => {
        let updateBalance = bet + currentBet
        let pay = activeMoney - updateBalance
        //  REDUX =>>
        props.setCurrentBet(updateBalance)
        props.setStatus(whosTurn, 'isRaising', true)
        props.setBalance(updateBalance, whosTurn)
        props.setPot(updateBalance + pot)
        props.banker(pay, whosTurn)
        //  STATE =>>
        setPhase(phase + 1)
        turnCounter()        
    }

    const goAllIn = () => {
        let updateBalance = activeMoney
        //  REDUX =>>
        props.setStatus(whosTurn, 'isAllIn', true)
        props.setBalance(updateBalance, whosTurn)
        props.setPot(updateBalance + pot)
        props.banker(0, whosTurn)
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
        // console.log(isActive.length - 1)
        // console.log(isActive)
            
        let ordered = copy.reverse()
        console.log(ordered)

        whosTurn === ordered[0]
        ? props.setPlayerTurn(key[0])
        : props.setPlayerTurn(whosTurn + 1)
    }

    const checkPotBalance = (arr) => {        
        let amount = (e => e === currentBet)
        // console.log(watcher, 'POT_BALANCE')
        // console.log(bigPosition, 'BIGBLIND')

        if (arr.every(amount)) {
            props.movePhase(props.game.poker.phase + 1)
            props.checkPot(true)
            setPhase(0)
        } else {
            // checkPulse()
            turnCounter()
            console.log('HIT_PULSE')
        }
    }
    

    return (
        <div className='slide-rule' >
            {
                toggleMeter ?
                <div className='counter-parent' >
                    <p id='whos-turn' style={{color: 'silver', fontWeight: 'bold'}}> {`${name}'s Move`} </p>
                    <p style={{color: 'silver', fontWeight: 'bold'}} > Pay to Play: ${currentBet.toFixed(2)} </p>
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
                            activeBalance < currentBet ?
                            <>
                                <button
                                    id="ticker-btn"
                                    onClick={setCall} >
                                    {`Call ${currentBet - activeBalance}`} </button>
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
    movePhase,
    setAlive,
    startBetting,
    watchTotal
})(CashMeter)

