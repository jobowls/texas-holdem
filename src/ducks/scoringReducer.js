const initialState = {
    rankingIndex: [],
    suitsIndex: [],
    checkedStraight: [],

    finalArr: [ 
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
    ],

    finalSuitsArr: [
        'Clubs',
        'Diamonds',
        'Spades',
        'Hearts'
    ],

    myHand: {
        finalHand: [],
        bestHand: [],
        handType: '',
        subType: '',
        kicker: '',
        kickerArr: [],
        highestCard: '',
        score: 0,
        winnerWinner: false
    },

    best5: {
        hasRoyalFlush: false,
        hasStraightFlush: false,
        has4Kind: false,
        hasFullHouse: false,
        hasFlush: false,
        hasStraight: false,
        has3Kind: false,
        has2Pair: false,
        hasPair: false,
        hasHighCard: false
    },

    botA: {
        finalHand: [],
        handType: '',
        subType: '',
        kicker: '',
        kickerArr: [],
        score: 0,
        hasRoyalFlush: false,
        hasStraightFlush: false,
        has4Kind: false,
        hasFullHouse: false,
        hasFlush: false,
        hasStraight: false,
        has3Kind: false,
        has2Pair: false,
        hasPair: false,
        hasHighCard: false,

        suitsArr: [
            'Clubs',
            'Diamonds',
            'Spades',
            'Hearts'
        ],

        ranksArr: [ 
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
        ]
    },

    botB: {
        finalHand: [],
        handType: '',
        subType: '',
        kicker: '',
        kickerArr: [],
        highestCard: '',
        score: 0,
        hasRoyalFlush: false,
        hasStraightFlush: false,
        has4Kind: false,
        hasFullHouse: false,
        hasFlush: false,
        hasStraight: false,
        has3Kind: false,
        has2Pair: false,
        hasPair: false,
        hasHighCard: false,

        suitsArr: [
            'Clubs',
            'Diamonds',
            'Spades',
            'Hearts'
        ],

        ranksArr: [ 
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
        ]
    },

    botC: {
        finalHand: [],
        handType: '',
        subType: '',
        kicker: '',
        kickerArr: [],
        highestCard: '',
        score: 0,
        hasRoyalFlush: false,
        hasStraightFlush: false,
        has4Kind: false,
        hasFullHouse: false,
        hasFlush: false,
        hasStraight: false,
        has3Kind: false,
        has2Pair: false,
        hasPair: false,
        hasHighCard: false,

        suitsArr: [
            'Clubs',
            'Diamonds',
            'Spades',
            'Hearts'
        ],

        ranksArr: [ 
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
        ]
    }
}

const SET_SUBTYPE = 'SET_SUBTYPE'
const SET_BEST_HAND = 'SET_BEST_HAND'
const SET_KICKER = 'SET_KICKER'
const SET_KICKER_ARR = 'SET_KICKER_ARR'
const CHECKING_STRAIGHT = 'CHECKING_STRAIGHT'
const TALLY_ONE = 'TALLY_ONE'
const TALLY_SUITS = 'TALLY_SUITS'
const CHICKEN_DINNER = 'CHICKEN_DINNER'
const SET_MY_HAND = 'SET_MY_HAND'
const SET_HAND_TYPE = 'SET_HAND_TYPE'
// const SET_POCKET_SUITS = 'SET_POCKET_SUITS'
const RESET_BEST_5 = 'RESET_BEST_5'
const COUNT_ROYAL_FLUSH = 'COUNT_ROYAL_FLUSH'
const COUNT_STRAIGHT_FLUSH = 'COUNT_STRAIGHT_FLUSH'
const COUNT_4KIND = 'COUNT_4KIND'
const COUNT_FULL_HOUSE = 'COUNT_FULL_HOUSE'
const COUNT_FLUSH = 'COUNT_FLUSH'
const COUNT_STRAIGHT = 'COUNT_STRAIGHT'
const COUNT_3KIND = 'COUNT_3KIND'
const COUNT_2PAIR = 'COUNT_2PAIR'
const COUNT_PAIR = 'COUNT_PAIR'
const COUNT_HIGH_CARD = 'COUNT_HIGH_CARD'
const SET_HIGHEST = 'SET_HIGHEST'
const SET_SCORE = 'SET_SCORE'

