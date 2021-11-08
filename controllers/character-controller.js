let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let validateSession = require('../middleware/validateSession');
const Character = require('../db').import('../models/character');

router.get('/practice', function (req, res) {
    res.send("This is a practice route.");
});

router.post('/register', (req, res) => {
    Character.create({
        email: req.body.character.email,
        password: bcrypt.hashSync(req.body.character.password, 13),
        characterName: req.body.character.characterName,
        level: req.body.character.level,
        bio: req.body.character.bio,
        isAdmin: req.body.character.isAdmin
    })
    .then (
        function createSuccess(character) {
          let token = jwt.sign({id: character.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
          res.status(200).json({
            character: character,
            message: 'Token created.',
            sessionToken: token
          })
        }
      )
      .catch(err => res.status(500).json({error: err}))
});

router.post('/login', function (req, res) {
    Character.findOne({
        where: {
            email: req.body.character.email
        },
    })
        .then(function loginSuccess(character) {
            if (character) {
                bcrypt.compare(req.body.character.password, character.password, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({ id: character.id, email: character.email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                        res.status(200).json({
                            character: character,
                            message: "Welcome back!",
                            sessionToken: token,
                        })
                    } else {
                        res.status(502).send({ error: "Login failed." });
                    }
                })
            } else {
                res.status(500).json({ error: 'Character does not exist.' })
            }
        })
        .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:id', validateSession, (req, res) => {
    let Id = req.character.id
    Character.findAll({
        where: { Id: req.character.id }
    })
        .then(character => res.status(200).json(character))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/update', validateSession, function (req, res) {
    const updateCharacter = {
        characterName: req.body.character.characterName,
        level: req.body.character.level,
        bio: req.body.character.bio
    };

    const query = { where: { id: req.character.id } };

    Character.update(updateCharacter, query)
        .then((characters) => res.status(200).json(characters))
        .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete('/delete', validateSession, function (req, res) {
    const query = { where: { id: req.character.id } };

    Character.destroy(query)
        .then(() => res.status(200).json({ message: "Character deleted" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;