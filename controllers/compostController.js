const express = require("express");
const router = express.Router();
const db = require("../models");
// const axios = require('axios')

// Get all composts
router.get("/api/composts", function (req, res) {
  db.Compost.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get compost by id
router.get("/api/composts/:id", function (req, res) {
  db.Compost.findOne({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get route to Compost Add Form
router.get("/composts/add", function(req,res){
  res.render("composts_post")
})

// Post route to add a compost
router.post("/api/composts", function (req, res) {
  db.Owner.findOne({ where: { id: req.body.OwnerId } })
    .then((owner) => {
      db.Compost.create({
        name: req.body.name,
        address: owner.address,
        latitude: owner.latitude,
        longitude: owner.longitude,
        OwnerId: owner.id,
        // pictureLink: generated by cloudinary
      })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//PUT route for updating
router.put("/api/compost/:id", function (req, res) {
  db.Compost.update(
    //should i open/close withdraw and deposit at the same time? how do u know which one to be opened?
    //you'd have to send over something like req.body.type to let me know which one i'm updating
    //{[req.body.type]: req.body.open}
    { withdraw: req.body.withdraw, deposit: req.body.deposit },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(result=>(res.json(result)))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE route to delete compost by ID
router.delete("/api/composts/:id", function (req, res) {
  db.Compost.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data === 0) {
        res.status(404).json(data);
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT route
router.put("/api/composts/:id", function (req, res) {
  res.status(418).end();
});

module.exports = router;