export function setKickerArr(rankIndexes) {
    // console.log('KIKER-ARR-HIT-P1P1', rankIndexes)
    // console.log(rankIndexes, 'ARR_DINGER')
    return {
        type: SET_KICKER_ARR,
        payload: rankIndexes
    }
}

export function setScore(xp) {
    return {
        type: SET_SCORE,
        payload: xp
    }
}

export function setHighest(card) {
    return {
        type: SET_HIGHEST,
        payload: card
    }
}

export function setBestHand(ranks) {
    return {
        type: SET_BEST_HAND,
        payload: ranks
    }
}

export function setKicker(rank) {
    // console.log(rank, 'KICKER_DINGER')
    return {
        type: SET_KICKER,
        payload: rank
    }
}

export function checkingStraight(arr) {
    return {
        type: CHECKING_STRAIGHT,
        payload: arr
    }
}

export function setSubType(str) {
    // console.log(str, 'SUB-TYPE')
    return {
        type: SET_SUBTYPE,
        payload: str
    }
}

export function chickenDinner(boolean) {
    return {
        type: CHICKEN_DINNER,
        payload: boolean
    }
}
export function resetBest5(boolean) {
    return {
        type: RESET_BEST_5,
        payload: boolean
    }
}
export function countHighCard(boolean) {
    return {
        type: COUNT_HIGH_CARD,
        payload: boolean
    }
}
export function countPair(boolean) {
    return {
        type: COUNT_PAIR,
        payload: boolean
    }
}
export function count2Pair(boolean) {
    return {
        type: COUNT_2PAIR,
        payload: boolean
    }
}
export function count3Kind(boolean) {
    return {
        type: COUNT_3KIND,
        payload: boolean
    }
}

export function countStraight(boolean) {
    return {
        type: COUNT_STRAIGHT,
        payload: boolean
    }
}

export function countFlush(boolean) {
    return {
        type: COUNT_FLUSH,
        payload: boolean
    }
}

export function countFullHouse(boolean) {
    return {
        type: COUNT_FULL_HOUSE,
        payload: boolean
    }
}

export function count4Kind(boolean) {
    return {
        type: COUNT_4KIND,
        payload: boolean
    }
}

export function countStraightFlush(boolean) {
    return {
        type: COUNT_STRAIGHT_FLUSH,
        payload: boolean
    }
}

export function countRoyalFlush(boolean) {
    return {
        type: COUNT_ROYAL_FLUSH,
        payload: boolean
    }
}

export function tallyOne(num) {
    return {
        type: TALLY_ONE,
        payload: num
    }
}

export function tallySuits(num) {
    return {
        type: TALLY_SUITS,
        payload: num
    }
}

export function setHandType(string) {
    return {
        type: SET_HAND_TYPE,
        payload: string
    }
}

export function setMyHand(cards) {
    // console.log(cards, '_BEST_5_')
    return {
        type: SET_MY_HAND,
        payload: cards
    }
}

//  BOT-1 'HAMILTON'  //
const SET_HAMILTON = 'SET_HAMILTON'
const SET_HAND_TYPE_A = 'SET_HAND_TYPE_A'
const SET_SUB_TYPE_A = 'SET_SUB_TYPE_A'
const RESET_BEST_5_A = 'RESET_BEST_5_A'
const COUNT_ROYAL_FLUSH_A = 'COUNT_ROYAL_FLUSH_A'
const COUNT_STRAIGHT_FLUSH_A = 'COUNT_STRAIGHT_FLUSH_A'
const COUNT_4KIND_A = 'COUNT_4KIND_A'
const COUNT_FULL_HOUSE_A = 'COUNT_FULL_HOUSE_A'
const COUNT_FLUSH_A = 'COUNT_FLUSH_A'
const COUNT_STRAIGHT_A = 'COUNT_STRAIGHT_A'
const COUNT_3KIND_A = 'COUNT_3KIND_A'
const COUNT_2PAIR_A = 'COUNT_2PAIR_A'
const COUNT_PAIR_A = 'COUNT_PAIR_A'
const COUNT_HIGH_CARD_A = 'COUNT_HIGH_CARD_A'
const SET_KICKER_A = 'SET_KICKER_A'
const SET_HIGHEST_A = 'SET_HIGHEST_A'
const SET_SCORE_A = 'SET_SCORE_A'
const SET_KICKER_ARR_A = 'SET_KICKER_ARR_A'

