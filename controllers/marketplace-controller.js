let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validateSession');
const marketplace = require('../db').import('../models/marketplace');

router.get('/practice', function(req, res){
    res.send("This is a practice route.");
});

router.post('/add', validateSession, (req, res) => {
    const marketplaceAdd = {
        id: req.body.marketplace.id,
        icon: req.body.marketplace.icon,
        name: req.body.marketplace.name,
        userId: req.user.id
    }
    marketplace.create(marketplaceAdd)
    .then(marketplace => res.status(200).json(marketplace))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/', validateSession, (req, res) => {
    let userid = req.user.id
    marketplace.findAll({
        where: { owner: userid }
    })
    .then(marketplace => res.status(200).json(marketplace))
    .catch(err => res.status(500).json({ error: err}))
});

router.put('/:id', validateSession, function(req, res) {
    const updateMarketplace = {
        id: req.body.marketplace.id,
        name: req.body.marketplace.name,
    };

    const query = { where: { id: req.params.id, owner: req.user.id} };

    marketplace.update(updateMarketplace, query)
    .then((marketplace) => res.status(200).json(marketplace))
    .catch((err) => res.status(500).json({ error: err.message}));
});

router.delete('/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    marketplace.destroy(query)
    .then(() => res.status(200).json({ message: "Item removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;