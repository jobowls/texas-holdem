import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './Marquee.scss'

const Marquee = ( props) => {

    const [pokerStatus, setPokerStatus] = useState([])

    useEffect(() => {
        actionFeed()
    }, [])

    const actionFeed = (player, type) => {
        switch(player) {
            case 'Player1':
                console.log(type)
                break;
            default:
                break;
        }
    }

    return (
        <div className='Marquee-master'>
            {pokerStatus}
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Marquee)