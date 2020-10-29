import React from 'react'
import {connect} from 'react-redux'
import Community from '../../CardFlow/Community'
import Cash from '../../Math/Cash'
import './FeltTable.scss'

const FeltTable = (props) => {

    return (
        <div className='Felt-master' >
            <Cash  />
            <Community />
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(FeltTable)