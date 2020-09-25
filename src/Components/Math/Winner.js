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
    //     let copyOrigin = [...best5]
    // const [origin] = useState([copyOrigin[joker]])


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
                console.log(round, 'round =>> STATE')
                console.log(current, 'current =>> STATE')
                console.log(comparisonsArr, 'comparisonsArr =>> LOCAL')
            if (!comparisonsArr[0]) {
                evenSplit()
            } else {
                tieBreaker(comparisonsArr)
            }
        }
    }, [round])


        let ace = 0 ;
        let king = 0 ;
        let queen = 0 ;
        let jack = 0 ;
        let ten = 0 ;
        let nine = 0 ;
        let eight = 0 ;
        let seven = 0 ;
        let six = 0 ;
        let five = 0 ;
        let four = 0 ;
        let three = 0 ;
        let two = 0;

        let ranksArr = [
            ace,
            king,
            queen,
            jack,
            ten,
            nine,
            eight,
            seven,
            six,
            five,
            four,
            three,
            two
        ]

    const findHighest = (arr) => {
        return Math.max(...arr)
    }

    const findWinner = () => {
        let allScores = [props.score.myHand.score, props.score.botA.score, props.score.botB.score, props.score.botC.score]

        let highScore = findHighest(allScores)
            console.log(allScores, 'SCORES-ARR')
            console.log(highScore, 'HIGH-SCORE')

        let tiedArr = allScores.filter(e => e === highScore)
            console.log(tiedArr.length, 'TIED-COUNT =>>')

            let tScores = []
            let remainingPlayers = []
            let indexedArr = []

        let champIndex = allScores.indexOf(highScore)
            console.log(champIndex, 'CHAMP-INDEX')

            for (let i = 0; i < allScores.length; i++) {

                if (allScores[i] === highScore) {
                        console.log(i, 'TIED-INDEX')
                    indexedArr.push(i)
                    tScores.push(allScores[i])
                    remainingPlayers.push(copyArr[i])
                }
            }

            if (tiedArr.length === 1) {
                    console.log(remainingPlayers, 'evalPlayers =>>')
                    console.log(players[champIndex])
                    console.log(champIndex)
                    // console.log(compareCards)
                setJoker(champIndex)
                setReady(true)
            } else {
                    console.log(tScores, 'tScores')
                    console.log(remainingPlayers, 'evalPlayers =>>')
                    // console.log(compareCards)
                // tieBreaker([...remainingPlayers])
                setCurrent([...remainingPlayers])
                setKey([...indexedArr])
                setRound(1)
            }
        console.log('...game over')
    }

    const tieBreaker = (arr) => {
                    console.log(arr, 'SUDDEN_DEATH')
                let foundHighest = findHighest(arr)
                    console.log(foundHighest, 'FOUND')
            let filtered = arr.filter(e => e === foundHighest)
                console.log(filtered, 'FILTERED')
        let wIndex = arr.indexOf(foundHighest)
            console.log(wIndex, 'W_INDEX')

            console.log(copyArr, 'COPY_ARR')
            // console.log(origin, 'ORIGIN')
            console.log(current, 'CURRENT')
            console.log(key, 'KEY_INDEXES')

        if (filtered.length === 1) {
            setJoker(key[wIndex])
            setReady(true)
        } else {
            setRound(round + 1)
        }
    }

    const evenSplit = () => {
        let payout = pot
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