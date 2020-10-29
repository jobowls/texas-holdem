import React from 'react'
import {connect} from 'react-redux'
import {GiCash} from 'react-icons/gi'
import './Button.scss'

const Button = (props) => {
    return (
        <div id='dealer-blinds' style={{color: 'rgb(222, 195, 0)'}} >
            <GiCash id='fancy-blinds' /> 
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Button)