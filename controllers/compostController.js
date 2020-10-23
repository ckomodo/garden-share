const express = require("express");
const router = express.Router();
const db = require("../models")
// const axios = require('axios')

// Get all composts
router.get("/api/composts", function (req, res) {
  db.Compost.findAll()
    .then((result) => {
      res.json(result);
      console.log("composts");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get compost by id
router.get("/api/composts/:id", function (req, res) {
  db.Compost.findOne({ where: { id: req.params.id } }).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err);
  })
});

// Post route to add a compost
router.post("/api/composts", function (req, res) {
  db.Owner.findOne({ where: { id: req.body.OwnerId } })
    .then((owner) => {
      db.Compost.create({
        name: req.body.name,
        address: owner.address,
        latitude: owner.latitude,
        longitude: owner.longitude,
        description: req.body.description,
        deposit: req.body.deposit,
        OwnerId: owner.id
        // pictureLink: generated by cloudinary
      })
        .then((result) => {
          res.render("compost_display", result.toJSON())
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//PUT route for updating compost withdraw/deposit status
router.put("/api/composts/:id", function (req, res) {
  db.Compost.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(result => {
    db.Compost.findOne({
      where: { id: req.params.id },
    }).then((compost) => {
      res.render("compost_display", compost.toJSON());
    });
  }).catch ((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE route to delete compost by ID
router.delete("/api/composts/:id", function (req, res) {
  db.Compost.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (data === 0) {
      res.status(404).json(data);
    } else {
      res.json(data);
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//route to edit compost
router.get("/composts/edit", function (req, res) {
  if (req.session.user && req.session.user.userType === "owner") {
    db.Compost.findOne({
      where: {
        id: req.session.user.id
      }
    }).then((compost) => {
      if (!compost) {
        res.status(400).send("You have no composts. Please add a compost in order to edit.")
      } else {
        res.render("compost_edit", compost.toJSON());
      }
    }).catch(err => {
      console.log(err);
      res.status(500).send()
    })
  }
});
module.exports = router;