export function setKickerArrA(rankIndexes) {
    // console.log('KIKER-ARR-HIT-AAA', rankIndexes)
    return {
        type: SET_KICKER_ARR_A,
        payload: rankIndexes
    }
}

export function setScoreA(xp) {
    return {
        type: SET_SCORE_A,
        payload: xp
    }
}

export function setHighestA(card) {
    return {
        type: SET_HIGHEST_A,
        payload: card
    }
}

export function setKickerA(rank) {
    return {
        type: SET_KICKER_A,
        payload: rank
    }
}

export function setHamilton(cards) {
    return {
        type: SET_HAMILTON,
        payload: cards
    }
}

export function setHandTypeA(string) {
    return {
        type: SET_HAND_TYPE_A,
        payload: string
    }
}

export function setSubTypeA(string) {
    return {
        type: SET_SUB_TYPE_A,
        payload: string
    }
}

export function resetBest5A(boolean) {
    return {
        type: RESET_BEST_5_A,
        payload: boolean
    }
}

export function countHighCardA(boolean) {
    return {
        type: COUNT_HIGH_CARD_A,
        payload: boolean
    }
}

export function countPairA(boolean) {
    return {
        type: COUNT_PAIR_A,
        payload: boolean
    }
}

export function count2PairA(boolean) {
    return {
        type: COUNT_2PAIR_A,
        payload: boolean
    }
}

export function count3KindA(boolean) {
    return {
        type: COUNT_3KIND_A,
        payload: boolean
    }
}

export function countStraightA(boolean) {
    return {
        type: COUNT_STRAIGHT_A,
        payload: boolean
    }
}

export function countFlushA(boolean) {
    return {
        type: COUNT_FLUSH_A,
        payload: boolean
    }
}

export function countFullHouseA(boolean) {
    return {
        type: COUNT_FULL_HOUSE_A,
        payload: boolean
    }
}

export function count4KindA(boolean) {
    return {
        type: COUNT_4KIND_A,
        payload: boolean
    }
}

export function countStraightFlushA(boolean) {
    return {
        type: COUNT_STRAIGHT_FLUSH_A,
        payload: boolean
    }
}

export function countRoyalFlushA(boolean) {
    return {
        type: COUNT_ROYAL_FLUSH_A,
        payload: boolean
    }
}

//  BOT-2 'BURR'  //
const SET_BURR = 'SET_BURR'
const SET_HAND_TYPE_B = 'SET_HAND_TYPE_B'
const SET_SUB_TYPE_B = 'SET_SUB_TYPE_B'
const RESET_BEST_5_B = 'RESET_BEST_5_B'
const COUNT_ROYAL_FLUSH_B = 'COUNT_ROYAL_FLUSH_B'
const COUNT_STRAIGHT_FLUSH_B = 'COUNT_STRAIGHT_FLUSH_B'
const COUNT_4KIND_B = 'COUNT_4KIND_B'
const COUNT_FULL_HOUSE_B = 'COUNT_FULL_HOUSE_B'
const COUNT_FLUSH_B = 'COUNT_FLUSH_B'
const COUNT_STRAIGHT_B = 'COUNT_STRAIGHT_B'
const COUNT_3KIND_B = 'COUNT_3KIND_B'
const COUNT_2PAIR_B = 'COUNT_2PAIR_B'
const COUNT_PAIR_B = 'COUNT_PAIR_B'
const COUNT_HIGH_CARD_B = 'COUNT_HIGH_CARD_B'
const SET_KICKER_B = 'SET_KICKER_B'
const SET_HIGHEST_B = 'SET_HIGHEST_B'
const SET_SCORE_B = 'SET_SCORE_B'
const SET_KICKER_ARR_B = 'SET_KICKER_ARR_B'

