module.exports = {
    shuffle: (req, res) => {
        const db = req.app.get('db')

        db.gameplay.shuffle()
            .then(deck => res.status(200).send(deck))
            .catch(err => res.status(500).send(err))
    },
    
    payToPlay: (req, res) => {
        const {id} = req.params
        const {amount} = req.body
        const db = req.app.get('db')
            console.log(amount, 'PULSE')
        
        db.gameplay.pay_to_play([amount, id])
            .then(player => res.status(200).send(player[0].cash))
            .catch(err => res.status(500).send(err))
    },

    newGame: (req, res) => {
        const {account_id} = req.params
        const {player_id} = req.body
        const db = req.app.get('db')
            console.log(account_id, 'PULSE')

        db.gameplay.start_game([player_id, account_id])
            .then(gameTable => res.status(200).send(gameTable))
            .catch(err => res.status(500).send(err))
    }
}