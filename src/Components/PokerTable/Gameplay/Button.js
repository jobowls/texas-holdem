import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import './Button.scss'
import {GiHolosphere, GiPerpendicularRings, GiShipWheel, GiStarSkull, GiCircleClaws, GiSpadeSkull, Gi3DHammer, GiAmethyst, GiAnchor, GiIciclesAura, GiCoilingCurl, GiPlanetCore, GiRingedPlanet, GiBandit} from 'react-icons/gi'
import {GiCash, GiCoins, GiSpermWhale, GiPayMoney, GiMoneyStack, GiTwoCoins} from 'react-icons/gi'
import {FaCoins} from 'react-icons/fa'

const Button = (props) => {
    const {buttonIndex} = props.game.poker
    return (
        <div 
            id='dealer-btn' 
            // style={
                // buttonIndex === 1 ? {color: 'rgb(50, 220, 140)'}
                // : buttonIndex === 2 ? {color: 'dodgerBlue'}
                // : buttonIndex === 3 ? {color: 'orange'}
                // : buttonIndex === 4 ? {color: 'red'}
                // : null 
                // {color: 'rgb(0, 0, 0)'}
            // } 
            >
            <GiPerpendicularRings id='fancy-Btn' />             
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Button)