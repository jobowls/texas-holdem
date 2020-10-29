import React from 'react'
import {connect} from 'react-redux'
import {GiPerpendicularRings} from 'react-icons/gi'
import './Button.scss'

const Button = (props) => {

    return (
        <div id='dealer-btn' >
            <GiPerpendicularRings id='fancy-Btn' />             
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Button)