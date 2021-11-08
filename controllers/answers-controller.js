let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validateSession');
const answers = require('../db').import('../models/answers');

router.get('/practice', function (req, res) {
    res.send("This is a practice route.");
});

router.post('/create', validateSession, (req, res) => {
    const answersCreate = {
        answer: req.body.answer.answer,
        questionId: req.body.question.question,
        characterId: req.character.id
    }
    answers.create(answersCreate)
        .then(answer => res.status(200).json(answer))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/get', (req, res) => {
    let characterId = req.character.id
    answers.findAll({
        where: { characterId: characterId }
    })
        .then(answers => res.status(200).json(answers))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/update', validateSession, function (req, res) {
    const updateanswers = {
        answer: req.body.answers.answer
    };

    const query = { where: { id: req.params.id, characterId: req.character.id } };

    answers.update(updateanswers, query)
        .then((answer) => res.status(200).json(answer))
        .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete('/delete', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, characterId: req.character.id } };

    answers.destroy(query)
        .then(() => res.status(200).json({ message: "answer Removed." }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;