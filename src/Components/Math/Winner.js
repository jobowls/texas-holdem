    // NODE
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

    // LOCAL
import {cipher, eliminate} from './CountingCards'
import {setScore, setScoreA, setScoreB, setScoreC} from '../../ducks/scoringReducer'
import {setWinner, banker, setWIndex} from '../../ducks/pokerReducer'
import {showAllHands} from '../../ducks/cashReducer'
import './Winner.scss'

const Winner = (props) => {
    const {players} = props.game.poker
    const {lastManStanding, handIsOver, wReady} = props.game.status
    const {pot} = props.cash.cashFlow
    const {showAllHands} = props.cash.status
    // console.log(props, 'WINNER-PROPS')

    const [joker, setJoker] = useState(0)
        let money = players[joker].cash + pot

    const [key, setKey] = useState([])
    const [ready, setReady] = useState(false)
    const [go, setGo] = useState(false)
    const [round, setRound] = useState(0)
    const [current, setCurrent] = useState([])
        let changeCurrent = [...current]

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
    
    let liveStatus = [
        players[0].isFolding,
        players[1].isFolding,
        players[2].isFolding,
        players[3].isFolding
    ]

    useEffect(() => {
    }, [props.game.poker.phase])

    useEffect(() => {
        if (wReady) {
            findWinner()
        } else if (lastManStanding && handIsOver) {
            props.setWinner(finalTable[lastManStanding - 1]) && props.banker(money, lastManStanding - 1)
        } 
    }, [lastManStanding, wReady, handIsOver, finalTable, pot])


    useEffect(() => {
        if (ready) {
            props.setWinner(finalTable[joker])
            props.banker(money, joker)
        }
    }, [joker, finalTable, pot, ready])


    useEffect(() => {
        let comparisonsArr = eliminate(changeCurrent, round - 1)
        if (round) {
            if (comparisonsArr === null) {
                evenSplit()                
            } else {
                tieBreaker(comparisonsArr)
            }
        }
    }, [round])


    const findHighest = (arr) => {
        return Math.max(...arr)
    }

    const findWinner = () => {
        let tScores = []
        let remainingPlayers = []
        let indexedArr = []
        let allScores = [
            props.score.myHand.score,
            props.score.botA.score,
            props.score.botB.score,
            props.score.botC.score
        ]
            let copyScores = [...allScores]

            for (let i = 0; i < liveStatus.length; i++) {
                if (liveStatus[i] === true) {
                    copyScores[i] = 0
                }
            }

        let highScore = findHighest(copyScores)
            let tiedArr = copyScores.filter(e => e === highScore)
                let champIndex = copyScores.indexOf(highScore)

            for (let i = 0; i < copyScores.length; i++) {
                if (copyScores[i] === highScore) {
                    indexedArr.push(i)
                    tScores.push(copyScores[i])
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
        let remainingPlayers = []
        let indexedArr = []

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === foundHighest) {
                remainingPlayers.push(changeCurrent[i])
                indexedArr.push(key[i])
            }
        }

        if (filtered.length === 1) {
            setJoker(key[wIndex])
            setReady(true)
        } else {
            setCurrent([...remainingPlayers])
            setKey([...indexedArr])                    
            setRound(round + 1)
        }
    }

    const evenSplit = () => {
        let amount = (pot / key.length)
        let winnerCircle = []
        
        for (let i = 0; i < key.length; i++) {                
            let payout = (amount + players[key[i]].cash)
            winnerCircle.push(finalTable[key[i]])
            props.banker(payout, key[i])
        }

        winnerCircle.length === 2
            ? props.setWinner(`${winnerCircle[0]} | ${winnerCircle[1]} ($${amount})`)
            : winnerCircle.length === 3
            ? props.setWinner(`${winnerCircle[0]} | ${winnerCircle[1]} | ${winnerCircle[2]} ($${amount})`)
            : props.setWinner(`${winnerCircle[0]} | ${winnerCircle[1]} | ${winnerCircle[2]} | ${winnerCircle[3]} ($${amount})`)
    }

    return (
        <div className='chicken-dinner' >
            <p> Winner: {props.game.status.winner} </p>
            <p> Pot: ${pot} </p>
            {/* {
                handIsOver && lastManStanding
                ?   <div>
                        <p> Winner: {props.game.status.winner} </p>
                        <p> Pot: ${pot} </p>
                    </div>
                : 
            } */}
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
    // setWIndex
})(Winner)