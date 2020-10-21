import React from 'react'
import {connect} from 'react-redux'
import './Community.scss'

const Burning = (props) => {
    return (
        <div className='Felt-master' >
            {
                props.cards.burned.map((card, i) => (
                    <div className='burnPile' key={i} >
                        <img className='card-face' alt='' src={card.card_face} />
                        {/* <p id='card-label' > {card.card_rank, card.card_suit} </p> */}
                    </div>
                ))
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Burning)