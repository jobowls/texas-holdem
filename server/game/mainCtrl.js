module.exports = {
    getRules: (req, res) => {
        const db = req.app.get('db')

        db.profile.get_rules()
            .then(handsList => res.status(200).send(handsList))
            .catch(err => console.log(err))
    }
}