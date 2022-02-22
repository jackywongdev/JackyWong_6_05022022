const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Utilisation d'uniqueValidator afin de vérifier qu'on ne puisse pas avoir plusieur fois le même nom d'utilisateur

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);