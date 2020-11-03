    //  NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
    //  LOCAL
import ActionModal from './ActionModal'
import ActionFeed from './ActionFeed'
import MyScore from '../MyScore'
import Rules from '../Rules'
import Hamilton from '../../CardFlow/Hamilton'
import Burr from '../../CardFlow/Burr'
import Jefferson from '../../CardFlow/Jefferson'
import Pocket from '../../CardFlow/Pocket'
import FeltTable from './FeltTable'
import CashMeter from './CashMeter'
import {cipher} from '../../Math/CountingCards'
import Marquee from '../Marquee'
import Smally from './Smally'
import Biggy from './Biggy'
import './Game.scss'
import '../../CardFlow/Community.scss'
    //  DUX 
import {setDeck, setPocket, setPocketAi1, setPocketAi2, setPocketAi3, setFlop, setTurn, setRiver, setBurned, setCommunity, setUsed, reset} from '../../../ducks/cardsReducer'
import {banker, wReady, endHand, movePhase, setCount, setStatus, assignSm, assignBg, setWinner, handIsOver, isShuffling, assignButton, gainXP, countRound, setPlayers, setBigBlind, setSmallBlind, setPurse, isSuited, setBalance} from '../../../ducks/pokerReducer'
import {setKickerArr, setKickerArrA, setKickerArrB, setKickerArrC, setScore, setScoreA, setScoreB, setScoreC, setHighestA, setHighestB, setHighestC, setHighest, setKicker, setKickerA, setKickerB, setKickerC, resetBest5A, resetBest5B, resetBest5C, setSubTypeA, setSubTypeB, setSubTypeC, setHandTypeA, setHandTypeB, setHandTypeC, setSubType, setHamilton, setBurr, setJefferson, chickenDinner, setMyHand, setHandType, tallyOne, tallySuits, resetBest5} from '../../../ducks/scoringReducer'
import {setAlive, alertDealer, startBetting, watchTotal, checkPot, showAllHands, setPlayerTurn, setCurrentBet, setPot} from '../../../ducks/cashReducer'
import {setNextMove} from '../../../ducks/dealerReducer'

