import React from 'react'
import {connect} from 'react-redux'
import './Community.scss'

const Pocket = (props) => {
    return (
        <div className='pocket-container' >
            {
                props.game.poker.players[0].isFolding 
                ? props.cards.pocket.map((card, i) => (
                        <div className='pocket-hand' style={{opacity: '20%'}} key={i} >
                            <img className='card-face' alt='' src={card.card_face} />
                        </div>
                ))

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