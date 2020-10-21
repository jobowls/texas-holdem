import React from 'react'
import {connect} from 'react-redux'
import './Button.scss'
import {GiTwoCoins} from 'react-icons/gi'

const Button = (props) => {
    return (
        <div id='dealer-blinds' style={{color: 'silver'}} >
            <GiTwoCoins id='fancy-blinds' /> 
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Button)