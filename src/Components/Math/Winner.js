import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {cipher} from './CountingCards'
import {setScore, setScoreA, setScoreB, setScoreC} from '../../ducks/scoringReducer'
import {setWinner} from '../../ducks/pokerReducer'
import {showAllHands} from '../../ducks/cashReducer'
import './Winner.scss'

const Winner = (props) => {
    const {listOfHands} = props.rules

    const [finalTable] = useState([
        props.game.poker.players[0].username,
        props.game.poker.players[1].username,
        props.game.poker.players[2].username,
        props.game.poker.players[3].username
    ])

    useEffect(() => {
        let type = props.score.myHand.handType
        let typeA = props.score.botA.handType
        let typeB = props.score.botB.handType
        let typeC = props.score.botC.handType

        if (props.score.myHand.handType) {
            addScore(type, 'Player1')
        }

        if (props.score.botA.handType) {
            addScore(typeA, 'Hamilton')
        }

        if (props.score.botB.handType) {
            addScore(typeB, 'Burr')
        }

        if (props.score.botC.handType) {
            addScore(typeC, 'Jefferson')
        }

    }, [props.score.myHand.handType, props.score.botA.handType, props.score.botB.handType, props.score.botC.handType])

    const addScore = (type, player) => {
        let list = listOfHands.filter(el => el.badge_name === type)
        let foundScore = list[0].badge_score
            console.log(foundScore, 'SWITCH-HITTER')
        
        switch(player) {
            case 'Hamilton':
                props.setScoreA(+foundScore)
                console.log(player, type)
                break;
            case 'Burr':
                props.setScoreB(+foundScore)
                console.log(player, type)
                break;
            case 'Jefferson':
                props.setScoreC(+foundScore)
                console.log(player, type)
                break;
            case 'Player1':
                props.setScore(+foundScore)
                console.log(player, type)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        let player1 = props.score.myHand.score
        let hammies = props.score.botA.score
        let burro = props.score.botB.score
        let jeffy = props.score.botC.score        

        let winnerCircle = [player1, hammies, burro, jeffy]
        findWinner(winnerCircle)

    }, [props.score.myHand.score, props.score.botA.score, props.score.botB.score, props.score.botC.score])
    
    const findWinner = (scoresArr) => {        
        let highScore = Math.max(...scoresArr)
        let tiedArr = scoresArr.filter(e => e === highScore)
        
        if (tiedArr.length > 1) {
            for (let i = 0; i < scoresArr.length; i++) {
                if (scoresArr[i] === highScore) {
                    console.log([i] , scoresArr[i], i, 'TIED-INDEX')
                }
            }
        }

        let foundChampIndex = cipher(scoresArr, highScore)
        let foundWinner = finalTable[foundChampIndex]            

        if (props.game.status.handIsOver === true) {
            props.setWinner(foundWinner)
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
    showAllHands
})(Winner)