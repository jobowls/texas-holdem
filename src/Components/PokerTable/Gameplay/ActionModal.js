    // NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setBigBlind, setSmallBlind} from '../../../ducks/pokerReducer'
import {setHandType, setSubType} from '../../../ducks/scoringReducer'
import {handIsOver, isShuffling, isSuited,} from '../../../ducks/pokerReducer'

    // LOCAL
import './ActionModal.scss'

const ActionModal = (props) => {
    const {game, user} = props
    const {push} = props.history
    const {isShuffling, winner} = props.game.status    
    
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
        if (winner !== '') {
            setPokerStatus('WINNER')
        }
    }, [winner])

    useEffect(() => {
        isShuffling
            ? setPokerStatus('...shuffling deck')
            : setPokerStatus('')
    }, [isShuffling])

    const findWinner = () => {
        props.handIsOver(true)
    }

    const pocketMapper = () => {
        props.cards.pocket.map((card, i) => (
            <div key={i} >
                <p> {card.card_rank} </p>
                <p> {card.card_suit} </p>                
            </div>
        ))
    }

    const hasPocketPair = () => {
        let playerPocket = props.cards.pocket.map(element => element.card_suit) 

        playerPocket[0] === playerPocket[1]
            ? props.isSuited(true) && setPocketStatus('SUITED')
            : setPocketStatus('')
    }

    let pocketShow = props.cards.pocket.map((element, i) => (
            <div key={i} id='show-pocket' >
                {element.card_rank}
            </div>
    ))
    
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
                    onClick={() => console.log(props.game.poker.players)} 
                    className='action-btns' 
                    > Show'em </button> */}
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