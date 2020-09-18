import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
// import './Button.scss'
import {GiHolosphere, GiPerpendicularRings, GiShipWheel, GiStarSkull, GiCircleClaws, GiSpadeSkull, Gi3DHammer, GiAmethyst, GiAnchor, GiIciclesAura, GiCoilingCurl, GiPlanetCore, GiRingedPlanet, GiBandit} from 'react-icons/gi'
import {GoPrimitiveDot} from 'react-icons/go'

const Button = (props) => {
    const {buttonIndex} = props.game.poker

    return (
        <div 
            id='dealer-btn' 
            style={{color: 'silver'}}
            >
            <GoPrimitiveDot id='fancy-Btn' /> 
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Button)