export function setKickerArrB(rankIndexes) {
    // console.log('KIKER-ARR-HIT-BBB', rankIndexes)
    return {
        type: SET_KICKER_ARR_B,
        payload: rankIndexes
    }
}

export function setScoreB(xp) {
    return {
        type: SET_SCORE_B,
        payload: xp
    }
}

export function setHighestB(card) {
    return {
        type: SET_HIGHEST_B,
        payload: card
    }
}

export function setBurr(cards) {
    return {
        type: SET_BURR,
        payload: cards
    }
}

export function setKickerB(rank) {
    return {
        type: SET_KICKER_B,
        payload: rank
    }
}

export function setHandTypeB(string) {
    return {
        type: SET_HAND_TYPE_B,
        payload: string
    }
}

export function setSubTypeB(string) {
    return {
        type: SET_SUB_TYPE_B,
        payload: string
    }
}

export function resetBest5B(boolean) {
    return {
        type: RESET_BEST_5_B,
        payload: boolean
    }
}

export function countHighCardB(boolean) {
    return {
        type: COUNT_HIGH_CARD_B,
        payload: boolean
    }
}

export function countPairB(boolean) {
    return {
        type: COUNT_PAIR_B,
        payload: boolean
    }
}

export function count2PairB(boolean) {
    return {
        type: COUNT_2PAIR_B,
        payload: boolean
    }
}

export function count3KindB(boolean) {
    return {
        type: COUNT_3KIND_B,
        payload: boolean
    }
}

export function countStraightB(boolean) {
    return {
        type: COUNT_STRAIGHT_B,
        payload: boolean
    }
}

export function countFlushB(boolean) {
    return {
        type: COUNT_FLUSH_B,
        payload: boolean
    }
}

export function countFullHouseB(boolean) {
    return {
        type: COUNT_FULL_HOUSE_B,
        payload: boolean
    }
}

export function count4KindB(boolean) {
    return {
        type: COUNT_4KIND_B,
        payload: boolean
    }
}

export function countStraightFlushB(boolean) {
    return {
        type: COUNT_STRAIGHT_FLUSH_B,
        payload: boolean
    }
}

export function countRoyalFlushB(boolean) {
    return {
        type: COUNT_ROYAL_FLUSH_B,
        payload: boolean
    }
}


//  BOT-3 'JEFFERSON'  //
const SET_JEFFERSON = 'SET_JEFFERSON'
const SET_HAND_TYPE_C = 'SET_HAND_TYPE_C'
const SET_SUB_TYPE_C = 'SET_SUB_TYPE_C'
const RESET_BEST_5_C = 'RESET_BEST_5_C'
const COUNT_ROYAL_FLUSH_C = 'COUNT_ROYAL_FLUSH_C'
const COUNT_STRAIGHT_FLUSH_C = 'COUNT_STRAIGHT_FLUSH_C'
const COUNT_4KIND_C = 'COUNT_4KIND_C'
const COUNT_FULL_HOUSE_C = 'COUNT_FULL_HOUSE_C'
const COUNT_FLUSH_C = 'COUNT_FLUSH_C'
const COUNT_STRAIGHT_C = 'COUNT_STRAIGHT_C'
const COUNT_3KIND_C = 'COUNT_3KIND_C'
const COUNT_2PAIR_C = 'COUNT_2PAIR_C'
const COUNT_PAIR_C = 'COUNT_PAIR_C'
const COUNT_HIGH_CARD_C = 'COUNT_HIGH_CARD_C'
const SET_KICKER_C = 'SET_KICKER_C'
const SET_HIGHEST_C = 'SET_HIGHEST_C'
const SET_SCORE_C = 'SET_SCORE_C'
const SET_KICKER_ARR_C = 'SET_KICKER_ARR_C'

