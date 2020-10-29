    // NPM
import React from 'react'
import {connect} from 'react-redux'

    // LOCAL
import './Marquee.scss'
import Winner from '../Math/Winner'
import ShowStopper from './ShowStopper'

const Marquee = (props) => {
    const {handIsOver, winner} = props.game.status
    const {username} = props.user.player

    return (
        <div className='Marquee-master'>
            <p> {username} </p>
            <div className={handIsOver && winner === 'Player1' ? 'marquee-header-w' : 'marquee-header'} > <ShowStopper /> </div>
            <div id='winner-bucket' > {handIsOver ? <Winner /> : null} </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Marquee)