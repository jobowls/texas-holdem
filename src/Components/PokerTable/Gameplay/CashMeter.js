import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {watchTotal, startBetting, alertDealer, setAlive, setPlayerTurn, setCurrentBet, setPot, checkPot} from '../../../ducks/cashReducer'
import {handIsOver, banker, movePhase, setCount, setBalance, setStatus, setWinner} from '../../../ducks/pokerReducer'
import './CashMeter.scss'
import {FiPlusCircle} from 'react-icons/fi'

const CashMeter = (props) => {
    const {players, bigPosition, phase, count} = props.game.poker
    const {whosTurn, tableReady, dealerReady} = props.cash.status
    const {pot, currentBet, isActive, watcher} = props.cash.cashFlow
    const {deck} = props.cards

    const [bet, setBet] = useState(0)
    const [seats, setSeats] = useState([1, 2, 3, 4])
    const [toggleMeter, setToggleMeter] = useState(false)
        let name = players[whosTurn].username
        let activeBalance = players[whosTurn].balance
        let activeMoney = players[whosTurn].cash

        let potBalance = [
            players[0].balance,
            players[1].balance,
            players[2].balance,
            players[3].balance
        ]
            let copyBalance = [...potBalance]

    
    useEffect(() => {
        !props.cards.pocket.length 
        ? setToggleMeter(false)
        : setToggleMeter(true)
    }, [props.cards.pocket])

    useEffect(() => {
        if (!deck.length) {
            setSeats([1, 2, 3, 4])
        }
    }, [deck])


    useEffect(() => {        
            console.log(whosTurn, 'TURN_EFFECT')
            console.log(phase, 'PHASE_EFFECT')
            console.log(count, 'COUNT_EFFECT')
            console.log(bigPosition, 'BIG_EFFECT')
            console.log(currentBet, 'CURRENT_BET_EFFECT')            
    }, [whosTurn])


    useEffect(() => {
        let newMin = findMinimum(potBalance)
        props.setCurrentBet(newMin)
        setBet(currentBet)
            console.log(newMin , 'updated_current_bet')
            console.log(players , 'updated_current_bet')
            console.log(whosTurn , 'updated_TURN-FIRED =>>')
            console.log(count , 'updated_COUNT-FIRED =>>')
            
        if (count !== 0) {            
            runningTotal(phase)
        }

        // count === 0
        // ? setSeats([1, 2, 3, 4])
        // : runningTotal(phase)
    }, [count])


    useEffect(() => {
        if (dealerReady === true) {
            props.checkPot(true)
        }
    }, [dealerReady])

    console.log(seats, 'seats-STATE')
    console.log(seats.length, 'length')
    const findMinimum = (arr) => {
        return Math.max(...arr)
    }

        //  ACTION-BTNS =>>
        const setCheck = () => {
            props.setCount(count + 1)
        }

        const setFold = () => {
            let copyActives = [...isActive]
                let whoFolded = whosTurn - 1
                let seatsArr = seats.filter(e => e !== whoFolded)
                    console.log(seatsArr, '[SEATS]')

            setSeats(seatsArr)
            // playerAction('fold', whosTurn)
            props.setStatus(whosTurn, 'isFolding', true)
            props.setCount(count + 1)
        }

        const goAllIn = () => {

        }

        const placeBet = () => {
            let pay = activeMoney - bet
            let community = bet + currentBet

            props.setStatus(whosTurn, 'isBetting', true)
            props.setBalance(community, whosTurn)
            props.setPot(pot + bet)
            props.banker(pay, whosTurn)
            props.setCount(count + 1)
        }
        
        const setRaise = () => {
            let community = (bet - activeBalance) + currentBet
            let pay = activeMoney - community
            let increase = bet + currentBet
                console.log(bet, 'raising-amount')

            props.setStatus(whosTurn, 'isRaising', true)
            props.setBalance(increase, whosTurn)
            props.setPot(pot + community)
            props.banker(pay, whosTurn)
            props.setCount(count + 1)
        }
        const setCall = () => {
            let community = currentBet - activeBalance
            let pay = activeMoney - community
            
            props.setStatus(whosTurn, 'isCalling', true)
            props.setBalance(currentBet, whosTurn)
            props.setPot(pot + community)
            props.banker(pay, whosTurn)
            props.setCount(count + 1)
        }
            

    const runningTotal = (num) => {
        let activePlayers = [...potBalance]
        let amount = (e => e === currentBet)

            // for (let i = 0; i < isActive.length; i++) {
            //     activePlayers.push(copyBalance[i])   
            // }

        // let filtered = potBalance.filter(e => e === currentBet)
        let filtered = potBalance.filter(e => e === currentBet)
            console.log(potBalance)
            console.log(filtered, 'FILTERED')
            console.log(filtered.length, 'LENGTH')
            console.log(activePlayers, 'activePlayers')
            console.log(isActive.length, 'isACTIVE.LENGTH')
            // console.log(num, 'NUM-PASSED')

            // for (let i = 0; i < isActive.length; i++) {
            //     activePlayers.push(isActive[i])
            // }

            if (filtered.every(amount) && num === 0 && filtered.length === isActive.length) {
                console.log('POT_IS_GOOD')
                if (count >= isActive.length) {
                    console.log('...tier_1')
                    props.movePhase(phase + 1)
                    props.alertDealer(true)
                    props.setCount(0)
                }
            } else if (potBalance.every(amount) && num === 1) {
                console.log('POT_IS_GOOD--2')
                if (count >= filtered.length) {
                    console.log('...tier_2')
                    props.movePhase(phase + 1)
                    props.alertDealer(true)
                    props.setCount(0)
                }
            } else if (potBalance.every(amount) && num === 2) {
                console.log('POT_IS_GOOD--3')
                if (count >= filtered.length) {
                    console.log('...tier_3')
                    props.movePhase(phase + 1)
                    props.alertDealer(true)
                    props.setCount(0)
                }
            } else if (potBalance.every(amount) && num === 3) {
                console.log('POT_IS_GOOD--4')
                if (count >= filtered.length) {
                    console.log('...tier_4')
                    props.movePhase(phase + 1)
                    props.alertDealer(true)
                    props.setCount(0)
                }
            }

        manageTurn()
    }
        const manageTurn = () => {
            let start = seats[0] - 1
            let end = seats.length
            console.log(start, end, 'START || END')
                console.log(whosTurn, 'FIRED-1-TURN')
                console.log(end, 'FIRED-1-END')
                
            
            if (seats.length === 1) {
                props.endHand(seats[0] - 1)
            } 

                console.log('for-loop')
            
        }

    const reset = () => {
        setBet(0)
    }
        
    const handleChange = () => {
        setBet(bet + 10)        
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
    watchTotal,
    setWinner,
    handIsOver,
    setCount,
    alertDealer
})(CashMeter)







