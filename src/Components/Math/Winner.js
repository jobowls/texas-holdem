import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {cipher, eliminate} from './CountingCards'
import {setScore, setScoreA, setScoreB, setScoreC} from '../../ducks/scoringReducer'
import {setWinner, banker} from '../../ducks/pokerReducer'
import {showAllHands} from '../../ducks/cashReducer'
import './Winner.scss'

const Winner = (props) => {
    const {players} = props.game.poker
    const {pot} = props.cash.cashFlow

    const [joker, setJoker] = useState(0)
        let money = players[joker].cash + pot

    const [key, setKey] = useState([])
    const [ready, setReady] = useState(false)
    const [round, setRound] = useState(0)
    const [current, setCurrent] = useState([])
        let changeCurrent = [...current]

    const [finalTable] = useState([
        props.game.poker.players[0].username,
        props.game.poker.players[1].username,
        props.game.poker.players[2].username,
        props.game.poker.players[3].username
    ])

    const [checkMoney] = useState([
        props.game.poker.players[0].cash,
        props.game.poker.players[1].cash,
        props.game.poker.players[2].cash,
        props.game.poker.players[3].cash
    ])

    const [best5] = useState([
        [...props.score.myHand.kickerArr],
        [...props.score.botA.kickerArr],
        [...props.score.botB.kickerArr],
        [...props.score.botC.kickerArr]
    ])
        let copyArr = [...best5]

    useEffect(() => {
        // console.log(best5)
        findWinner()        
    }, [props.game.status.handIsOver])    


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
                console.log(comparisonsArr, 'what is this?')                
                // tieBreaker(comparisonsArr)
            } else {
                tieBreaker(comparisonsArr)
            }
        }
    }, [round])


    const findHighest = (arr) => {
        return Math.max(...arr)
    }

    const findWinner = async() => {
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
                console.log(remainingPlayers, 'SHOULD BE SPLICED =>>')
                console.log(indexedArr, 'KEYS =>>')
                await setRound(1)
            }
        // await setFire(true)
    }

    const tieBreaker = async(arr) => {                    
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
                    console.log(key, 'KEYS =>>')
                setJoker(key[wIndex])
                setReady(true)
            } else {
                setCurrent([...remainingPlayers])
                setKey([...indexedArr])
                    console.log(remainingPlayers, 'UPDATED_COMPARISON =>> FIRED!')
                    console.log(indexedArr, 'UPDATED_KEYS =>> FIRED!')
                await setRound(round + 1)
            }
    }

    const evenSplit = () => {
        let amount = (pot / key.length)
        let winnerCircle = []
            console.log(checkMoney, 'PREV-PROPS')
        
        for (let i = 0; i < key.length; i++) {
                console.log(props.game.poker.players)
            let payout = ((pot / key.length) + players[key[i]].cash)
            winnerCircle.push(finalTable[key[i]])
            props.banker(payout, key[i])
                console.log(props.score, '!!!')
        }

        for (let i = 0; i < winnerCircle.length; i++) {
            props.setWinner(`${winnerCircle[i]} Split the Pot // $${amount}`)
        }
        // winnerCircle.map((e, i) => (
        //     <p key={i}> {`${e} Split the Pot $${amount}`} </p>
        // ))
    }

    return (
        <div className='chicken-dinner' >
            <p> Winner: {props.game.status.winner} </p>
            <p> Pot: ${pot} </p>
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