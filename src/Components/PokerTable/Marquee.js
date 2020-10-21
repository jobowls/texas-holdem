    // NPM
import React from 'react'
import {connect} from 'react-redux'

    // LOCAL
import './Marquee.scss'
import Winner from '../Math/Winner'
import ShowStopper from './ShowStopper'

const Marquee = (props) => {
    const {handIsOver} = props.game.status

    return (
        <div className='Marquee-master'>
            {
                handIsOver 
                    ? <p> {props.game.status.winner} </p> 
                    : <p> {props.user.player.username} </p>
            }
            <div className={handIsOver ? 'marquee-header-w' : 'marquee-header'} > <ShowStopper /> </div>
            <div id='winner-bucket' > {handIsOver ? <Winner /> : null} </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Marquee)