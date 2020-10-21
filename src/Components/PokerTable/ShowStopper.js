    // NPM
import React from 'react'
import {connect} from 'react-redux'    
import {GiPokerHand} from 'react-icons/gi'

    // LOCAL
import './ShowStopper.scss'

const ShowStopper = (props) => {
    const {pocket} = props.cards
    const {finalHand, handType, highestCard, subType, kicker} = props.score.myHand

    const show = props.rules.listOfHands
        .filter(element => element.badge_name === handType)
        .map((rules => (
            <div key={rules.badge_id} className='rules-container' >
                <div className='theatre' >
                    <GiPokerHand id='modal-icons'
                        style={
                            handType === 'High Card' 
                                ? {color: 'silver', marginRight: '10px'} 
                                : {color: 'silver', marginRight: '10px'}
                            } />
                </div>
                <p style={{color: 'silver'}} > {rules.badge_name} </p>
                <p id='xp'> {rules.badge_score} XP </p>
            </div>
    )))

    const showA = props.rules.listOfHands
        .filter(element => element.badge_name === props.score.botA.handType)
        .map((rules => (
            <div  key={rules.badge_id} className='rules-container' >
                <div className='theatre' >
                    <GiPokerHand id='modal-icons'
                        style={
                            props.score.botA.handType === 'High Card' 
                            ? {color: 'silver', marginRight: '10px'} 
                            : {color: 'silver', marginRight: '10px'}
                        } />
                </div>
                <p style={{color: 'silver'}} > {rules.badge_name} </p>
                <p id='xp'> {rules.badge_score} XP </p>
            </div>
    )))

    const showB = props.rules.listOfHands
        .filter(element => element.badge_name === props.score.botB.handType)
        .map((rules => (
            <div key={rules.badge_id} className='rules-container' >
                <div className='theatre' >
                    <GiPokerHand id='modal-icons'
                        style={
                            props.score.botB.handType === 'High Card' 
                            ? {color: 'silver', marginRight: '10px'} 
                            : {color: 'silver', marginRight: '10px'}
                        } />
                </div>
                <p style={{color: 'silver'}} > {rules.badge_name} </p>
                <p id='xp'> {rules.badge_score} XP </p>
            </div>
    )))

    const showC = props.rules.listOfHands
        .filter(element => element.badge_name === props.score.botC.handType)
        .map((rules => (
            <div key={rules.badge_id} className='rules-container' >
                <div className='theatre' >
                    <GiPokerHand id='modal-icons'
                        style={
                            props.score.botC.handType === 'High Card'
                            ? {color: 'silver', marginRight: '10px'} 
                            : {color: 'silver', marginRight: '10px'}
                        } />
                </div>
                <p style={{color: 'silver'}} > {rules.badge_name} </p>
                <p id='xp'> {rules.badge_score} XP </p>
            </div>
    )))
    
    return (
        <div className='the-slot' >
            {
                props.game.status.winner === 'Hamilton'
                    ? <div className='show-stopper'> {showA} </div>

                    : props.game.status.winner === 'Burr' 
                    ? <div className='show-stopper'> {showB} </div>

                    : props.game.status.winner === 'Jefferson' 
                    ? <div className='show-stopper'> {showC} </div>

                    : <div className='show-stopper'> {show} </div>
            }
            <div id='sub-hand' >
                {
                    finalHand.length === 2 && handType === 'Pair'
                        ? <p> Pocket {subType} </p>

                        : handType === 'High Card'
                        ? <p> {highestCard} </p>

                        : !kicker
                        ? <p> {subType} </p>

                        : <p> {subType} | {kicker} </p>
                }
            </div>
                {
                    handType === 'High Card' && pocket[0].card_suit === pocket[1].card_suit
                        ?   <div id='marquee-pocket' >
                                <p style={{color: 'silver', marginRight: '10px'}} > Pocket: </p>
                                <p> {props.cards.pocket[0].card_rank} | {props.cards.pocket[1].card_rank} </p>
                                <p style={{color: 'silver', marginLeft: '10px'}} > Suited </p>
                            </div>
                            
                        : null
                }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(ShowStopper)