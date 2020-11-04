    // NPM
import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

    // LOCAL
import {setScore, setHighest, setKickerArr, setBestHand, setSubType, setKicker, countRoyalFlush, countStraightFlush, count4Kind, countFullHouse, countFlush, countStraight, count3Kind, count2Pair, countPair, countHighCard, resetBest5, setHandType, tallyOne, tallySuits} from '../../ducks/scoringReducer'
import {setRules} from '../../ducks/rulesReducer'
import {cipher, cipherSuits} from '../Math/CountingCards'
import './Rules.scss'

const MyScore = (props) => {
    const {finalHand} = props.score.myHand
    const {listOfHands} = props.rules
    const {best5} = props.score

    const [finalArr, setFinalArr] = useState([])
    const [finalSuitsArr, setFinalSuitsArr] = useState([])
    const [orderedArr] = useState([
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'Jack',
        'Queen',
        'King',
        'Ace'
    ])

    useEffect(() => {
        setFinalArr(props.score.finalArr)
        setFinalSuitsArr(props.score.finalSuitsArr)
        runScore()
    }, [finalHand])

    useEffect(() => {
        best5.hasRoyalFlush
            ? checkTypes('Royal Flush')
            : best5.hasStraightFlush
            ? checkTypes('Straight Flush')
            : best5.has4Kind
            ? checkTypes('4 of a Kind')
            : best5.hasFullHouse
            ? checkTypes('Full House')
            : best5.hasFlush
            ? checkTypes('Flush')
            : best5.hasStraight
            ? checkTypes('Straight')
            : best5.has3Kind
            ? checkTypes('3 of a Kind')
            : best5.has2Pair
            ? checkTypes('2 Pair')
            : best5.hasPair
            ? checkTypes('Pair')
            : best5.hasHighCard
            ? checkTypes('High Card')
            : console.log()
    }, [best5])

    const checkTypes = (player1) => {        
        let list = listOfHands.filter(el => el['badge_name'] === `${player1}`)

        switch(player1) {
            case 'Royal Flush':
                props.setKicker('')
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case 'Straight Flush':
                props.setKicker('')
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case '4 of a Kind':
                quadSquad()
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case 'Full House':
                props.setKicker('')
                fullerHouse()
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case 'Straight':
                props.setKicker('')
                count5()
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case 'Flush':
                flusher()
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case '3 of a Kind':
                tripoly()
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case '2 Pair':
                doubleUp()
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case 'Pair':
                snakeEyes()
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;
            case 'High Card':
                mileHigh()
                props.setHandType(`${player1}`)
                props.setScore(+list[0].badge_score)
                break;

            default:
                return null;
        }
    }

        let aces = 0 ;
        let kings = 0 ;
        let queens = 0 ;
        let jacks = 0 ;
        let tens = 0 ;
        let nines = 0 ;
        let eights = 0 ;
        let sevens = 0 ;
        let sixes = 0 ;
        let fives = 0 ;
        let fours = 0 ;
        let threes = 0 ;
        let twos = 0;
        
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

        let clubs = 0;
        let diamonds = 0;
        let spades = 0;
        let hearts = 0;

        finalHand.map(card => card.card_rank).forEach(
            (element => (
                element === '2' ? twos ++
                : element === '3' ? threes ++
                : element === '4' ? fours ++
                : element === '5' ? fives ++
                : element === '6' ? sixes ++
                : element === '7' ? sevens ++
                : element === '8' ? eights ++
                : element === '9' ? nines ++
                : element === '10' ? tens ++
                : element === 'Jack' ? jacks ++
                : element === 'Queen' ? queens ++
                : element === 'King' ? kings ++
                : element === 'Ace' ? aces ++
                : null
        )));
        
        finalHand.map(card => card.card_rank).forEach(
            (element => (
                element === '2' ? two ++
                : element === '3' ? three ++
                : element === '4' ? four ++
                : element === '5' ? five ++
                : element === '6' ? six ++
                : element === '7' ? seven ++
                : element === '8' ? eight ++
                : element === '9' ? nine ++
                : element === '10' ? ten ++
                : element === 'Jack' ? jack ++
                : element === 'Queen' ? queen ++
                : element === 'King' ? king ++
                : element === 'Ace' ? ace ++
                : null
        )));

        finalHand.map(card => card.card_suit).forEach(
            (element => (
                element === 'Diamonds' ? diamonds ++ 
                : element === 'Clubs' ? clubs ++
                : element === 'Spades' ? spades ++
                : element === 'Hearts' ? hearts ++
                : null
        )));

        let suitsArr = [
            clubs,
            diamonds,
            spades,
            hearts
        ];
    
        let ranksArr = [
            twos, 
            threes, 
            fours, 
            fives, 
            sixes, 
            sevens, 
            eights, 
            nines, 
            tens, 
            jacks, 
            queens, 
            kings, 
            aces
        ];

        let straightsArr = [
            twos,
            threes,
            fours,
            fives,
            sixes,
            sevens,
            eights,
            nines,
            tens,
            jacks,
            queens,
            kings,
            aces
        ];

        let ranksArr2 = [
            two,
            three, 
            four, 
            five, 
            six, 
            seven, 
            eight, 
            nine, 
            ten, 
            jack, 
            queen, 
            king, 
            ace
        ];

    //  [[A][A]] => 'POCKET PAIR'
    //  [[SUIT][SUIT]] => 'POCKET SUITED'
        let pocketPairRanks = finalHand.slice(finalHand.length - 2, finalHand.length).map(card => card.card_rank);
        let pocketPairSuited = finalHand.slice(finalHand.length - 2, finalHand.length).map(card => card.card_suit);

    //  [[a][a], [b][b]] => 'TWO PAIR'
        let doubles = ranksArr2.filter(element => element === 2);
        
    //  [[1][2][3][4][5]] => 'STRAIGHT'
        let startingPosition = straightsArr.findIndex(element => element > 0);
        let checkedArr = [];

    const runScore = () => {
        if (ranksArr.includes(4)) {
            props.count4Kind(true)
        } else if (ranksArr.includes(3) && ranksArr.includes(2)) {
            props.countFullHouse(true)
        } else if (suitsArr.includes(5)) {
            props.countFlush(true)
        } else if (ranksArr.includes(3)) {
            props.count3Kind(true)
        } else if (doubles.length === 3) {
            props.count2Pair(true)
        } else if (doubles.length >= 2) {
            props.count2Pair(true)
        } else if (ranksArr.includes(2)) {
            props.countPair(true)
        } else if (props.cards.pocket.length) {
            props.countHighCard(true)
        }

        for (let i = ranksArr.length - 1; i >= startingPosition; i--) {
            if (ranksArr[i] > 0) {
                checkedArr.push([i])
                
                if (checkedArr.length > 4) {
                    props.countStraight(true)
                    checkTypes('Straight')
                    break;
                }
            }
             else {
                checkedArr.splice(0, checkedArr.length)
            }
        }
    }

    const count5 = () => {
        let mapper = finalHand.map(el => el.card_rank)

        if (mapper.includes('Ace') && mapper.includes('2') && mapper.includes('3') && mapper.includes('4') && mapper.includes('5')) {
            props.setSubType('Ace to Five')
            props.setKickerArr([3])
        } else if (checkedArr.length > 4) {
            let card1 = checkedArr[0]
            let card2 = checkedArr[1]
            let card3 = checkedArr[2]
            let card4 = checkedArr[3]
            let card5 = checkedArr[4]
                let index1 = finalArr[card1]
                let index2 = finalArr[card2]
                let index3 = finalArr[card3]
                let index4 = finalArr[card4]
                let index5 = finalArr[card5]
                    let indexedArr = [index1, index2, index3, index4, index5]
                        let alpha = indexedArr[0]
                        let beta = indexedArr[1]
                        let charlie = indexedArr[2]
                        let delta = indexedArr[3]
                        let echo = indexedArr[4]

                let foundAlpha = orderedArr.indexOf(alpha)
            props.setKickerArr([foundAlpha])
            
                let alphaRomeo = cipherSuits(finalHand, alpha)
                let betaRomeo = cipherSuits(finalHand, beta)
                let charlieRomeo = cipherSuits(finalHand, charlie)
                let deltaRomeo = cipherSuits(finalHand, delta)
                let echoRomeo = cipherSuits(finalHand, echo)
                    let foundSuits = [alphaRomeo[0].card_suit, betaRomeo[0].card_suit, charlieRomeo[0].card_suit, deltaRomeo[0].card_suit, echoRomeo[0].card_suit]            

                let heartSlayer = foundSuits.filter(element => element === 'Hearts')
                let clubSlayer = foundSuits.filter(element => element === 'Clubs')
                let spadeSlayer = foundSuits.filter(element => element === 'Spades')
                let diamondSlayer = foundSuits.filter(element => element === 'Diamonds')
                    let heartTicker = heartSlayer.length                    
                    let clubTicker = clubSlayer.length                    
                    let spadeTicker = spadeSlayer.length                    
                    let diamondTicker = diamondSlayer.length
                
            let faceCountArr = [heartTicker, clubTicker, spadeTicker, diamondTicker]
            if (faceCountArr.includes(5) && `${index1}` === 'Ace') {
                props.countRoyalFlush(true)
                props.setSubType(
                    faceCountArr[0] >= 5 
                        ? 'Hearts'
                        : faceCountArr[1] >= 5 
                        ? 'Clubs'
                        : faceCountArr[2] >= 5 
                        ? 'Spades'
                        : faceCountArr[3] >= 5 
                        ? 'Diamonds'
                        : null
                )
            } else if (faceCountArr.includes(5)) {
                props.countStraightFlush(true)
                props.setSubType(
                    faceCountArr[0] >= 5 
                        ? `${index1} High // Hearts`
                        : faceCountArr[1] >= 5 
                        ? `${index1} High // Clubs`
                        : faceCountArr[2] >= 5 
                        ? `${index1} High // Spades`
                        : faceCountArr[3] >= 5 
                        ? `${index1} High // Diamonds`
                        : null
                )
            } else {
                props.setSubType(`${index5} to ${index1}`)
            }
        }
    }

    const fullerHouse = () => {
        let doubled = cipher(ranksArr, 2);
        let tripled = cipher(ranksArr, 3);
            let fullOf = doubled + 2;
            let house = tripled + 2;

                let bigger = finalArr[house - 2];
                let smaller = finalArr[fullOf - 2];
                let alpha = orderedArr.indexOf(bigger)
                let beta = orderedArr.indexOf(smaller)

        props.setSubType(`${bigger}s full of ${smaller}s`)
        props.setKickerArr([alpha, beta])
    }
    
    const flusher = () => {
        for (let i = 0; i < suitsArr.length; i++) {
            if (suitsArr[i] >= 5) {
                findingFlush(`${finalSuitsArr[i]}`)
            }
        }
    }

        const findingFlush = (suit) => {
            let filteredHighest = finalHand.filter(el => el['card_suit'] === suit)
            let mapper = filteredHighest.map(e => e.card_rank)            
                let card1 = cipher(orderedArr, mapper[0])
                let card2 = cipher(orderedArr, mapper[1])
                let card3 = cipher(orderedArr, mapper[2])
                let card4 = cipher(orderedArr, mapper[3])
                let card5 = cipher(orderedArr, mapper[4])
                let card6 = cipher(orderedArr, mapper[5])
                let card7 = cipher(orderedArr, mapper[6])                    
                    let sortedArr = [card1, card2, card3, card4, card5, card6, card7].filter(e => e !== -1).sort((a, b) => a - b).reverse()

                        let kicker = orderedArr[sortedArr[0]]                
                        let dux = [sortedArr[0]]
            
            props.setSubType(`${kicker} High`)
            props.setKicker(`${suit}`)
            props.setKickerArr(dux)
        }

    const quadSquad = () => {
        let quads = cipher(ranksArr, 4)
            let quadlets = (quads + 2)
                let fourKind = finalArr[quadlets - 2]
        
        if (ranksArr.includes(4)) {
            props.setSubType(`Quad ${fourKind}s`)
            quadKicker(`${fourKind}`)
        }
    }

        const quadKicker = (rank1) => {
            let filteredHand = finalHand.filter(el => el['card_rank'] !== rank1)
            let mapper = filteredHand.map(e => e.card_rank)

            let card1 = cipher(orderedArr, mapper[0])
            let card2 = cipher(orderedArr, mapper[1])
            let card3 = cipher(orderedArr, mapper[2])

                let sortedArr = [card1, card2, card3].filter(e => e !== -1).sort((a, b) => a - b).reverse()
            let kicker = orderedArr[sortedArr[0]]
            let dux = [orderedArr.indexOf(rank1), sortedArr[0]]

            props.setKicker(`${kicker} Kicker`)
            props.setKickerArr(dux)
        }

    const tripoly = () => {
                let triplets = cipher(ranksArr, 3)
            let tripCard = (triplets + 2)
        let threeKind = finalArr[tripCard - 2]

        props.setSubType(`Trip ${threeKind}s`)
        tripKicker(`${threeKind}`)
    }

        const tripKicker = (rank1) => {
            let filteredHand = finalHand.filter(el => el['card_rank'] !== rank1)
            let mapper = filteredHand.map(e => e.card_rank)

            let card1 = cipher(orderedArr, mapper[0])
            let card2 = cipher(orderedArr, mapper[1])
            let card3 = cipher(orderedArr, mapper[2])
            let card4 = cipher(orderedArr, mapper[3])

                let sortedArr = [card1, card2, card3, card4].filter(el => el !== -1).sort((a, b) => a - b).reverse()                    
            let kicker = orderedArr[sortedArr[0]]
            let dux = [orderedArr.indexOf(`${rank1}`), sortedArr[0], sortedArr[1]]
                    
            props.setKicker(`${kicker} Kicker`)
            props.setKickerArr(dux)
        }

    const doubleUp = () => {
        let indexedPairs = []

        for (let i = 0; i < ranksArr2.length; i++) {
            if (ranksArr2[i] === 2) {
                indexedPairs.push(i)
            }
        }
            
        indexedPairs.sort((a, b) => a - b)
            let cardA = indexedPairs[indexedPairs.length - 1]
            let cardB = indexedPairs[indexedPairs.length - 2]
            let cardC = indexedPairs[0]
        let pairA = orderedArr[cardA]
        let pairB = orderedArr[cardB]
        let pairC = orderedArr[cardC]

        props.setSubType(`${pairA}s & ${pairB}s` )
        findingDoublesKicker(`${pairA}`, `${pairB}`, cardA, cardB)
    }

        const findingDoublesKicker = (rank1, rank2, index1, index2) => {
            let filteredHand = finalHand.filter(el => el['card_rank'] !== rank1 && el['card_rank'] !== rank2)
            let mapper = filteredHand.map(e => e.card_rank)

            let card1 = cipher(orderedArr, mapper[0])
            let card2 = cipher(orderedArr, mapper[1])
            let card3 = cipher(orderedArr, mapper[2])
            let card4 = cipher(orderedArr, mapper[3])
            let card5 = cipher(orderedArr, mapper[4])
            let card6 = cipher(orderedArr, mapper[5])                

                let sortedArr = [card1, card2, card3, card4, card5, card6].filter(el => el !== -1).sort((a, b) => a - b).reverse()                
            let kicker = orderedArr[sortedArr[0]]
            let dux = [index1, index2, sortedArr[0]]
                
            props.setKicker(`${kicker} Kicker`)
            props.setKickerArr(dux)
        }

    const snakeEyes = () => {
        let index = cipher(ranksArr, 2)
        let foundPair = index + 2
                            
        if (foundPair === 14) {
            foundPair = 'Ace'
            props.setSubType('Aces')
        } else if (foundPair === 13) {
            foundPair = 'King'
            props.setSubType('Kings')
        } else if (foundPair === 12) {
            foundPair = 'Queen'
            props.setSubType('Queens')
        } else if (foundPair === 11) {
            foundPair = 'Jack'
            props.setSubType('Jacks')
        } else {
            props.setSubType(`${foundPair}'s`)
        }
        findingKicker(`${foundPair}`, index)
    }

        const findingKicker = (rank1, index) => {
            let filteredHand = finalHand.filter(el => el['card_rank'] !== rank1)
            let mapper = filteredHand.map(e => e.card_rank)
            let card1 = cipher(orderedArr, mapper[0])
            let card2 = cipher(orderedArr, mapper[1])
            let card3 = cipher(orderedArr, mapper[2])
            let card4 = cipher(orderedArr, mapper[3])
            let card5 = cipher(orderedArr, mapper[4])
            let card6 = cipher(orderedArr, mapper[5])

                let sortedArr = [card1, card2, card3, card4, card5, card6].filter(el => el !== -1).sort((a, b) => a - b).reverse()
            let kicker = orderedArr[sortedArr[0]]
            let dux = [index, sortedArr[0], sortedArr[1], sortedArr[2]]
                
            props.setKicker(`${kicker} Kicker`)
            props.setKickerArr(dux)
        }

    const mileHigh = () => {
        let mapper = finalHand.map(element => element.card_rank)

        let indexCardA = cipher(orderedArr, mapper[0])
        let indexCardB = cipher(orderedArr, mapper[1])
        let indexCardC = cipher(orderedArr, mapper[2])
        let indexCardD = cipher(orderedArr, mapper[3])
        let indexCardE = cipher(orderedArr, mapper[4])
        let indexCardF = cipher(orderedArr, mapper[5])
        let indexCardG = cipher(orderedArr, mapper[6])
            let findActiveIndexes = [indexCardA, indexCardB, indexCardC, indexCardD, indexCardE, indexCardF, indexCardG].filter(el => el !== -1).sort((a, b) => a - b).reverse()
                        
        let kicker = orderedArr[findActiveIndexes[0]]
        let kicker2 = orderedArr[findActiveIndexes[1]]
        let kicker3 = orderedArr[findActiveIndexes[2]]
        let kicker4 = orderedArr[findActiveIndexes[3]]
        let kicker5 = orderedArr[findActiveIndexes[4]]
            let kickerSorted = [kicker, kicker2, kicker3, kicker4, kicker5]
            let foundHighCard = Math.max(...findActiveIndexes)
            let showHighest = orderedArr[foundHighCard]

        let foundHigherCard = cipherSuits(finalHand, showHighest)
        let foundHigherSuit = foundHigherCard[0].card_suit
        let dux = [findActiveIndexes[0], findActiveIndexes[1], findActiveIndexes[2], findActiveIndexes[3], findActiveIndexes[4]]

        props.setHighest(`${kickerSorted[0]} of ${foundHigherSuit}`)
        props.setKickerArr(dux)
    }

    return (
        <div className='rules-master' > </div>
)}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    countRoyalFlush,
    countStraightFlush,
    count4Kind,
    countFullHouse,
    countFlush,
    countStraight,
    count3Kind,
    count2Pair,
    countPair,
    countHighCard,
    resetBest5,
    setHandType,
    tallyOne,
    tallySuits,
    setRules,
    setSubType,
    setKicker,
    setKickerArr,
    setBestHand,
    setHighest,
    setScore
})(withRouter(MyScore))