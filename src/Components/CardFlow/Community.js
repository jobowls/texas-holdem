import React from 'react'
import {connect} from 'react-redux'
import './Community.scss'

const Community = (props) => {
    const {flop, turn, river} = props.cards
    const house = [...flop, ...turn, ...river]
    
    return (
        <div className='Community-master' >            
            {
                house.map((card, i) => (
                    <div key={i}  className='house-container' >
                        <img className='house-faces' alt='' src={card.card_face} />
                    </div>
                ))
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Community)