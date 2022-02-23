
// on utilise un Regexp pour valider la bonne entrée de l'email par l'utilisateur

module.exports = (req, res, next) => {
    const verifyEmail = (email) => {
        let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        let isRegexTrue = emailRegexp.test(email)
        isRegexTrue ? next() : res.status(400).json({ message: 'Votre email est non valide !' });
    }
    verifyEmail(req.body.email)
};