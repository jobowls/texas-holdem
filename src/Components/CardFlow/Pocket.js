import React from 'react'
import {connect} from 'react-redux'
import cardBack from '../../assets/card-back.jpg'
import './Community.scss'

const Pocket = (props) => {
    return (
        <div className='pocket-container' >
            {
                props.game.poker.players[0].isFolding 
                ?   <div className='pocket-hand' style={{opacity: '20%'}} >
                        <img src={cardBack} alt='' className='card-back' />
                        <img src={cardBack} alt='' className='card-back' />
                    </div>
                : props.cards.pocket.map((card, i) => (
                    <div className='pocket-hand' key={i} >
                        <img className='card-face' alt='' src={card.card_face} />
                    </div>
                ))
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Pocket)