// import React, {useState, useEffect} from 'react'
// import {connect} from 'react-redux'
// import {watchTotal, startBetting, setAlive, setPlayerTurn, setCurrentBet, setPot, checkPot} from '../../../ducks/cashReducer'
// import {handIsOver, banker, movePhase, setBalance, setStatus, setWinner} from '../../../ducks/pokerReducer'
// import './CashMeter.scss'
// import {FiPlusCircle} from 'react-icons/fi'

// const CashMeter = (props) => {
//     const {players, bigPosition} = props.game.poker
//     const {whosTurn, tableReady} = props.cash.status
//     const {pot, currentBet, isActive, watcher} = props.cash.cashFlow
//         let copy = [...isActive]
//         let copyWatcher = [...watcher]

//     const [bet, setBet] = useState(0)
//     const [toggleMeter, setToggleMeter] = useState(false)
//     const [phase, setPhase] = useState(0)
//     const [key, setKey] = useState([])
//         let name = players[whosTurn].username        
    
//     let tableBalance = [
//         players[0].balance,
//         players[1].balance,
//         players[2].balance,
//         players[3].balance
//     ]
//         let runningTotal = [...tableBalance]
//         let activeBalance = runningTotal[whosTurn]        

//     let liveStatus = [
//         players[0].isFolding,
//         players[1].isFolding,
//         players[2].isFolding,
//         players[3].isFolding
//     ]
//         let currentStatus = [...liveStatus]

