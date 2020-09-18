import React, {useEffect} from 'react'
import './Community.scss'
import {connect} from 'react-redux'

const Community = (props) => {
    // useEffect(() => {
    //     // console.log(props.cards.community)
    // }, [props.cards.community])

    const {flop, turn, river} = props.cards
    const house = [...flop, ...turn, ...river]
    // console.log(house, 'HOUSE')
    return (
        <div className='Community-master' >
            {/* <div id='house-container'> */}
            {
                house.map((card, i) => (
                    <div key={i}  className='house-container' >
                        <img className='house-faces' alt='' src={card.card_face} />
                    </div>
                ))
            }
            {/* </div> */}
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Community)