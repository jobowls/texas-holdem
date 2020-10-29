    // NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
    // LOCAL
import Welcome from '../../Home/Welcome'
import './Status.scss'

const Status = (props) => {
    const {cash, username, profile_pic} = props.user.player

    useEffect(() => {
        console.log(props)
    }, [props])

    let cost = (cash - 500)

    return (
        <div className='game-loading'>
            <div className='table-entry' >
                <img id='entry-pic' alt='' src={profile_pic}  />
                <h2> {username} </h2>
                <p> Bankroll: ${cash} </p>
                <p> Table Buy-in: ${cost.toFixed(2)} </p>
                <button
                    id='launch-btn'
                    onClick={props.launchGame}
                    > Buy-in </button>
            </div>
            {/* {
                !username
                ? <Welcome />
                :   <div className='table-entry' >
                        <img id='entry-pic' alt='' src={profile_pic}  />
                        <h2> {username} </h2>
                        <p> Bankroll: ${cash} </p>
                        <p> Table Buy-in: ${cost.toFixed(2)} </p>
                        <button
                            id='launch-btn'
                            onClick={props.launchGame}
                            > Buy-in </button>
                    </div>
            } */}
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(withRouter(Status))