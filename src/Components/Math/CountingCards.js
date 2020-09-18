
//  USE GLOBALLY TO FIND INDEX OF STRING => 'HAND_TYPE'
export function cipher(arr, num) {
    return arr.indexOf(num)
}

export function cipherSuits(arr, rank) {
    return arr.filter(obj => obj['card_rank'] === rank)
}

export function cipherRanks(arr, suit) {
    return arr.filter(obj => obj['card_suit'] === suit)
}