export function setKickerArrC(rankIndexes) {
    // console.log('KIKER-ARR-HIT-CCC', rankIndexes)
    return {
        type: SET_KICKER_ARR_C,
        payload: rankIndexes
    }
}

export function setScoreC(xp) {
    return {
        type: SET_SCORE_C,
        payload: xp
    }
}

export function setHighestC(card) {
    return {
        type: SET_HIGHEST_C,
        payload: card
    }
}

export function setJefferson(cards) {
    return {
        type: SET_JEFFERSON,
        payload: cards
    }
}

export function setKickerC(rank) {
    return {
        type: SET_KICKER_C,
        payload: rank
    }
}

export function setHandTypeC(string) {
    return {
        type: SET_HAND_TYPE_C,
        payload: string
    }
}

export function setSubTypeC(string) {
    return {
        type: SET_SUB_TYPE_C,
        payload: string
    }
}

export function resetBest5C(boolean) {
    return {
        type: RESET_BEST_5_C,
        payload: boolean
    }
}

export function countHighCardC(boolean) {
    return {
        type: COUNT_HIGH_CARD_C,
        payload: boolean
    }
}

export function countPairC(boolean) {
    return {
        type: COUNT_PAIR_C,
        payload: boolean
    }
}

export function count2PairC(boolean) {
    return {
        type: COUNT_2PAIR_C,
        payload: boolean
    }
}

export function count3KindC(boolean) {
    return {
        type: COUNT_3KIND_C,
        payload: boolean
    }
}

export function countStraightC(boolean) {
    return {
        type: COUNT_STRAIGHT_C,
        payload: boolean
    }
}

export function countFlushC(boolean) {
    return {
        type: COUNT_FLUSH_C,
        payload: boolean
    }
}

export function countFullHouseC(boolean) {
    return {
        type: COUNT_FULL_HOUSE_C,
        payload: boolean
    }
}

export function count4KindC(boolean) {
    return {
        type: COUNT_4KIND_C,
        payload: boolean
    }
}

export function countStraightFlushC(boolean) {
    return {
        type: COUNT_STRAIGHT_FLUSH_C,
        payload: boolean
    }
}

export function countRoyalFlushC(boolean) {
    return {
        type: COUNT_ROYAL_FLUSH_C,
        payload: boolean
    }
}

