const jwt = require('jsonwebtoken');
const character = require('../db').import('../models/character');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token -->', token);
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken -->', decodeToken);
            if (!err && decodeToken) {
                character.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(character => {
                    console.log('character -->', character);
                    if (!character) throw err;
                    console.log('req -->', req);
                    req.character = character;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;