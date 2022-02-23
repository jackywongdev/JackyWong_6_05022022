
// passwordValidator nous permet de creer des rêgles pour renforcer la force des mots de passe utilisateur

const passwordSchema = require('../models/password-validator');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le mot de passe doit contenir 8 charactères minimum avec au moins une majuscule, avec au moins 2 chiffres et sans espaces !' });
    } else {
        next();
    }
};