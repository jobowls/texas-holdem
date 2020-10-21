    // NPM
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setScoreC, setKickerArrC, setHighestC, setKickerC, setJefferson, setHandTypeC, setSubTypeC, resetBest5C, countRoyalFlushC, countStraightFlushC, count4KindC, countFullHouseC, countFlushC, countStraightC, count3KindC, count2PairC, countPairC, countHighCardC} from '../../../ducks/scoringReducer'
import {cipher, cipherSuits} from '../../Math/CountingCards'

    // LOCAL
import '../../CardFlow/Community.scss'

const ScoreJefferson = (props) => {
    const {finalHand} = props.score.botC
    const {listOfHands} = props.rules

    const [finalSuitsArr] = useState(['Clubs', 'Diamonds', 'Spades', 'Hearts'])
    const [finalArr] = useState(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'])
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
        runScore()
    }, [props.score.botC.finalHand])

    useEffect(() => {
        if (props.score.botC.hasRoyalFlush === true) {
            checkTypes('Royal Flush')
        } else if (props.score.botC.hasStraightFlush === true) {
            checkTypes('Straight Flush')
        } else if (props.score.botC.has4Kind === true) {
            checkTypes('4 of a Kind')
        } else if (props.score.botC.hasFullHouse === true) {
            checkTypes('Full House')
        } else if (props.score.botC.hasFlush === true) {
            checkTypes('Flush')
        } else if (props.score.botC.hasStraight === true) {
            checkTypes('Straight')
        } else if (props.score.botC.has3Kind === true) {
            checkTypes('3 of a Kind')
        } else if (props.score.botC.has2Pair === true) {
            checkTypes('2 Pair')
        } else if (props.score.botC.hasPair === true) {
            checkTypes('Pair')
        } else if (props.score.botC.hasHighCard === true) {
            checkTypes('High Card')
        }
     }, [props.score.botC.has4Kind,
         props.score.botC.hasFullHouse,
         props.score.botC.hasFlush,
         props.score.botC.hasStraight,
         props.score.botC.has3Kind,
         props.score.botC.has2Pair,
         props.score.botC.hasPair,
         props.score.botC.hasHighCard
     ])


     const checkTypes = (jefferson) => {        
        let list = listOfHands.filter(el => el['badge_name'] === `${jefferson}`)

        switch(jefferson) {
            case 'Royal Flush':
                props.setKickerC('')
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                break;
            case 'Straight Flush':
                props.setKickerC('')
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                break;
            case '4 of a Kind':
                quadSquad()
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                break;
            case 'Full House':
                fullerHouse()
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                props.setKickerC('')
                break;
            case 'Straight':
                props.setKickerC('')
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                count5()
                break;
            case 'Flush':
                flusher()
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                break;
            case '3 of a Kind':
                tripoly()
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                break;
            case '2 Pair':
                doubleUp()
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                break;
            case 'Pair':
                snakeEyes()
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                break;
            case 'High Card':
                props.setHandTypeC(`${jefferson}`)
                props.setScoreC(+list[0].badge_score)
                mileHigh()
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
    //  [[SPADE][SPADE]] => 'POCKET SUITED'
        let pocketPairRanks = finalHand.slice(finalHand.length - 2, finalHand.length).map(card => card.card_rank);
        let pocketPairSuited = finalHand.slice(finalHand.length - 2, finalHand.length).map(card => card.card_suit);

    //  [[a][a], [b][b]] => 'TWO PAIR'
        let doubles = ranksArr2.filter(element => element === 2);
        
    //  [[1][2][3][4][5]] => 'STRAIGHT'
        let startingPosition = ranksArr.findIndex(element => element > 0);
        let checkedArr = [];

        const runScore = () => {
            if (ranksArr.includes(4)) {
                props.count4KindC(true)
            } else if (ranksArr.includes(3) && ranksArr.includes(2)) {
                props.countFullHouseC(true)
            } else if (suitsArr.includes(5)) {                        
                props.countFlushC(true)
            } else if (ranksArr.includes(3)) {
                props.count3KindC(true)
            } else if (doubles.length === 3) {
                props.count2PairC(true)
            } else if (doubles.length >= 2) {
                props.count2PairC(true)
            } else if (ranksArr.includes(2)) {
                props.countPairC(true)
            } else if (props.cards.pocketAi3.length) {
                props.countHighCardC(true)
            }   
    
            for (let i = ranksArr.length - 1; i >= startingPosition; i--) {
                if (ranksArr[i] > 0) {
                    checkedArr.push([i])
                    
                    if (checkedArr.length > 4) {                
                        props.countStraightC(true)
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
                props.setSubTypeC('Ace to Five')
                props.setKickerArrC([3])
            } else if (checkedArr.length > 4) {
                                let card1 = checkedArr[0];
                                let index1 = finalArr[card1];
                            let card2 = checkedArr[1];
                            let index2 = finalArr[card2];
                        let card3 = checkedArr[2];
                        let index3 = finalArr[card3];
                    let card4 = checkedArr[3];
                    let index4 = finalArr[card4];
                let card5 = checkedArr[4];
                let index5 = finalArr[card5];
        
                let indexedArr = [index1, index2, index3, index4, index5];
                        
                let alpha = indexedArr[0];
                let beta = indexedArr[1];
                let charlie = indexedArr[2];
                let delta = indexedArr[3];
                let echo = indexedArr[4];

                let foundAlpha = orderedArr.indexOf(alpha)
                    // console.log(foundAlpha)
                props.setKickerArrC([foundAlpha])
                
                let alphaRomeo = cipherSuits(finalHand, alpha);
                let betaRomeo = cipherSuits(finalHand, beta);
                let charlieRomeo = cipherSuits(finalHand, charlie);
                let deltaRomeo = cipherSuits(finalHand, delta);
                let echoRomeo = cipherSuits(finalHand, echo);
                    
                let foundSuits = [alphaRomeo[0].card_suit, betaRomeo[0].card_suit, charlieRomeo[0].card_suit, deltaRomeo[0].card_suit, echoRomeo[0].card_suit];
                    let heartSlayer = foundSuits.filter(element => element === 'Hearts');
                    let heartTicker = heartSlayer.length;
                    let clubSlayer = foundSuits.filter(element => element === 'Clubs');
                    let clubTicker = clubSlayer.length;
                    let spadeSlayer = foundSuits.filter(element => element === 'Spades');
                    let spadeTicker = spadeSlayer.length;
                    let diamondSlayer = foundSuits.filter(element => element === 'Diamonds');
                    let diamondTicker = diamondSlayer.length;
                    
                let faceCountArr = [heartTicker, clubTicker, spadeTicker, diamondTicker];
        
                if (faceCountArr.includes(5) && `${index1} === 'Ace`) {
                    props.countRoyalFlushC(true)
                    // checkTypes('Royal Flush')
                    props.setSubTypeC(faceCountArr[0] >= 5 ? 'Hearts' : faceCountArr[1] >= 5 ? 'Clubs' : faceCountArr[2] >= 5 ? 'Spades' : faceCountArr[3] >= 5 ? 'Diamonds' : null)
                } else if (faceCountArr.includes(5)) {
                    props.countStraightFlushC(true)
                    // checkTypes('Straight Flush')
                    props.setSubTypeC(faceCountArr[0] >= 5 ? `${index1} High // Hearts` : faceCountArr[1] >= 5 ? `${index1} High // Clubs` : faceCountArr[2] >= 5 ? `${index1} High // Spades` : faceCountArr[3] >= 5 ? `${index1} High // Diamonds` : null)
                    // props.setSubTypeC(`${index5} to ${index1} Suited`)
                } else {
                    props.setSubTypeC(`${index5} to ${index1}`)    
                    // props.setKickerArrC([index1])
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
    
            props.setSubTypeC(`${bigger}s full of ${smaller}s`)

            let alpha = orderedArr.indexOf(bigger)
            let beta = orderedArr.indexOf(smaller)
        props.setKickerArrC([alpha, beta])
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
                
                props.setSubTypeC(`${kicker} High`)
                props.setKickerC(`${suit}`)
                props.setKickerArrC(dux)
            }
    
        const quadSquad = () => {
            if (ranksArr.includes(4)) {
                        let quads = cipher(ranksArr, 4);
                    let quadlets = (quads + 2);
                let fourKind = finalArr[quadlets - 2];
    
                props.setSubTypeC(`Quad ${fourKind}s`)
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
    
                props.setKickerC(`${kicker} Kicker`)
                props.setKickerArrC(dux)
            }
    
        const tripoly = () => {
                    let triplets = cipher(ranksArr, 3);
                let tripCard = (triplets + 2);
            let threeKind = finalArr[tripCard - 2];
    
            props.setSubTypeC(`Trip ${threeKind}s`)
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
                    
            props.setKickerC(`${kicker} Kicker`)
            props.setKickerArrC(dux)
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
    
            props.setSubTypeC(`${pairA}s & ${pairB}s` )        
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
                let dux = [index1, index2 ,sortedArr[0]]
                    
                props.setKickerC(`${kicker} Kicker`)
                props.setKickerArrC(dux)
            }
    
        const snakeEyes = () => {
            let index = cipher(ranksArr, 2)
            let foundPair = index + 2
                                
            if (foundPair === 14) {
                foundPair = 'Ace'
                props.setSubTypeC('Aces')
            } else if (foundPair === 13) {
                foundPair = 'King'
                props.setSubTypeC('Kings')
            } else if (foundPair === 12) {
                foundPair = 'Queen'
                props.setSubTypeC('Queens')
            } else if (foundPair === 11) {
                foundPair = 'Jack'
                props.setSubTypeC('Jacks')
            } else {
                props.setSubTypeC(`${foundPair}'s`)
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
                    
                props.setKickerC(`${kicker} Kicker`)
                props.setKickerArrC(dux)
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
    
            props.setHighestC(`${kickerSorted[0]} of ${foundHigherSuit}`)
            props.setKickerArrC(dux)
        }

    return (
        <div className='Ai1-show' >
            <h4 id='Ai-name'> Jefferson </h4>            
            <p> {props.score.botC.handType} </p>            
            <p> {props.score.botC.subType} </p>            
            {
                props.score.botC.handType === 'High Card' ?
                <p> {props.score.botC.highestCard} </p>
                :
                null
            }            
            <p> {props.score.botC.kicker} </p>
        </div>
    )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {
    setJefferson, 
    setHandTypeC, 
    setSubTypeC, 
    resetBest5C, 
    countRoyalFlushC, 
    countStraightFlushC, 
    count4KindC, 
    countFullHouseC, 
    countFlushC, 
    countStraightC, 
    count3KindC, 
    count2PairC, 
    countPairC, 
    countHighCardC,
    setKickerC,
    setHighestC,
    setKickerArrC,
    setScoreC
})(ScoreJefferson)