const Sauce = require('../models/sauce');

// Créer une sauce

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Votre sauce a été créer!' }))
        .catch(error => res.status(400).json({ error }));
};

// Afficher toute les sauces

exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// Afficher une seul sauce

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

// Modifier une sauce

exports.modifySauce = (req, res, next) => {
    const sauce = new Sauce({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Sauce.updateOne({ _id: req.params.id }, sauce).then(
        () => {
            res.status(201).json({
                message: 'Votre sauce a bien été modifier!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// Supprimer une sauce

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Votre sauce a bien été supprimer!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
