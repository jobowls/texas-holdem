import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './Marquee.scss'
import Winner from '../Math/Winner'
import ShowStopper from './ShowStopper'

const Marquee = (props) => {
    const {handIsOver} = props.game.status

    return (
        <div className='Marquee-master'>
            <p> {props.user.player.username} </p>
            <div className='marquee-header' >
                <ShowStopper />
            </div>
            <div id='winner-bucket' >
            {
                handIsOver ?
                <Winner />
                :
                null
            }
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Marquee)