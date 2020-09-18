import React, {useEffect} from 'react'
import './Community.scss'
import {connect} from 'react-redux'

const Burning = (props) => {

    // useEffect(() => {
    //     // console.log(props.game.handC, 'Burning')
    // }, [props.cards.burned])

    return (
        <div className='Felt-master' >
            {
                props.cards.burned.map((card, i) => (
                    <div key={i}  className='burnPile' >
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