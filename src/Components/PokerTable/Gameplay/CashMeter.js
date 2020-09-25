import React, {useState, useEffect, useReducer} from 'react'
import {connect} from 'react-redux'
import './CashMeter.scss'


const CashMeter = (props) => {
    const [seats, setSeats] = useState([])
    const [bet, setBet] = useState(0)
    const [status, setStatus] = useState('')
    const [smBlind, setSmBlind] = useState(0)
    const [bgBlind, setBgBlind] = useState(0)

    useEffect(() => {
        // if (props.game.poker.players.length) {
            setSeats(props.game.poker.players)
            // console.log(seats, 'cash-meter')
        // }
    }, [props.game.poker.players, setSeats])

    useEffect(() => {
        setSmBlind(props.game.poker.smallBlind)
        setBgBlind(props.game.poker.bigBlind)
    }, [props.game.poker.smallBlind, props.game.poker.smallBlind])

    useEffect(() => {
        anteUp()
    }, [props.game.poker.round])

    const anteUp = () => {
        
    }

    const clearPot = () => {

    }

    const cashMeter = (value) => {
        setBet(value += bet)
    }

    const foldHand = () => {
        setStatus('isFolded')
    }

    return (
        <div className='slide-rule' >
            {/* <div>
                <p style={{color: 'silver'}} > {props.cash.cashFlow.pot} </p>
            </div> */}
                <div className='modal-counter' >
                    <button  
                        id='ticker-btn-increment'
                        onChange={(evt) => setBet(evt.target.value)}
                        value={bet}
                        onClick={(evt) => cashMeter(evt.target)} 
                        onDrag={(evt) => setBet(evt.target += 25)}
                        > + 25 </button>
                    <p> ${bet}.00 </p>
                    <button 
                        id='ticker-btn-reset'
                        onChange={(evt) => setBet(evt.target.value)}
                        onClick={() => setBet(0)} 
                        > Reset </button>
                </div>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    // setMinBet,
    // setPot
    // isChecking,
    // isFolding,
    // isCalling,
    // isBetting,
    // isRaising
})(CashMeter)