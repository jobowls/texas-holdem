import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import './Button.scss'
import {GiCash, GiCoins, GiPayMoney, GiMoneyStack, GiTwoCoins} from 'react-icons/gi'

const Button = (props) => {
    return (
        <div 
            id='dealer-blinds' 
            style={{color: 'rgb(222, 195, 0)'}} >
            <GiCash id='fancy-blinds' /> 
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Button)