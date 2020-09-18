module.exports = {
    editPic: (req, res) => {
        const db = req.app.get('db')
        console.log(req.body, 'req.body')
        const {profile_pic} = req.body
        const {id} = req.params

        db.profile.edit_profile_pic([profile_pic, id])
        .then(pic => res.status(200).send(pic[0].profile_pic))
        .catch(err => res.status(500).send(err))
    },

    getStats: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.profile.get_stats(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
    },

    getPic: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.profile.get_pic(id)
        .then(img => res.status(200).send(img))
        .catch(err => console.log(err))
    }
}