import React, {useEffect, useState} from 'react'
import './Community.scss'
import {connect} from 'react-redux'
import cardBack from '../../assets/card-back.jpg'

const Jefferson = (props) => {
    
    // useEffect(() => {

    // }, [props.cards.pocketAi3])

    return (
        <div className='pocket-container' >
            {
                props.cash.status.showAllHands === true ?
                props.cards.pocketAi3.map((element, i) => (
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

export default connect(mapStateToProps)(Jefferson)