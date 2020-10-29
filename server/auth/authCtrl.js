const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const {email, username, password} = req.body
        const db = req.app.get('db')
        
        let foundPlayer = await db.auth.check_player(email)
        let foundGamer = await db.auth.check_username(username)

            if (foundPlayer[0]) {
                console.log(400, 'email taken')
                return res.status(400).send('Email already in use')
            }

            if (foundGamer[0]) {
                console.log(400, 'username taken')
                return res.status(400).send('Username taken')
            }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newPlayer = await db.auth.register(email, username, hash)
        let playerAccount = await db.auth.create_account(newPlayer[0].player_id)
        let sessionPlayer = {...newPlayer[0], ...playerAccount[0]}

        req.session.user = sessionPlayer
        console.log(req.session.user, 'registerBACK')
        res.status(201).send(req.session.user)
    },

    login: async (req, res) => {
        const {email, username, password} = req.body
        const db = req.app.get('db')

        let foundPlayer = await db.auth.check_player(email)
        let foundUsername = await db.auth.check_username(username)

            if (!foundPlayer[0]) {
                console.log('Email does not exist', 'LOGINBACK')
                return res.status(400).send('Email does not exist')
            };
            
            if (!foundUsername[0]) {
                console.log('Username does not exist', 'LOGINBACK')
                return res.status(400).send('Username does not exist')
            };

        const authenticated = bcrypt.compareSync(password, foundPlayer[0].password)

            if (!authenticated) {
                console.log('Incorrect password', 'loginBACK')
                return res.status(401).send('Incorrect password')
            };        
        
            delete foundPlayer[0].password
        req.session.user = foundPlayer[0]
        console.log(foundPlayer[0], 'LOGINBACK')
        res.status(202).send(req.session.user)
    },

    logout: (req, res) => {
        console.log(req.session.user, 'LOGOUTBACK')
        req.session.destroy()
        res.sendStatus(200)
    }
}