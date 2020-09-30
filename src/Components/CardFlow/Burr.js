import React, {useEffect, useState} from 'react'
import './Community.scss'
import {connect} from 'react-redux'
import cardBack from '../../assets/card-back.jpg'

const Burr = (props) => {
    
    return (
        <div className='pocket-container' >
            {
                props.game.poker.players[2].isFolding ?
                <div 
                    className='pocket-hand' 
                    style={{opacity: '20%'}} >
                    <img src={cardBack} alt='' className='card-back' />
                    <img src={cardBack} alt='' className='card-back' />
                </div>
                :
                props.cash.status.showAllHands === true ?
                props.cards.pocketAi2.map((element, i) => (
                <div className='pocket-hand' key={i} >
                    <img src={element.card_face} alt='' className='card-face' />
                </div>
                ))
            :
                <div className='pocket-hand' >
                    <img src={cardBack} alt='' className='card-back' />
                    <img src={cardBack} alt='' className='card-back' />
                </div>
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Burr)