const Game = (props) => {
    const {round, buttonIndex, players, smallPosition, bigPosition, phase} = props.game.poker
    const {poker} = props.game
    const {winner, handIsOver, isShuffling, wReady} = props.game.status
    const {finalHand} = props.score.myHand
    const {deck} = props.cards
    const {potIsGood, showAllHands} = props.cash.status
    const {isActive} = props.cash.cashFlow

    const [toggleButton, setToggleButton] = useState(0)
    const [toggleSmallBlind, setToggleSmallBlind] = useState(1)
    const [toggleBigBlind, setToggleBigBlind] = useState(2)
    const [toggleRules, setToggleRules] = useState(false)
    const [pokerStatus, setPokerStatus] = useState('')

    let liveStatus = [
        players[0].isFolding,
        players[1].isFolding,
        players[2].isFolding,
        players[3].isFolding
    ]
        let currentStatus = [...liveStatus]

    useEffect(() => {
        if (isShuffling === true) {
            setPokerStatus('...shuffling deck')
            setToggleRules(true)
        } else {
            setPokerStatus('')
            setToggleRules(false)
        }
    }, [isShuffling])

    useEffect(() => {
        setToggleButton(buttonIndex)
        setToggleSmallBlind(smallPosition)
        setToggleBigBlind(bigPosition)
    }, [buttonIndex])

    useEffect(() => {
        if (winner !== '') {
            console.log(winner, 'WINNER')
        }
    }, [winner])

    useEffect(() => {
        if (showAllHands && poker.phase === 4) {
            props.movePhase(poker.phase + 1)
        }
    }, [showAllHands, poker.phase])

    useEffect(() => {
        if (poker.phase === 5) {
            props.wReady(true)
        }
    }, [poker.phase])

    useEffect(() => {
        if (wReady) {
            props.handIsOver(true)
        }
    }, [wReady])

    useEffect(() => {
        if (potIsGood) {
            poker.phase === 1 ? flop()
            : poker.phase === 2 ? turn()
            : poker.phase === 3 ? river()
            : checkXP()
        }
        props.checkPot(false)
        props.alertDealer(false)
        props.setCurrentBet(0)
    }, [potIsGood])


    const rulesToggler = () => {
        setToggleRules(!toggleRules)
    }

    const shuffle = () => {
        //  ACTUAL GAME DECK => TURN BACK ON FOR FULL 52-CARD DECK!!!
            axios.get('/api/deck')
                .then((res) => props.setDeck(res.data))
                .catch(err => console.log(err));
        
        //  TEST-SHUFFLE => USING CUSTOM DECK WITH REPEATS TO FORCE 'STRAIGHT' HAND-TYPES 
            // axios.get('/api/test-shuffle')
            // .then((res) => props.setDeck(res.data))
            // .catch(err => console.log(err));
            // console.log('TEST-SHUFFLE => ACTIVE')
            // await actionReady()
    }

    useEffect(() => {
        if (!deck.length) {
            shuffle()
        }
    }, [deck, shuffle, isShuffling])

    const colorLog = (message, color) => {
        color = color || "black";
        switch (color) {
            case "success":  
                 color = "Green"; 
                 break;
            case "blue":     
                 color = "DodgerBlue";  
                 break;
            case "white":
                color = "white";
                break;
            case "orange":
                color = "orange";
                break;
            case "purple":
                color = "purple";
                break;
            case "yellow":
                color = "yellow";
                break;
            default: 
                 color = 'black';
        }
        console.log("%c" + message, "color:" + color);
    }

    // const checkingStatus = () => {
    //     let remainingBalance = []
    //     let indexed = []
    
    //     for (let i = 0; i < currentStatus.length; i++) {
    //         if (currentStatus[i] === false) {
    //             indexed.push(i)
    //             remainingBalance.push(0)
    //         }
    //     }
    //     props.setAlive([...indexed])
    //     props.watchTotal([...remainingBalance])             
    // }

    const deal = () => {
        colorLog('...DEALING', 'yellow')
        
    //  SELECTING CARDS @ RANDOM => (card_id: 0 < card_id >= 52)
        let rand1 = Math.ceil(Math.random() * deck.length);
        let rand2 = Math.ceil(Math.random() * deck.length);
            let cardIndex1 = deck.findIndex(element => element.card_id === rand1);
            let cardIndex2 = deck.findIndex(element => element.card_id === rand2);

    //  PURPOSELY SPLICING ORIGINAL ARRAY IN ORDER TO AVOID DUPLICATE CARDS BEING DEALT
                const card1 = deck.splice(cardIndex1, 1);
                const card2 = deck.splice(cardIndex2, 1);
        
        let rand3 = Math.ceil(Math.random() * deck.length);
        let rand4 = Math.ceil(Math.random() * deck.length);
            let cardIndex3 = deck.findIndex(element => element.card_id === rand3);
            let cardIndex4 = deck.findIndex(element => element.card_id === rand4);
                const card3 = deck.splice(cardIndex3, 1);
                const card4 = deck.splice(cardIndex4, 1);
        
        let rand5 = Math.ceil(Math.random() * deck.length);
        let rand6 = Math.ceil(Math.random() * deck.length);
            let cardIndex5 = deck.findIndex(element => element.card_id === rand5);
            let cardIndex6 = deck.findIndex(element => element.card_id === rand6);
                const card5 = deck.splice(cardIndex5, 1);
                const card6 = deck.splice(cardIndex6, 1);
        
        let rand7 = Math.ceil(Math.random() * deck.length);
        let rand8 = Math.ceil(Math.random() * deck.length);
            let cardIndex7 = deck.findIndex(element => element.card_id === rand7);
            let cardIndex8 = deck.findIndex(element => element.card_id === rand8);
                const card7 = deck.splice(cardIndex7, 1);
                const card8 = deck.splice(cardIndex8, 1);
                
        const pocketArr = [card1[0], card2[0]];
        const pocketA = [card3[0], card4[0]];
        const pocketB = [card5[0], card6[0]];
        const pocketC = [card7[0], card8[0]];
        
        //  REDUX
        props.setPocket([...pocketArr]);
        props.setMyHand([...pocketArr]);
        props.setPocketAi1([...pocketA]);
        props.setHamilton([...pocketA]);            
        props.setPocketAi2([...pocketB]);
        props.setBurr([...pocketB]);            
        props.setPocketAi3([...pocketC]);
        props.setJefferson([...pocketC]);

        props.setUsed([
            ...pocketArr,
            ...pocketA,
            ...pocketB, 
            ...pocketC,
            ...props.cards.burned,
            ...props.cards.flop,
            ...props.cards.turn,
            ...props.cards.river
        ]);

        props.isShuffling(false)
        props.setNextMove(true)

        //  REDUX
            let refreshSm = poker.smallPosition;
            let refreshBg = poker.bigPosition;
        let smStakes =  poker.players[refreshSm].cash - poker.smallBlind;
        let bgStakes =  poker.players[refreshBg].cash - poker.bigBlind;
        let money = poker.smallBlind + poker.bigBlind

        let findTurn = isActive.indexOf(bigPosition) + 1

            if (poker.bigPosition === 3) {
                props.setPlayerTurn(0)
            } else {
                props.setPlayerTurn(bigPosition + 1)
            }

            props.banker(smStakes, refreshSm)
            props.banker(bgStakes, refreshBg)
        props.setBalance(poker.smallBlind, refreshSm)
        props.setBalance(poker.bigBlind, refreshBg)
        props.setCurrentBet(poker.bigBlind)
        props.setPot(money)
        props.setCount(0)
        setWatcher()
    }
        const setWatcher = () => {
            let balances = [
                poker.players[0].balance,
                poker.players[1].balance,
                poker.players[2].balance,
                poker.players[3].balance
            ]
            props.watchTotal([...balances])
        }

    const flop = () => {
        const {pocketAi1, pocketAi2, pocketAi3, pocket, used, burned, turn, river, community} = props.cards
        colorLog('...FLOP', 'yellow')

        let rand1 = Math.ceil(Math.random() * deck.length)
        let rand2 = Math.ceil(Math.random() * deck.length)
        let rand3 = Math.ceil(Math.random() * deck.length)
        let burningOne = Math.ceil(Math.random() * deck.length)
            let cardIndex1 = deck.findIndex(card => card.card_id === rand1)
            let cardIndex2 = deck.findIndex(card => card.card_id === rand2)
            let cardIndex3 = deck.findIndex(card => card.card_id === rand3)
            let burnIndex = deck.findIndex(card => card.card_id === burningOne)
                const flop1 = deck.splice(cardIndex1, 1)
                const flop2 = deck.splice(cardIndex2, 1)
                const flop3 = deck.splice(cardIndex3, 1)
                const burn1 = deck.splice(burnIndex, 1)
        const house = [flop1[0], flop2[0], flop3[0]]
        const burning = [burn1[0]]
        const mine = [...house, ...finalHand]
        
        const botA = [...house, ...props.score.botA.finalHand]
        const botB = [...house, ...props.score.botB.finalHand]
        const botC = [...house, ...props.score.botC.finalHand]
        
        props.setBurned(burning)
        props.setFlop(house)
        
        props.setUsed([
            ...pocketAi1,
            ...pocketAi2,
            ...pocketAi3,
            ...pocket,
            ...turn,
            ...river,
            ...community,
            ...burning
        ]);
        
        props.setHamilton([...botA])
        props.setBurr([...botB])
        props.setJefferson([...botC])
        props.setMyHand([...mine])
        
        props.setBalance(0, 0)
        props.setBalance(0, 1)
        props.setBalance(0, 2)
        props.setBalance(0, 3)
        // checkingStatus()
        props.setCount(0)
    }

    const turn = () => {
        const {pocketAi1, pocketAi2, pocketAi3, pocket, used, burned, flop, river, community} = props.cards
        colorLog('...TURN', 'yellow')

        let rand1 = Math.ceil(Math.random() * deck.length)
        let burningOne = Math.ceil(Math.random() * deck.length)
            let cardIndex1 = deck.findIndex(card => card.card_id === rand1)
            let cardIndex2 = deck.findIndex(card => card.card_id === burningOne)
                const turn1 = deck.splice(cardIndex1, 1)
                const burn2 = deck.splice(cardIndex2, 1)

        const house = [turn1[0]]
        const burning = [...burned, burn2[0]]
        const mine = [...house, ...finalHand]
        const botA = [...house, ...props.score.botA.finalHand]
        const botB = [...house, ...props.score.botB.finalHand]
        const botC = [...house, ...props.score.botC.finalHand]

        //  REDUX
        props.setBurned([...burning])
        props.setTurn([...house])
        props.setUsed([
            ...pocketAi1,
            ...pocketAi2,
            ...pocketAi3,
            ...pocket,
            ...flop,
            ...river,
            ...house,
            ...burning
        ]);

        props.setMyHand([...mine])
        props.setHamilton([...botA])
        props.setBurr([...botB])
        props.setJefferson([...botC])

        props.setBalance(0, 0)
        props.setBalance(0, 1)
        props.setBalance(0, 2)
        props.setBalance(0, 3)
        setWatcher()
        props.setCount(0)
    }

    const river = () => {
        const {pocketAi1, pocketAi2, pocketAi3, pocket, used, burned, turn, flop, community} = props.cards
        colorLog('...RIVER', 'yellow')

        let rand1 = Math.ceil(Math.random() * deck.length)
        let burningOne = Math.ceil(Math.random() * deck.length)
            let cardIndex1 = deck.findIndex(card => card.card_id === rand1)
            let cardIndex2 = deck.findIndex(card => card.card_id === burningOne)
                const river1 = deck.splice(cardIndex1, 1)
                const burn3 = deck.splice(cardIndex2, 1)
        
        const house = [river1[0]]
        const burning = [...burned, burn3[0]]
        const mine = [...house, ...finalHand]
        const botA = [...house, ...props.score.botA.finalHand]
        const botB = [...house, ...props.score.botB.finalHand]
        const botC = [...house, ...props.score.botC.finalHand]
        
        //  REDUX
        props.setBurned([...burning])
        props.setRiver([...house])
        props.setUsed([
            ...pocketAi1,
            ...pocketAi2,
            ...pocketAi3,
            ...pocket,
            ...flop,
            ...turn,
            ...house,
            ...burning
        ])

        props.setMyHand([...mine])
        props.setHamilton([...botA])
        props.setBurr([...botB])
        props.setJefferson([...botC])

        props.setBalance(0, 0)
        props.setBalance(0, 1)
        props.setBalance(0, 2)
        props.setBalance(0, 3)
        setWatcher()
        props.setCount(0)
    }    
    
    const checkXP = () => {
        props.showAllHands(true)
        
        // const flipCard = document.querySelector('.pocket-container')
        // flipCard.addEventListener('click', function() {
        //     flipCard.classList.toggle('flip')
        // })
    }

    const clear = () => {
            colorLog('...SETTING TABLE', 'yellow')
        props.showAllHands(false)
        props.setSubType('')
        props.endHand(0)
        props.wReady(false)
        
        props.isShuffling(true)
    
        props.reset([])
        props.setMyHand([])
        props.setHandType('')
        props.setKicker('')
        props.setKickerArr([])
        props.setHighest('')
        props.setHighestA('')
        props.setHighestB('')
        props.setHighestC('')
        props.setScore(0)
        props.setScoreA(0)
        props.setScoreB(0)
        props.setScoreC(0)
        props.setWinner('')
        props.movePhase(0)

        for (let i = 0; i < poker.players.length; i++) {
            props.setBalance(0, i)
            props.setStatus(i, 'isFolding', false)
            props.setStatus(i, 'isChecking', false)
            props.setStatus(i, 'isRaising', false)
            props.setStatus(i, 'isBetting', false)
            props.setStatus(i, 'isCalling', false)
        }

        props.setCurrentBet(0)
        
        props.setHamilton([])
        props.setHandTypeA('')
        props.setSubTypeA('')
        props.setKickerA('')
        props.setKickerArrA([])
        
        props.setBurr([])
        props.setHandTypeB('')
        props.setSubTypeB('')
        props.setKickerB('')
        props.setKickerArrB([])
        
        props.setJefferson([])
        props.setHandTypeC('')
        props.setSubTypeC('')
        props.setKickerC('')
        props.setKickerArrC([])
        
        props.resetBest5(false)
        props.resetBest5A(false)
        props.resetBest5B(false)
        props.resetBest5C(false)
        
        props.isSuited(false)
        props.handIsOver(false)

        let smStakes = poker.smallBlind * 2;
        let bgStakes = poker.bigBlind * 2;

        //  REDUX
        let refreshButton = poker.buttonIndex + 1
        let refreshSm = poker.smallPosition + 1
        let refreshBg = poker.bigPosition + 1
        
            if (round === players.length) {
                props.assignButton(0)
                props.setSmallBlind(smStakes)
                props.setBigBlind(bgStakes)
                props.countRound(0)
            } else {
                props.countRound(round)
                props.assignButton(refreshButton)
            }

            if (poker.smallPosition === 3) {
                props.assignSm(0)
            } else {
                props.assignSm(refreshSm)
            }

            if (poker.bigPosition === 3) {
                props.assignBg(0)
            } else {
                props.assignBg(refreshBg)
            }
        props.setCount(0)
        props.setAlive([0, 1, 2, 3])
    }       

    return (
        <div className='game-master' >
            <div className='modal-wrapper'>
                <ActionModal 
                    deal={deal} 
                    flop={flop} 
                    turn={turn} 
                    river={river}
                    toggler={rulesToggler}
                    checkXP={checkXP}
                    clear={clear} />
            </div>
            <section id='game-divider' >
                <div id='player-list' >
                    <div className='player-box'>
                        {/* <div className={props.cash.status.whosTurn === 0 ? 'player-status-active' : 'player-status'} > */}
                        <div className={winner.includes('Player1') ? 'player-status-active-w' : showAllHands ? 'player-status' : props.cash.status.whosTurn === 0 ? 'player-status-active' : 'player-status'} >
                            <h3 id='player-box-name' > {poker.players[0].username} </h3>
                            <p style={{color: poker.players[0].cash > 250 ? 'silver' : poker.players[0].cash > 0 ? 'yellow' : 'red'}} > ${poker.players[0].cash.toFixed(2)} </p>
                        </div>
                        <div className='pocket-divider' >
                            <Pocket />
                            {
                                toggleBigBlind === 0 
                                    ? <div className='button-container' > <Biggy  /> </div>
                                    :  toggleSmallBlind === 0 
                                    ? <div className='button-container' > <Smally  /> </div>
                                    : toggleButton === 0 
                                    ? <div className='button-container' > {/* <Button  /> */} <p style={{fontweight: 'bold'}} > Dealer </p> </div>
                                    : <div className='button-container' > </div>                          
                            }
                        </div>
                    </div>
                    <div className='player-box'>
                        {/* <div className={props.cash.status.whosTurn === 1 ? 'player-status-active' : 'player-status'} > */}
                        <div className={winner.includes('Hamilton') ? 'player-status-active-w' : showAllHands ? 'player-status' : props.cash.status.whosTurn === 1 ? 'player-status-active' : 'player-status'} >
                            <h3 id='player-box-name' > {poker.players[1].username} </h3>
                            <p style={{color: poker.players[1].cash > 250 ? 'silver' : poker.players[1].cash > 0 ? 'yellow' : 'red'}} > ${poker.players[1].cash.toFixed(2)} </p>
                        </div>
                        <div className='pocket-divider' >
                            {
                                props.game.status.isShuffling === true 
                                    ? <div className='pocket-container' > </div>                                
                                    : <Hamilton  />
                            }
                            
                            {
                                toggleBigBlind === 1 
                                    ? <div className='button-container' > <Biggy  /> </div>
                                    :  toggleSmallBlind === 1 
                                    ? <div className='button-container' > <Smally  /> </div>
                                    : toggleButton === 1 
                                    ? <div className='button-container' > {/* <Button  /> */} <p style={{fontweight: 'bold'}} > Dealer </p> </div>
                                    : <div className='button-container' > </div>                          
                            }
                        </div>
                    </div>
                    <div className='player-box'>
                        {/* <div className={props.cash.status.whosTurn === 2 ? 'player-status-active' : 'player-status'} > */}
                        <div className={winner.includes('Burr') ? 'player-status-active-w' : showAllHands ? 'player-status' : props.cash.status.whosTurn === 2 ? 'player-status-active' : 'player-status'} >
                            <h3 id='player-box-name' > {poker.players[2].username} </h3>
                            <p style={{color: poker.players[2].cash > 250 ? 'silver' : poker.players[2].cash > 0 ? 'yellow' : 'red'}} > ${poker.players[2].cash.toFixed(2)} </p>
                        </div>
                        
                        <div className='pocket-divider' >
                            {
                                props.game.status.isShuffling === true 
                                    ? <div className='pocket-container' > </div> 
                                    : <Burr/>
                            }
                            
                            {
                                toggleBigBlind === 2 
                                    ?   <div className='button-container' > 
                                            <Biggy  /> 
                                        </div>
                                    :  toggleSmallBlind === 2 
                                    ?   <div className='button-container' > 
                                            <Smally  /> 
                                        </div>
                                    : toggleButton === 2 
                                    ?   <div className='button-container' > 
                                            <p style={{fontweight: 'bold'}} > Dealer </p> 
                                        </div>
                                    : <div className='button-container' > </div>
                            }
                        </div>
                    </div>
                    <div className='player-box'>
                        {/* <div className={props.cash.status.whosTurn === 3 ? 'player-status-active' : 'player-status'} > */}
                        <div className={winner.includes('Jefferson') ? 'player-status-active-w' : showAllHands ? 'player-status' : props.cash.status.whosTurn === 3 ? 'player-status-active' : 'player-status'} >
                            <h3 id='player-box-name' > {poker.players[3].username} </h3>
                            <p style={{color: poker.players[3].cash > 250 ? 'silver' : poker.players[3].cash > 0 ? 'yellow' : 'red'}} > ${poker.players[3].cash.toFixed(2)} </p>
                        </div>
                        <div className='pocket-divider' >
                            {
                                props.game.status.isShuffling === true 
                                    ? <div className='pocket-container' > </div>
                                    : <Jefferson/>
                            }
                            
                            {
                                toggleBigBlind === 3 
                                    ? <div className='button-container' > <Biggy  /> </div>
                                    :  toggleSmallBlind === 3 
                                    ? <div className='button-container' > <Smally  /> </div>
                                    : toggleButton === 3 
                                    ? <div className='button-container' > {/* <Button  /> */} <p style={{fontweight: 'bold'}} > Dealer </p> </div>
                                    : <div className='button-container' > </div>                          
                            }
                        </div>
                    </div>
                </div>
                <div className='slider-table' >
                    <div className='meter-box' >
                        {
                            props.game.status.isShuffling 
                                ? <p style={{fontSize: '16px', color: 'silver'}} > {pokerStatus} </p>
                                : props.cash.status.showAllHands 
                                ? <ActionFeed />
                                : <CashMeter />
                        }
                    </div>
                    <div className='felt-table' > <FeltTable  /> </div>
                </div>
                <div className='hierarchy-tree' >
                    <div> <MyScore  /> </div>
                    {
                        toggleRules === true
                            ? <Rules />
                            : <Marquee  />
                    }
                </div>
            </section>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(
    mapStateToProps, {
        assignButton,
        setDeck, 
        setPocket, 
        setPocketAi1, 
        setPocketAi2, 
        setPocketAi3, 
        setBurned, 
        setFlop, 
        setMyHand,
        setHandType,
        setHandTypeA,
        setHandTypeB,
        setHandTypeC,
        setTurn, 
        setRiver, 
        setCommunity, 
        setUsed, 
        showAllHands,
        reset,
        countRound,
        resetBest5,
        resetBest5A,
        resetBest5B,
        resetBest5C,
        isShuffling,
        setSmallBlind,
        setBigBlind,
        setPurse,
        setPlayers,
        gainXP,
        tallyOne,
        tallySuits,
        isSuited,
        handIsOver,
        setSubType,
        setSubTypeA,
        setSubTypeB,
        setSubTypeC,
        setHamilton,
        setJefferson,
        setBurr,
        setKicker,
        setKickerA,
        setKickerB,
        setKickerC,
        setHighest,
        setHighestA,
        setHighestB,
        setHighestC,
        cipher,
        setScore, 
        setScoreA, 
        setScoreB, 
        setScoreC,
        setWinner,
        setNextMove,
        assignSm,
        assignBg,
        banker,
        setKickerArr,
        setKickerArrA,
        setKickerArrB,
        setKickerArrC,
        setStatus,
        setPlayerTurn,
        setCurrentBet,
        setBalance,
        checkPot,
        movePhase,
        setPot,
        startBetting,
        watchTotal,
        setAlive,
        setCount,
        alertDealer,
        endHand,
        wReady
    })(withRouter(Game))