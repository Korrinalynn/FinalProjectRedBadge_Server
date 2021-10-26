let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validateSession');
const character = require('../db').import('../models/character');

router.get('/practice', function(req, res){
    res.send("This is a practice route.");
});

router.post('/create', validateSession, (req, res) => {
    const characterCreate = {
        name: req.body.character.name,
        level: req.body.character.level,
        avatar: req.body.character.avatar,
        bio: req.body.character.bio,
        userId: req.user.id
    }
    character.create(characterCreate)
    .then(character => res.status(200).json(character))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/', validateSession, (req, res) => {
    let userid = req.user.id
    character.findAll({
        where: { owner: userid }
    })
    .then(character => res.status(200).json(character))
    .catch(err => res.status(500).json({ error: err}))
});

router.put('/:id', validateSession, function(req, res) {
    const updateCharacter = {
        name: req.body.character.name,
        level: req.body.character.level,
        bio: req.body.character.bio
    };

    const query = { where: { id: req.params.id, owner: req.user.id} };

    character.update(updateCharacter, query)
    .then((characters) => res.status(200).json(characters))
    .catch((err) => res.status(500).json({ error: err.message}));
});

router.delete('/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    character.destroy(query)
    .then(() => res.status(200).json({ message: "Character deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;