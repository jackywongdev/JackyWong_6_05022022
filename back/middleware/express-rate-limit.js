const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message: "Vous avez tenter trop de fois de vous connectez en vous trompant de mot de passe ! Le compte est bloqué pendant 2 min ! ",
});

module.exports = { limiter }