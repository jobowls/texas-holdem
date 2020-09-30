
//  USE GLOBALLY TO FIND INDEX OF STRING => 'HAND_TYPE'
export function cipher(arr, num) {
    return arr.indexOf(num)
}

export function cipherFlush(arr, num) {
    return arr.indexOf(num >= 5)
}

export function cipherSuits(arr, rank) {
    return arr.filter(obj => obj['card_rank'] === rank)
}

export function cipherRanks(arr, suit) {
    return arr.filter(obj => obj['card_suit'] === suit)
}

export function eliminate(arr, i) {
    let newArr = []
    arr.forEach(e => newArr.push(e[i]))
        console.log(i, 'MATH[i]')
        console.log(newArr, 'NEW_ARR[]')
    // return newArr;
    if (newArr[0] === undefined) {
        console.log(newArr, 'NEW_[]')
        console.log(arr, 'ORIGIN_[]')
        return null
    } else {
        return newArr
    }
}