export default function scoringReducer(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {

        //  PLAYER - 1
        case SET_MY_HAND:
            return {...state, myHand: {...state.myHand, finalHand: payload}};
        case SET_HAND_TYPE:
            return {...state, myHand: {...state.myHand, handType: payload}};
        case SET_SUBTYPE:
            return {...state, myHand: {...state.myHand, subType: payload}};
        case SET_KICKER:
            return {...state, myHand: {...state.myHand, kicker: payload}};
            
        case SET_KICKER_ARR:
            return {...state, myHand: {...state.myHand, kickerArr: payload}};

        case SET_HIGHEST:
            return {...state, myHand: {...state.myHand, highestCard: payload}};
        case SET_SCORE:
            return {...state, myHand: {...state.myHand, score: payload}};
        case COUNT_ROYAL_FLUSH:
            return {...state, best5: {...state.best5, hasRoyalFlush: payload}};
        case COUNT_STRAIGHT_FLUSH:
            return {...state, best5: {...state.best5, hasStraightFlush: payload}};
        case COUNT_4KIND:
            return {...state, best5: {...state.best5, has4Kind: payload}};
        case COUNT_FULL_HOUSE:
            return {...state, best5: {...state.best5, hasFullHouse: payload}};
        case COUNT_FLUSH:
            return {...state, best5: {...state.best5, hasFlush: payload}};
        case COUNT_STRAIGHT:
            return {...state, best5: {...state.best5, hasStraight: payload}};
        case COUNT_3KIND:
            return {...state, best5: {...state.best5, has3Kind: payload}};
        case COUNT_2PAIR:
            return {...state, best5: {...state.best5, has2Pair: payload}};
        case COUNT_PAIR:
            return {...state, best5: {...state.best5, hasPair: payload}};
        case COUNT_HIGH_CARD:
            return {...state, best5: {...state.best5, hasHighCard: payload}};
        case CHICKEN_DINNER:
            return {...state, myHand: {...state.myHand, winnerWinner: payload}}
        
        case RESET_BEST_5:
            return {
                ...state,
                best5: {
                    ...state.best5,
                    hasRoyalFlush: payload,
                    hasStraightFlush: payload,
                    has4Kind: payload,
                    hasFullHouse: payload,
                    hasFlush: payload,
                    hasStraight: payload,
                    has3Kind: payload,
                    has2Pair: payload,
                    hasPair: payload,
                    hasHighCard: payload
                }
            };


        //  BOT-1 'HAMILTON'  //
        case SET_HAMILTON:
            return {...state, botA: {...state.botA, finalHand: payload}};
        case SET_HAND_TYPE_A:
            return {...state, botA: {...state.botA, handType: payload}};
        case SET_SUB_TYPE_A:
            return {...state, botA: {...state.botA, subType: payload}};
        case COUNT_ROYAL_FLUSH_A:
            return {...state, botA: {...state.botA, hasRoyalFlush: payload}};
        case COUNT_STRAIGHT_FLUSH_A:
            return {...state, botA: {...state.botA, hasStraightFlush: payload}};
        case COUNT_4KIND_A:
            return {...state, botA: {...state.botA, has4Kind: payload}};
        case COUNT_FULL_HOUSE_A:
            return {...state, botA: {...state.botA, hasFullHouse: payload}};
        case COUNT_FLUSH_A:
            return {...state, botA: {...state.botA, hasFlush: payload}};
        case COUNT_STRAIGHT_A:
            return {...state, botA: {...state.botA, hasStraight: payload}};
        case COUNT_3KIND_A:
            return {...state, botA: {...state.botA, has3Kind: payload}};
        case COUNT_2PAIR_A:
            return {...state, botA: {...state.botA, has2Pair: payload}};
        case COUNT_PAIR_A:
            return {...state, botA: {...state.botA, hasPair: payload}};
        case COUNT_HIGH_CARD_A:
            return {...state, botA: {...state.botA, hasHighCard: payload}};
        case SET_KICKER_A:
            return {...state, botA: {...state.botA, kicker: payload}};
        case SET_KICKER_ARR_A:
            return {...state, botA: {...state.botA, kickerArr: payload}};
        case SET_HIGHEST_A:
            return {...state, botA: {...state.botA, highestCard: payload}};
        case SET_SCORE_A:
            return {...state, botA: {...state.botA, score: payload}};

        case RESET_BEST_5_A:
            return {
                ...state, botA: {...state.botA, 
                    hasRoyalFlush: payload,
                    hasStraightFlush: payload,
                    has4Kind: payload,
                    hasFullHouse: payload,
                    hasFlush: payload,
                    hasStraight: payload,
                    has3Kind: payload,
                    has2Pair: payload,
                    hasPair: payload,
                    hasHighCard: payload
                }
            };
       
        //  BOT-2 'BURR'  //
        case SET_BURR:
            return {...state, botB: {...state.botB, finalHand: payload}};
        case SET_HAND_TYPE_B:
            return {...state, botB: {...state.botB, handType: payload}};
        case SET_SUB_TYPE_B:
            return {...state, botB: {...state.botB, subType: payload}};
        case COUNT_ROYAL_FLUSH_B:
            return {...state, botB: {...state.botB, hasRoyalFlush: payload}};
        case COUNT_STRAIGHT_FLUSH_B:
            return {...state, botB: {...state.botB, hasStraightFlush: payload}};
        case COUNT_4KIND_B:
            return {...state, botB: {...state.botB, has4Kind: payload}};
        case COUNT_FULL_HOUSE_B:
            return {...state, botB: {...state.botB, hasFullHouse: payload}};
        case COUNT_FLUSH_B:
            return {...state, botB: {...state.botB, hasFlush: payload}};
        case COUNT_STRAIGHT_B:
            return {...state, botB: {...state.botB, hasStraight: payload}};
        case COUNT_3KIND_B:
            return {...state, botB: {...state.botB, has3Kind: payload}};
        case COUNT_2PAIR_B:
            return {...state, botB: {...state.botB, has2Pair: payload}};
        case COUNT_PAIR_B:
            return {...state, botB: {...state.botB, hasPair: payload}};
        case COUNT_HIGH_CARD_B:
            return {...state, botB: {...state.botB, hasHighCard: payload}};
        case SET_KICKER_B:
            return {...state, botB: {...state.botB, kicker: payload}};
        case SET_KICKER_ARR_B:
            return {...state, botB: {...state.botB, kickerArr: payload}};
        case SET_HIGHEST_B:
            return {...state, botB: {...state.botB, highestCard: payload}};
        case SET_SCORE_B:
            return {...state, botB: {...state.botB, score: payload}};

        case RESET_BEST_5_B:
            return {
                ...state, botB: {...state.botB, 
                    hasRoyalFlush: payload,
                    hasStraightFlush: payload,
                    has4Kind: payload,
                    hasFullHouse: payload,
                    hasFlush: payload,
                    hasStraight: payload,
                    has3Kind: payload,
                    has2Pair: payload,
                    hasPair: payload,
                    hasHighCard: payload
                }
            };
        
        
        //  BOT-3 'JEFFERSON'  //
        case SET_JEFFERSON:
            return {...state, botC: {...state.botC, finalHand: payload}};
        case SET_HAND_TYPE_C:
            return {...state, botC: {...state.botC, handType: payload}};
        case SET_SUB_TYPE_C:
            return {...state, botC: {...state.botC, subType: payload}};
        case COUNT_ROYAL_FLUSH_C:
            return {...state, botC: {...state.botC, hasRoyalFlush: payload}};
        case COUNT_STRAIGHT_FLUSH_C:
            return {...state, botC: {...state.botC, hasStraightFlush: payload}};
        case COUNT_4KIND_C:
            return {...state, botC: {...state.botC, has4Kind: payload}};
        case COUNT_FULL_HOUSE_C:
            return {...state, botC: {...state.botC, hasFullHouse: payload}};
        case COUNT_FLUSH_C:
            return {...state, botC: {...state.botC, hasFlush: payload}};
        case COUNT_STRAIGHT_C:
            return {...state, botC: {...state.botC, hasStraight: payload}};
        case COUNT_3KIND_C:
            return {...state, botC: {...state.botC, has3Kind: payload}};
        case COUNT_2PAIR_C:
            return {...state, botC: {...state.botC, has2Pair: payload}};
        case COUNT_PAIR_C:
            return {...state, botC: {...state.botC, hasPair: payload}};
        case COUNT_HIGH_CARD_C:
            return {...state, botC: {...state.botC, hasHighCard: payload}};
        case SET_KICKER_C:
            return {...state, botC: {...state.botC, kicker: payload}};
        case SET_KICKER_ARR_C:
            return {...state, botC: {...state.botC, kickerArr: payload}};
        case SET_HIGHEST_C:
            return {...state, botC: {...state.botC, highestCard: payload}};
        case SET_SCORE_C:
            return {...state, botC: {...state.botC, score: payload}};
            
        case RESET_BEST_5_C:
            return {
                ...state, botC: {...state.botC, 
                    hasRoyalFlush: payload,
                    hasStraightFlush: payload,
                    has4Kind: payload,
                    hasFullHouse: payload,
                    hasFlush: payload,
                    hasStraight: payload,
                    has3Kind: payload,
                    has2Pair: payload,
                    hasPair: payload,
                    hasHighCard: payload
                }
            };
        
        default:
            return state;
    }
}