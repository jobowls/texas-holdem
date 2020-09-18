import React, {useState, useEffect} from 'react'
import './FeltTable.scss'
import {connect} from 'react-redux'
import Community from '../../CardFlow/Community'
import {GiLighthouse} from 'react-icons/gi'
import Cash from '../../Math/Cash'

const FeltTable = (props) => {

    useEffect(() => {
        // console.log(props.cards, 'FELTTABLE')
    }, [props.cards])

    return (
        <div className='Felt-master' >
            <Cash  />
            <Community />
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(FeltTable)