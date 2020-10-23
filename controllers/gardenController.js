const express = require("express");
const router = express.Router();
const db = require("../models");
// const axios = require('axios')

// Get all gardens
router.get("/api/gardens", function (req, res) {
  db.Garden.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get garden by id
router.get("/api/gardens/:id", function (req, res) {
  db.Garden.findOne({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

<<<<<<< HEAD
// return info_post.handlebars to post garden
router.get("/garden/add", function (req, res) {
  res.render("gardens_post");
});
// return gardens_post.handlebars to post garden
router.get("/garden/add/", function(req, res){
  res.render("gardens_post")
})

// return gardens_post.handlebars to post garden by id
router.get("/garden/add/:id", function(req, res){
  res.render("gardens_post", req.params)
})

// return info_display.handlebars to display all gardens available
router.get("/gardens", function (req, res) {
  db.Garden.findAll((data) => {
    let gardenObject = {
      Garden: data,
    };
    console.log(gardenObject);
  }).catch((err) => {
    res.status(500).send(err);
  });
});
// res.render("info_display", {Garden: result})

// return info_post.handlebars to post garden
// router.get("/garden/:id", function(req,res){
//   res.render("info_post", {id:req.params.id})
// });

// Post route to add a garden
router.post("/api/gardens", function (req, res) {
  db.Owner.findOne({ where: { id: req.body.OwnerId } })
    .then((owner) => {
      db.Garden.create({
        name: req.body.name,
        address: owner.address,
        latitude: owner.latitude,
        longitude: owner.longitude,
        description: req.body.description,
        length: req.body.length,
        width: req.body.width,
        OwnerId: owner.id,
        // pictureLink: generated by cloudinary
      })
        .then((result) => {
          res.json(result);
          res.render("info_diplay");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
  })
})
=======
// // return info_display.handlebars to display all gardens available
// router.get("/gardens", function (req, res) {
//   db.Garden.findAll(data => {
//     let gardenObject = {
//       Garden: data
//     }
//     console.log(gardenObject)
//   })
//   .catch(err => {
//     res.status(500).send(err);
//   })
// })
>>>>>>> dev

// Post route to add a garden
router.post("/api/gardens", function (req, res) {
  db.Owner.findOne({ where: { id: req.body.OwnerId } }).then(owner => {
    db.Garden.create({
      name: req.body.name,
      address: owner.address,
      latitude: owner.latitude,
      longitude: owner.longitude,
      description: req.body.description,
      length: req.body.length,
      width: req.body.width,
      OwnerId: owner.id
      // pictureLink: generated by cloudinary
    }).then(result => {
      // res.json(result)
      res.render("garden_display", result.toJSON())
    }
    ).catch(err => {
      res.status(500).send(err)
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//DELETE route to delete garden by ID
router.delete("/api/gardens/:id", function (req, res) {
  db.Garden.destroy({
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
router.put("/api/gardens/:id", function (req, res) {
  db.Garden.update(
    {
      GardenerId: req.body.GardenerId,
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      length: req.body.length,
      width: req.body.width,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      console.log(result);
      res.json(result)
      // db.Garden.findOne({
      //   where: { id: req.params.id },
      // }).then((garden) => {
      //   res.render("garden_display", garden.toJSON());
      // });
      // res.render("garden_display", result.toJSON())
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/garden/edit/:id", function (req, res) {
  db.Garden.findOne({
    where: { id: req.params.id },
  }).then((garden) => {
    res.render("garden_edit", garden.toJSON());
  });
});
  db.Garden.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err);
  })
});



module.exports = router;
