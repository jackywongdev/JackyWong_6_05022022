const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)
    .is().max(30)
    .has().uppercase(1)
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()

module.exports = passwordSchema;