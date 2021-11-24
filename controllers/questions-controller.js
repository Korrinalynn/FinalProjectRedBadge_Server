let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validateSession');
const questions = require('../db').import('../models/questions');

router.get('/practice', function (req, res) {
    res.send("This is a practice route.");
});

router.post('/create', validateSession, (req, res) => {
    const questionsCreate = {
        question: req.body.question,
        characterId: req.character.id
    }
    questions.create(questionsCreate)
        .then(question => res.status(200).json(question))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/get', validateSession, (req, res) => {
    let characterId = req.character.id
    questions.findAll({
        where: { characterId: characterId }
    })
        .then(questions => res.status(200).json(questions))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/update/:id', validateSession, function (req, res) {
    const updateQuestions = {
        question: req.body.question
    };

    const query = { where: { id: req.params.id, characterId: req.character.id } };

    questions.update(updateQuestions, query)
        .then((question) => res.status(200).json(question))
        .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, characterId: req.character.id } };

    questions.destroy(query)
        .then(() => res.status(200).json({ message: "Question Removed." }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;