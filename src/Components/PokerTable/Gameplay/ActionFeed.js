import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import ScoreHamilton from './ScoreHamilton'
import ScoreBurr from './ScoreBurr'
import ScoreJefferson from './ScoreJefferson'
import './ActionFeed.scss'

const ActionFeed = (props) => {
    
    return (
        <div className='Feed-Master' >
            <ScoreHamilton  />
            <ScoreBurr  />
            <ScoreJefferson  />
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {})(ActionFeed)