//     let liveMoney = [
//         players[0].cash,
//         players[1].cash,
//         players[2].cash,
//         players[3].cash
//     ]
//         let activeMoney = liveMoney[whosTurn]

//     useEffect(() => {
//         // phase >= copy.length
//         // ? checkPotBalance(copyWatcher)
//         // : checkPulse()
//         checkPulse()
//     }, [phase])

//     useEffect(() => {
//         let newMin = findMinimum(watcher)
//         props.setCurrentBet(newMin)
//         // setActive(whosTurn)
//         console.log(`
//             POKER_PHASE:${props.game.poker.phase}, 
//             PHASE:${phase}, 
//             isACTIVE_LENGTH:${isActive.length}, 
//             POT:${pot}, 
//             MINIMUM:${currentBet},
//             BIGGY:${bigPosition},
//             ACTIVE:${whosTurn},
//             isACTIVE:${isActive},
//             KEY:${key},
//             LIVE_MONEY:${liveMoney},
//             LIVE_STATUS:${liveStatus},
//             WATCHER:${watcher},
//             TABLE_READY:${tableReady}
//         `)
//     }, [whosTurn])

//     // useEffect(() => {
//     //     if (isActive.length === 1) {
//     //         props.handIsOver(true)
//     //     }
//     // }, [isActive])

//     useEffect(() => {
//         checkPulse()
//     }, [props.game.poker.phase])

//     useEffect(() => {
//         !props.cards.pocket.length 
//         ? setToggleMeter(false)
//         : setToggleMeter(true)
//     }, [props.cards.pocket])


//     const checkPulse = () => {
//         let indexed = []
//         let remainingBalance = []
        
//         for (let i = 0; i < currentStatus.length; i++) {
//             if (currentStatus[i] === false) {
//                 indexed.push(i)
//                 remainingBalance.push(runningTotal[i])
//             }
//         }

//         props.watchTotal([...remainingBalance])
//         console.log('YES')
//         setKey([...indexed])
//         props.setAlive([...indexed])

//         if (props.game.poker.phase === 0 && phase > isActive.length) {
//             console.log('FIRED ==>>>>>')
//             checkPotBalance([...remainingBalance])            
//         } 
//         else {
//             turnCounter()
//             // phase >= isActive.length
//             // ? checkPotBalance([...remainingBalance])
//             // : console.log('FUCKED-UP =>>>>')
//         }
//     }

//     const findMinimum = (arr) => {
//         return Math.max(...arr)
//     }

//     const setCall = () => {
//         let community = currentBet - activeBalance
//         let pay = activeMoney - community
//         //  REDUX =>>
//         props.setStatus(whosTurn, 'isCalling', true)
//         props.setBalance(currentBet, whosTurn)
//         props.setPot(pot + community)
//         props.banker(pay, whosTurn)
//         // props.
//         //  STATE =>>
//         setPhase(phase + 1)
//         // turnCounter()
//     }

//     const setFold = () => {
//         props.setStatus(whosTurn, 'isFolding', true)
//         setPhase(phase + 1)
//         // turnCounter()
//     }
    
//     const placeBet = () => {
//         let updateBalance = bet
//         let pay = activeMoney - updateBalance
//         //  REDUX =>>
//         props.setStatus(whosTurn, 'isBetting', true)
//         props.setBalance(updateBalance, whosTurn)
//         props.setPot(bet + pot)
//         props.banker(pay, whosTurn)
//         //  STATE =>>
//         setPhase(phase + 1)
//         // turnCounter()        
//     }

//     const setRaise = () => {
//         let updateBalance = bet + currentBet
//         let pay = activeMoney - updateBalance
//         //  REDUX =>>
//         props.setCurrentBet(updateBalance)
//         props.setStatus(whosTurn, 'isRaising', true)
//         props.setBalance(updateBalance, whosTurn)
//         props.setPot(updateBalance + pot)
//         props.banker(pay, whosTurn)
//         //  STATE =>>
//         setPhase(phase + 1)
//         // turnCounter()        
//     }

//     const goAllIn = () => {
//         let updateBalance = activeMoney
//         //  REDUX =>>
//         props.setStatus(whosTurn, 'isAllIn', true)
//         props.setBalance(updateBalance, whosTurn)
//         props.setPot(updateBalance + pot)
//         props.banker(0, whosTurn)
//         //  STATE =>>
//         setPhase(phase + 1)
//         // turnCounter()        
//     }

