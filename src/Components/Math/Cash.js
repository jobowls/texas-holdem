import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setPot} from '../../ducks/cashReducer'
import './Cash.scss'

const Cash = (props) => {
    const [moneyPool, setMoneyPool] = useState(0)
    const [smBlind, setSmBlind] = useState(0)
    const [bgBlind, setBgBlind] = useState(0)

    useEffect(() => {
        setMoneyPool(props.cash.cashFlow.pot)
    }, [props.cash.cashFlow.pot])

    useEffect(() => {
        setSmBlind(props.game.poker.smallBlind)
        setBgBlind(props.game.poker.bigBlind)
    }, [props.game.poker.smallBlind, props.game.poker.bigBlind, setSmBlind, setBgBlind])

    useEffect(() => {
        if (props.cards.pocket.length) {
            props.setPot(smBlind + bgBlind)
        } else {
            props.setPot(0)
        }
    }, [props.cards.pocket])

    return (
        <div className='Cash-master' >
            {/* <p > Pot </p> */}
            <p id='money-pool'> ${moneyPool} </p>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {setPot})(Cash)