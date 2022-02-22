const Sauce = require("../models/sauce");
const fs = require("fs");
const sauce = require("../models/sauce");
// Créer une sauce

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Votre sauce a été créer!" }))
    .catch((error) => res.status(400).json({ error }));
};

// Afficher toute les sauces avec la méthode find()

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Afficher une seul sauce

exports.getOneSauce = (req, res, next) => {
  // pour afficher une sauce spécifique on utilise la méthode  de mongoDB avec comme paramètre son id(sauce)
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Modifier une sauce

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() =>
      res.status(200).json({ message: "Votre sauce a été modifié !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer une sauce

exports.deleteSauce = (req, res, next) => {
  // pour supprimer une sauce seul l'utilisateur qui a créer au préalable cette sauce peux la supprimer, reconnu par son id
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // l'image doit elle également êtres retirer du dossier images 
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Votre sauce a été supprimé !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// système de like et dislike


exports.likedOrDisliked = (req, res, ext) => {
  const userId = req.body.userId;
  const sauceId = req.params.id;
  const like = req.body.like;

  Sauce.findOne({ _id: sauceId }).then((sauce) => {
    switch (like) {
      case 1:
        // dans ce cas si l'id de l'utilisateur n'est pas dans le tableau usersLiked on l'ajoute et le like = +1
        Sauce.updateOne(
          {
            _id: sauceId,
          },
          {
            $inc: { likes: +1 },
            $push: { usersLiked: userId },
          }
        )
          .then(() =>
            res.status(200).json({ message: "Vous aimez cette sauce !" }),
          )
          .catch((error) => res.status(400).json({ error }));
        break;

      case -1:
        // dans ce cas si l'id de l'utilisateur n'est pas dans le tableau usersDisliked on l'ajoute et le dislike = +1
        Sauce.updateOne(
          {
            _id: sauceId,
          },
          {
            $inc: { dislikes: +1 },
            $push: { usersDisliked: userId },
          }
        )
          .then(() =>
            res.status(200).json({ message: "Vous n'aimez pas cette sauce !" })
          )
          .catch((error) => res.status(400).json({ error }));
        break;

      case 0:
        // dans ce cas si l'id de l'utilisateur est dans le tableau usersLiked on le retire et le like = 0
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            {
              _id: sauceId,
            },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: userId },
            }
          )
            .then(() =>
              res.status(200).json({ message: "Like retiré !" })
            )
            .catch((error) => res.status(400).json({ error }));
        } else {
          // si non si l'id de l'utilisateur est déjà dans le tableau des usersDisliked on le retire et le dislike = 0
          Sauce.updateOne(
            {
              _id: sauceId,
            },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: userId },
            }
          )
            .then(() =>
              res.status(200).json({ message: "Dislike retiré !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
    }
  });
};