//     const setCheck = () => {
//         setPhase(phase + 1)
//         // turnCounter()
//     }

//     const reset = () => {
//         setBet(0)
//     }

//     const handleChange = () => {
//         setBet(bet + 10)        
//     }

//     const turnCounter = () => {
//         reset()            
//         let ordered = copy.reverse()
//         console.log(ordered)

//         whosTurn === ordered[0]
//         ? props.setPlayerTurn(key[0])
//         : props.setPlayerTurn(whosTurn + 1)

//         // for (let i = whosTurn; i < isActive.length; i++) {
//         //     console.log(isActive.length - 1, 'TEST-FUCKER')
//         //     console.log(i, 'TEST-FUCKER-i')

//         //     if (isActive.length === 1) {
//         //         console.log('game-over-bitch', `${name}`)
//         //         props.handIsOver(true)
//         //         // break;
//         //     } else if (i === isActive.length - 1) {
//         //         props.setPlayerTurn(isActive[0])
//         //         // break;
//         //     } else {
//         //         props.setPlayerTurn(isActive[i + 1])
//         //         // break;
//         //     }
//         // }
//     }

//     const checkPotBalance = (arr) => {        
//         let amount = (e => e === currentBet)
//         // console.log(watcher, 'POT_BALANCE')
//         // console.log(bigPosition, 'BIGBLIND')

//         if (arr.every(amount)) {
//             props.movePhase(props.game.poker.phase + 1)
//             props.checkPot(true)
//             setPhase(0)
//         } else {
//             // checkPulse()
//             turnCounter()
//             console.log('HIT_PULSE')
//         }
//     }
    

//     return (
//         <div className='slide-rule' >
//             {
//                 toggleMeter ?
//                 <div className='counter-parent' >
//                     <p id='whos-turn' style={{color: 'silver', fontWeight: 'bold'}}> {`${name}'s Move`} </p>
//                     <p style={{color: 'silver', fontWeight: 'bold'}} > Pay to Play: ${currentBet.toFixed(2)} </p>
//                     <div className='modal-counter' >
//                         <button
//                             id='ticker-btn-increment'
//                             onClick={handleChange}
//                             > <FiPlusCircle id='ticker' />
//                             </button>
//                         <p> ${bet} </p>
//                         <button 
//                             id='ticker-btn-reset'
//                             onClick={reset}
//                             > Reset </button>
//                     </div>
//                     <div className='meter-actions' >
//                         {
//                             activeBalance < currentBet ?
//                             <>
//                                 <button
//                                     id="ticker-btn"
//                                     onClick={setCall} >
//                                     {`Call ${currentBet - activeBalance}`} </button>
//                                 <button
//                                     id="ticker-btn"
//                                     onClick={setRaise} >
//                                     Raise </button>
//                                 <button
//                                     id="ticker-btn"
//                                     onClick={goAllIn} >
//                                     All-in </button>
//                                 <button
//                                     id="ticker-btn"
//                                     onClick={setFold} >
//                                     Fold </button>    
//                             </>
//                             :
//                             <>
//                                  <button
//                                     id="ticker-btn"
//                                     onClick={setCheck} >
//                                     Check </button>
//                                 <button
//                                     id="ticker-btn"
//                                     onClick={placeBet} >
//                                     Bet </button>
//                                 <button
//                                     id="ticker-btn"
//                                     onClick={placeBet} >
//                                     Fold </button>
//                                 <button
//                                     id="ticker-btn"
//                                     onClick={goAllIn} >
//                                     All-in </button>
//                             </>
//                         }                       
//                     </div>
//                 </div>
//                 :
//                 null
//             }
//         </div>
//     )
// }
// const mapStateToProps = (reduxState) => reduxState

// export default connect(mapStateToProps, {
//     setPlayerTurn,
//     setPot,
//     banker,
//     setCurrentBet,
//     setStatus,
//     setBalance,
//     checkPot,
//     movePhase,
//     setAlive,
//     startBetting,
//     watchTotal,
//     setWinner,
//     handIsOver
// })(CashMeter)

