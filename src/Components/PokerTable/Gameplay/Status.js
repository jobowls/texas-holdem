    // NPM
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

    // LOCAL
import './Status.scss'

const Status = (props) => {

    return (
        <div className='game-loading'>
            {
                props.game.status.paidEntry === false 
                ? <button
                    id='launch-btn'
                    onClick={props.launchGame}
                    > Buy-in </button>
                : null
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(withRouter(Status))