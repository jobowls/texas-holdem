import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setBigBlind, setSmallBlind} from '../../../ducks/pokerReducer'
import {setHandType, setSubType} from '../../../ducks/scoringReducer'
import {handIsOver, isShuffling, isSuited,} from '../../../ducks/pokerReducer'
import {GiPokerHand, GiPerpendicularRings, GiSpades, GiHearts, GiClubs, GiDiamonds, GiHolosphere, GiPaperLantern, GiRingedPlanet, GiPerspectiveDiceThree, GiPlanetCore, Gi3DStairs, GiBottomRight3DArrow, GiAbstract019, GiConvergenceTarget, GiBanana, GiBandit} from 'react-icons/gi'
import './ActionModal.scss'
import TheSlot from '../../Math/TheSlot'
import Winner from '../../Math/Winner'
import ScoreHamilton from './ScoreHamilton'
import ScoreBurr from './ScoreBurr'
import ScoreJefferson from './ScoreJefferson'

const ActionModal = (props) => {
    const {push} = props.history
    const {handType, kicker, finalHand, subType, highestCard} = props.score.myHand
    const {myHand} = props.score
    
    const [setUrl] = useState('')
    const [pokerStatus, setPokerStatus] = useState('')
    const [pocketStatus, setPocketStatus] = useState('')

    
    const goBtn = ({value}) => {
        push(`/${value}`)
    }

    const toDash = () => {
        push('/dashboard')
    }

    useEffect(() => {
        if (props.game.status.winner !== '') {
            setPokerStatus('WINNER')
        } 
    }, [props.game.status.winner])


    useEffect(() => {
        console.log(props.score.myHand)
    }, [props.score.myHand])


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
    }

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

    const show = props.rules.listOfHands
        .filter(element => element.badge_name === handType)
        .map((rules => (
            <div 
                key={rules.badge_id} 
                className='rules-container' 
                 style={handType !== 'High Card' ? {boxShadow: '0px 0px 15px 0px silver'} : null} > 
                <div className='theatre' >
                    <GiPokerHand 
                        id='modal-icons'
                        style={
                            handType === 'High Card' 
                            ? {
                                color: 'silver',
                                marginRight: '10px'
                            } 
                            : {
                                color: 'silver',
                                marginRight: '10px'
                            }
                    } />
                    <p style={{color: 'rgb(0, 122, 175)'}} > {rules.badge_name} </p>
                </div>
                {
                    finalHand.length === 2 && handType === 'Pair' ?
                    <p> Pocket {subType} </p>
                    :
                    handType === 'High Card' ? 
                    <p> {highestCard} </p>
                    :
                    !kicker ?
                    <p> {subType} </p>
                    :
                    <p> {subType} | {kicker} </p>
                }   
                <p id='xp'> {rules.badge_score} XP </p>                     
            </div>
    )))
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
                <p> Stack: ${props.cash.cashFlow.chipCount} </p>
                <p> {game.poker.XP} XP </p>
            </div>
            
            <div className='room-title-container' >
                <h2 id='poker-room-title' > THE LIGHTHOUSE </h2>
                <h3 id='poker-room-title1' > TEXAS HOLD'EM </h3>
                <p> Purse: ${game.poker.prizeMoney} </p>
                <p> Blinds: ${game.poker.smallBlind} / ${game.poker.bigBlind} </p>
            </div>

            <div className='the-slot' >
                <div className='show-stopper' > {show} </div>
                {                   
                    handType === 'High Card' && pocket[0].card_suit === pocket[1].card_suit ?
                    <div id='marquee-pocket' >
                        <p style={{color: 'silver', marginRight: '10px'}} > Pocket: </p>
                        <p> {props.cards.pocket[0].card_rank} | {props.cards.pocket[1].card_rank} </p>
                        <p style={{color: 'silver', marginLeft: '10px'}} > Suited </p>
                    </div>                    
                    :
                    null
                    // <div id='marquee-pocket' >
                    //     <p style={{color: 'silver'}} > {kicker} </p>
                    // </div>
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
                {/* <button
                    onClick={props.toggler}
                    className='action-btns'
                    > Menu </button> */}
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