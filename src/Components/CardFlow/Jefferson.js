import React from 'react'
import {connect} from 'react-redux'
import cardBack from '../../assets/card-back.jpg'
import './Community.scss'

const Jefferson = (props) => {
    const {players} = props.game.poker
    const {showAllHands} = props.cash.status
    const {pocketAi3} = props.cards

    return (
        <div className='pocket-container' >
            {
                players[3].isFolding
                ?   <div className='pocket-hand' style={{opacity: '20%'}} >
                        <img src={cardBack} alt='' className='card-back' />
                        <img src={cardBack} alt='' className='card-back' />
                    </div>

                : showAllHands === true
                ? pocketAi3.map((element, i) => (
                    <div className='pocket-hand' key={i} >
                        <img src={element.card_face} alt='' className='card-face' />
                    </div>
                ))

                :   <div className='pocket-hand' >
                        <img src={cardBack} alt='' className='card-back' />
                        <img src={cardBack} alt='' className='card-back' />
                    </div>
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Jefferson)