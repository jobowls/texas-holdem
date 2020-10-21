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
    
    if (newArr[0] === undefined) {
        return null
    } else {
        return newArr
    }
}