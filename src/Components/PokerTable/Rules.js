import React, {useState, useEffect} from 'react'
import './Rules.scss'
import axios from 'axios'
import {connect} from 'react-redux'
import {GiPokerHand} from 'react-icons/gi'
import {setRules} from '../../ducks/rulesReducer'

const Rules = (props) => {
    
    useEffect(() => {
        getRules()
    }, [props.game.status.paidEntry])

    const getRules = () => {
        axios.get('/api/rules')
        .then(res => props.setRules(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className='rules-master' >
            <div className='rules-list-container' >
                <h3 id='rules-title' > Poker Hands </h3>
                {
                    props.rules.listOfHands.map((rules => (
                        <div key={rules.badge_id} className='rules-list' >
                            <GiPokerHand  id='icons'  />
                            <p> {rules.badge_name} </p>
                            <p> {rules.badge_score} XP </p>
                        </div>
                    )))
                }
            </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {setRules})(Rules)