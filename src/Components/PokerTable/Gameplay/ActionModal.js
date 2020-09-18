import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setBigBlind, setSmallBlind} from '../../../ducks/pokerReducer'
import {setHandType, setSubType} from '../../../ducks/scoringReducer'
import {handIsOver, isShuffling, isSuited,} from '../../../ducks/pokerReducer'
import {GiPerpendicularRings, GiSpades, GiHearts, GiClubs, GiDiamonds, GiHolosphere, GiPaperLantern, GiRingedPlanet, GiPerspectiveDiceThree, GiPlanetCore, Gi3DStairs, GiBottomRight3DArrow, GiAbstract019, GiConvergenceTarget, GiBanana, GiBandit} from 'react-icons/gi'
import './ActionModal.scss'
import TheSlot from '../../Math/TheSlot'
import Winner from '../../Math/Winner'
import ScoreHamilton from './ScoreHamilton'
import ScoreBurr from './ScoreBurr'
import ScoreJefferson from './ScoreJefferson'

const ActionModal = (props) => {
    const {push} = props.history
    
    const [setUrl] = useState('')
    const [toggleWinner, setToggleWinner] = useState(false)
    const [pokerStatus, setPokerStatus] = useState('')
    const [pocketStatus, setPocketStatus] = useState('')

    
    const goBtn = ({value}) => {
        push(`/${value}`)
    }

    const toDash = () => {
        push('/dashboard')
    }

    useEffect(() => {
        if (props.game.status.handIsOver === true) {
          setPokerStatus('WINNER')
        } 
    }, [props.game.status.handIsOver])

    useEffect(() => {
        console.log(props.score.myHand.kickerArr, 'TIE-BREAK')
    }, [props.score.myHand.kickerArr])

    useEffect(() => {
        console.log(props.game.status.isSuited, 'FIRED_SUITED')
    }, [props.game.status.isSuited])

    useEffect(() => {
        if (props.game.status.isShuffling === true) {
            setPokerStatus('...shuffling deck')
        } else {
            setPokerStatus('')
        }
    }, [props.game.status.isShuffling])


    const colorLog = (message, color) => {
        color = color || "black";

        switch (color) {
            case "success":  
                 color = "black"; 
                 break;
            case "info":     
                 color = "DodgerBlue";  
                 break;
            case "white":
                color = "white";
                break;
            case "teal":
                color = "teal";
                break;
            default: 
                 color = 'color';
        }
        console.log("%c" + message, "color:" + color);
    }

    const findWinner = () => {
        props.handIsOver(true)
        console.log(props.game.status.winner)
        console.log(props.cash.status.showAllHands)
        console.log(props.game.status.handIsOver)
        // setToggleWinner(true)
    }

    // useEffect(() => {
    //     if (props.game.status.handIsOver === true) {
    //         setToggleWinner(true)
    //         console.log(props.cash.status.winner)
    //         console.log(props.game.status.handIsOver)
    //     } else {
    //         setToggleWinner(false)
    //     }
    // }, [props.game.status.handIsOver])

    const pocketMapper = () => {
        props.cards.pocket.map((card, i) => (
            <div key={i} >
                <p> {card.card_rank} </p>
                <p> {card.card_suit} </p>
                {colorLog(`${card.card_rank}, ${card.card_suit}`, 'teal')}
            </div>
        ))
    }

    const hasPocketPair = () => {
        let playerPocket = props.cards.pocket.map(element => element.card_suit) 
            
        if (playerPocket[0] === playerPocket[1]) {
            props.isSuited(true)
            setPocketStatus('SUITED')
        } else {
            setPocketStatus('')
        }
    }

    let pocketShow = props.cards.pocket.map((element, i) => (
            <div key={i} id='show-pocket' >
                {element.card_rank}
            </div>
    ))
    
    const {buttonIndex} = props.game.poker
    const {game, user} = props
    const {pocket} = props.cards
    return (
        <div className='action-modal-master' >

              <div className='profile-menu' >
                <img 
                    id='action-pic' 
                    alt='' 
                    src={props.user.player.profile_pic}
                    onClick={toDash}  >
                </img>
                <h2> {user.player.username} </h2>
                <p> Stack: ${props.cash.cashFlow.chipCount.toFixed(2)} </p>
                <p> {game.poker.XP.toFixed(1)} XP </p>
            </div>
            
            <div className='room-title-container' >
                <h2 id='poker-room-title' > THE LIGHTHOUSE </h2>
                <h3 id='poker-room-title1' > TEXAS HOLD'EM </h3>
                <p> Blinds: ${game.poker.smallBlind.toFixed(2)} / ${game.poker.bigBlind.toFixed(2)} </p>
                <p> Purse: ${game.poker.prizeMoney.toFixed(2)} </p>
                {/* <p> Round: {game.poker.round} </p>  */}
            </div>
            {/* <div 
                className='spinner'
                style={
                    buttonIndex === 1 ? {color: 'teal'}
                    : buttonIndex === 2 ? {color: 'dodgerBlue'}
                    : buttonIndex === 3 ? {color: 'orange'}
                    : buttonIndex === 4 ? {color: 'red'}
                    : null 
                } >
                <GiPerpendicularRings id='magic-orb' />
            </div> */}

            <div className='the-slot' >
                {/* <Winner  /> */}
                {
                    props.game.status.isShuffling === true ?
                    <p> {pokerStatus} </p>
                    :
                    props.game.status.handIsOver === true ?
                    <div>
                        <p> {pokerStatus} </p>
                        <Winner  />
                    </div>
                    :
                    props.score.myHand.finalHand.length === 2 && props.score.myHand.handType === 'Pair' ?
                    <div id='marquee-pocket' >
                        <p> pocket </p>                 
                        <p> {props.score.myHand.subType} </p>                 
                    </div>
                    :
                    props.score.myHand.handType === 'High Card' && props.cards.pocket[0].card_suit === props.cards.pocket[1].card_suit ?
                    <div id='marquee-pocket' >
                        <p> Pocket </p>
                        <p> {props.cards.pocket[0].card_rank} | {props.cards.pocket[1].card_rank} </p>                                                 
                        <p style={{color: 'silver'}} > Suited </p>
                    </div>
                    :
                    props.score.myHand.handType === 'High Card' ?
                    <div id-marquee-pocket >
                        <p> {props.score.myHand.highestCard} </p>
                    </div>
                    :
                    <div id='marquee-pocket' >
                        <p> {props.score.myHand.subType} </p>
                        <p style={{color: 'silver'}} > {props.score.myHand.kicker} </p>
                    </div>
                }
            </div>

            <div className='btn-menu' >
                <button
                    onClick={props.deal}
                    className='action-btns'
                    > Deal </button>
                <button
                    onClick={props.flop}
                    className='action-btns'
                    > Flop </button>
                <button
                    onClick={props.turn}
                    className='action-btns'
                    > Turn </button>
                <button
                    onClick={props.river}
                    className='action-btns'
                    > River </button>
                <button 
                    onClick={props.checkXP} 
                    className='action-btns' 
                    > Show'em </button>
                <button 
                    onClick={findWinner} 
                    className='action-btns' 
                    > Winner Winner </button>
                <button
                    onClick={props.clear}
                    className='action-btns'
                    > Reset </button>
                <button
                    onClick={props.toggler}
                    className='action-btns'
                    > Menu </button>
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(
    mapStateToProps, {
        isShuffling,
        isSuited,
        setBigBlind,
        setHandType,
        setSmallBlind,
        setSubType,
        handIsOver
    })(withRouter(ActionModal))