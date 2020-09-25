import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {cipher, eliminate} from './CountingCards'
import {setScore, setScoreA, setScoreB, setScoreC} from '../../ducks/scoringReducer'
import {setWinner, banker, isShuffling} from '../../ducks/pokerReducer'
import {showAllHands} from '../../ducks/cashReducer'
import './Winner.scss'
import { GiConsoleController } from 'react-icons/gi'

const Winner = (props) => {
    const {players} = props.game.poker
    const {pot} = props.cash.cashFlow

    const [joker, setJoker] = useState(0)
        let money = players[joker].cash + pot

    const [ready, setReady] = useState(false)
    const [round, setRound] = useState(0)
    const [current, setCurrent] = useState([])
        let changeCurrent = [...current]

    const [key, setKey] = useState([])

    const [finalTable] = useState([
        props.game.poker.players[0].username,
        props.game.poker.players[1].username,
        props.game.poker.players[2].username,
        props.game.poker.players[3].username
    ])

    const [best5] = useState([
        [...props.score.myHand.kickerArr],
        [...props.score.botA.kickerArr],
        [...props.score.botB.kickerArr],
        [...props.score.botC.kickerArr]
    ])
        let copyArr = [...best5]

    useEffect(() => {
        console.log(best5)
        findWinner()        
    }, [props.game.status.handIsOver, best5])    


    useEffect(() => {
        if (ready) {            
            props.setWinner(finalTable[joker])
            props.banker(money, joker)
        }
    }, [joker, finalTable, pot, ready])


    useEffect(() => {
        let comparisonsArr = eliminate(changeCurrent, round - 1)

        if (round !== 0) {
            !comparisonsArr[0] 
            ? evenSplit() 
            : tieBreaker(comparisonsArr)
        }
    }, [round])


    const findHighest = (arr) => {
        return Math.max(...arr)
    }

    const findWinner = () => {
        let allScores = [props.score.myHand.score, props.score.botA.score, props.score.botB.score, props.score.botC.score]
        let tScores = []
        let remainingPlayers = []
        let indexedArr = []

        let highScore = findHighest(allScores)
        let tiedArr = allScores.filter(e => e === highScore)
        let champIndex = allScores.indexOf(highScore)

            for (let i = 0; i < allScores.length; i++) {

                if (allScores[i] === highScore) {
                    indexedArr.push(i)
                    tScores.push(allScores[i])
                    remainingPlayers.push(copyArr[i])
                }
            }

            if (tiedArr.length === 1) {
                setJoker(champIndex)
                setReady(true)
            } else {                
                setCurrent([...remainingPlayers])
                setKey([...indexedArr])
                setRound(1)
            }
    }

    const tieBreaker = (arr) => {                    
                let foundHighest = findHighest(arr)                    
            let filtered = arr.filter(e => e === foundHighest)                
        let wIndex = arr.indexOf(foundHighest)                                                            

        if (filtered.length === 1) {
            setJoker(key[wIndex])
            setReady(true)
        } else {
            setRound(round + 1)
        }
    }

    const evenSplit = () => {
        let payout = (pot / key.length + pot)
        let winnerCircle = []
        
        for (let i = 0; i < key.length; i++) {
            winnerCircle.push(finalTable[key[i]])
            props.banker(payout, key[i])
        }

        for (let i = 0; i < winnerCircle.length; i++) {
            props.setWinner(
                `${winnerCircle[i]} Split the Pot // ${payout}`)
        }
    }

    return (
        <div className='chicken-dinner' >
            {props.game.status.winner}
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setScore,
    setScoreA,
    setScoreB,
    setScoreC,
    cipher,
    setWinner,
    showAllHands,
    banker
})(Winner)