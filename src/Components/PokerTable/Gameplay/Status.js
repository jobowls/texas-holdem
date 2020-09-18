import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import './Status.scss'
// import FlowModal from './FlowModal'

const Status = (props) => {
    const [launched, setLaunched] = useState(false)

    // useEffect(() => {

    // }, [props.game.status.paid])

    return (
        <div className='game-loading'>
            {
                props.game.status.paidEntry === false ?
                <button
                id='launch-btn'
                onClick={props.launchGame}
                > Buy-in </button>
                :
                // <FlowModal  />
                null
            }
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(withRouter(Status))