import React, {useEffect} from 'react'
import './Community.scss'
import {connect} from 'react-redux'

const Pocket = (props) => {

    // useEffect(() => {

    // }, [props.cards.pocket])

    return (
        <div className='pocket-container' >
            {
                props.game.poker.players[0].isFolding ?
                props.cards.pocket.map((card, i) => (
                    <div key={i}  
                        className='pocket-hand' 
                        style={{opacity: '20%'}} >
                        <img className='card-face' alt='' src={card.card_face} />
                    </div>
                ))
                :
                props.cards.pocket.map((card, i) => (
                    <div key={i}  className='pocket-hand' >
                        <img className='card-face' alt='' src={card.card_face} />
                    </div>
                ))
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Pocket)